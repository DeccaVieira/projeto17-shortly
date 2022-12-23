import { connectionDB } from "../database/db.js";
import { nanoid } from "nanoid";

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
    console.log(user.rows[0].userId, "userteste");
    await connectionDB.query(
      'UPDATE users SET "linksCount" = "linksCount"+1 WHERE id = $1',
      [user.rows[0].userId]
    );
    await connectionDB.query(
      `INSERT INTO urls("userId", url, "shortUrl", "visitCount") VALUES ($1,$2,$3,$4)`,
      [user.rows[0].userId, url, shortUrl, visitCount]
    );

    const short = await connectionDB.query(
      'SELECT * FROM urls WHERE "shortUrl"= $1',
      [shortUrl]
    );

    const redirectLink = short.rows[0].shortUrl;

    return res.status(201).send(`{"shortUrl": "${redirectLink}"}`);
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
    return res.status(200).send(rows);
  } catch (err) {
    res.sendStatus(404);
  }
}

async function RedirectShorten(req, res) {
  const { shortUrl } = req.params;

  try {
    await connectionDB.query(
      'UPDATE urls SET "visitCount" = "visitCount"+1 WHERE "shortUrl" = $1',
      [shortUrl]
    );

    const { rows } = await connectionDB.query(
      'SELECT * FROM urls WHERE "shortUrl" = $1',
      [shortUrl]
    );

    if (rows.length === 0) {
      return res.status(404).send("Url não existe!");
    }

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
    await connectionDB.query(
      'UPDATE users SET "linksCount" = "linksCount"-1 WHERE id = $1',
      [user.rows[0].userId]
    );
    const userUrl = await connectionDB.query(
      'SELECT * FROM urls WHERE "userId"= $1',
      [user.rows[0].userId]
    );
    console.log(user.rows[0].userId, "user");
    console.log(userUrl.rows[0].userId, "userUrl");
    if (userUrl.rows[0].userId !== user.rows[0].userId) {
      return res.sendStatus(409);
    }
    await connectionDB.query(`DELETE from urls WHERE id=$1`, [id]);
    return res.sendStatus(204);
  } catch (error) {
    return res.status(500).send(error.message);
  }
}

export { PostShorten, GetShorten, RedirectShorten, DeleteShorten };
