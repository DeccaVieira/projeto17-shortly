import { connectionDB } from "../database/db.js";
import { nanoid } from 'nanoid'

async function PostShorten(req,res){

  const { token } = res.locals;
  console.log(token);
  const { url } = req.body;
  const shortUrl = nanoid(6);
  console.log(shortUrl, "small");
try{
  const user = await connectionDB.query('SELECT * FROM sessions WHERE token = $1',[token]);
  
 await connectionDB.query(`INSERT INTO urls("userId", url, "shortUrl") VALUES ($1,$2,$3)`,[user.rows[0].userId , url, shortUrl]);

 const short = await connectionDB.query('SELECT * FROM urls WHERE "shortUrl"= $1',[shortUrl]);
 console.log(short.rows[0].shortUrl, "short");
return res.status(201).send(`{"shortUrl": "${short.rows[0].shortUrl}"}`);

}catch (err) {
    res.sendStatus(err);
  }
}

async function GetShorten(req,res){
  const { id } = req.params;
  try{
    const {rows} = await connectionDB.query('SELECT * FROM urls WHERE id = $1', [id]);
    if (rows.length === 0) {
      res.sendStatus(404);

    }
    return res.sendStatus(200);
  }catch (err) {
    res.sendStatus(err);
  }
}

async function RedirectShorten(req,res){
  const {shortUrl} = req.params;

  try{
const {rows} = await connectionDB.query('SELECT * FROM urls WHERE "shortUrl" = $1',[shortUrl]);
if (rows.length === 0) {
 return res.sendStatus(404);
}
const link = rows[0].url
  console.log(rows[0].url, "urll");
res.redirect(link)




  }  catch (err) {
    res.sendStatus(err);
  }
}

async function DeleteShorten(req,res){
  const { token } = res.locals;
  const { id } = req.params;
  try {
    const user = await connectionDB.query('SELECT * FROM sessions WHERE token = $1',[token]);
    const userUrl = await connectionDB.query('SELECT * FROM urls WHERE "userId"= $1',[user.rows[0].userId])
    console.log(user.rows[0].userId, "user");
    console.log(userUrl.rows[0].userId, "userUrl");
    if(userUrl.rows[0].userId !== user.rows[0].userId){
       return res.sendStatus(409);
   }
    await connectionDB.query(`DELETE from urls WHERE id=$1`, [id]);
    return res.sendStatus(204);
  } catch (error) {
    return res.status(500).send(error.message);
  }

}

export {PostShorten, GetShorten,RedirectShorten, DeleteShorten};