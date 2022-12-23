import { connectionDB } from "../database/db.js";
import { nanoid } from "nanoid";
import shortenSchema from "../schemas/shortenSchemas.js"

async function PostShorten(req, res) {
  const { token } = res.locals;
  console.log(token);
  const { url } = req.body;
  const shortUrl = nanoid(6);
  const visitCount = 0;
  const linksCount = 0;
  console.log(shortUrl, "small");
  try {
    const user = await connectionDB.query(
      "SELECT * FROM sessions WHERE token = $1",
      [token]
    );
    const checkToken = await connectionDB.query("SELECT * from sessions WHERE token = $1 ",[token])

    if (!token || checkToken.rows.length ===0) {
      return res.sendStatus(401);
    }
    const { error } = shortenSchema.validate(req.body, { abortEarly: false });
    if (error) {
      const errors = error.details.map((detail) => detail.message);
      return res.status(422).send(errors);
    }

    console.log(user.rows[0].userId, "userteste");
    await connectionDB.query(
      'UPDATE users SET "linksCount" = "linksCount"+1 WHERE id = $1',
      [user.rows[0].userId]
    );
    await connectionDB.query(
      `INSERT INTO urls("userId", url, "shortUrl", "visitCount") VALUES ($1,$2,$3,$4)`,
      [user.rows[0].userId, url, shortUrl, visitCount]
    );

    return res.status(201).send({ shortUrl });
  } catch (err) {
    res.status(422).send(err);
  }
}

async function GetShorten(req, res) {
  const { id } = req.params;
  try {
    const { rows } = await connectionDB.query(
      'SELECT id, "shortUrl", url FROM urls WHERE id = $1',
      [id]
    );
    if (rows.length === 0) {
      return res.status(404).send("Url não existe!");
    }
    return res.status(200).send(rows[0]);
  } catch (err) {
    res.sendStatus(404);
  }
}

async function RedirectShorten(req, res) {
  const { shortUrl } = req.params;
  console.log(shortUrl, "short");
  try {
    const { rows } = await connectionDB.query(
      'SELECT * FROM urls WHERE "shortUrl" = $1',
      [shortUrl]
    );
  
      if (rows.length === 0) {
        return res.status(404).send("Url não existe!");
      }
    //aumenta o visitCount daquele link
    await connectionDB.query(
      'UPDATE urls SET "visitCount" = "visitCount"+1 WHERE "shortUrl" = $1',
      [shortUrl]
    );
    
    const user = await connectionDB.query(
      'SELECT "userId" from urls WHERE "shortUrl"= $1',
      [shortUrl]
    );
    console.log(user.rows[0].userId, "uss");
    //pega o total de visitCounts
    const visits = await connectionDB.query(
      `SELECT SUM("visitCount") FROM urls WHERE "userId" = $1`,
      [user.rows[0].userId]
    );
    //seta o total de visitCounts
    await connectionDB.query(
      `UPDATE users SET "visitCount" = $1 WHERE id = $2`,
      [visits.rows[0].sum, user.rows[0].userId]
    );


    const link = rows[0].url;
    return res.redirect(link);
  } catch (err) {
    res.status(404).send(err);
  }
}

async function DeleteShorten(req, res) {
  const { token } = res.locals;
  const { id } = req.params;
  try {
    const user = await connectionDB.query(
      "SELECT * FROM sessions WHERE token = $1",
      [token]
    );
 
    
    const userLink = await connectionDB.query(
      'SELECT "userId", "visitCount" from urls WHERE id= $1',
      [id]
      );
      if(userLink.rows.length===0){
        return res.sendStatus(404)
      }
      console.log(user.rows[0].userId,"user.rows");
      console.log(user.rows[0].id,"userLink.rows");
      if (userLink.rows[0].userId !== user.rows[0].userId) {
        return res.sendStatus(401);
      }

    //soma o total dos visitCounts do usuario
    const visits = await connectionDB.query(
      `SELECT SUM("visitCount") FROM users WHERE id = $1`,
      [userLink.rows[0].userId]
    );

    const diff = visits.rows[0].sum - userLink.rows[0].visitCount;

    console.log(visits.rows, "visits");
    await connectionDB.query(
      `UPDATE users SET "visitCount" = $1 WHERE id = $2`,
      [diff, userLink.rows[0].userId]
    );

    await connectionDB.query(
      'UPDATE users SET "linksCount" = "linksCount"-1 WHERE id = $1',
      [user.rows[0].userId]
    );

    console.log(user.rows[0].userId, "user");
  
    await connectionDB.query(`DELETE from urls WHERE id=$1`, [id]);
    return res.sendStatus(204);
  } catch (error) {
    return res.status(500).send(error.message);
  }
}

export { PostShorten, GetShorten, RedirectShorten, DeleteShorten };
