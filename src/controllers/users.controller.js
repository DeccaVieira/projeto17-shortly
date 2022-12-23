import { connectionDB } from "../database/db.js";

async function searchData(req, res) {
  const { token } = res.locals;
console.log(token, "token");
  try {
    const userId = await connectionDB.query(
      'SELECT "userId" FROM sessions WHERE token = $1',
      [token]
    );
    console.log(userId.rows[0].userId, "aaaaaaaa");

    const visits = await connectionDB.query(
      `SELECT SUM("visitCount") FROM urls WHERE "userId" = $1`,
      [userId.rows[0].userId]
    );

    await connectionDB.query(
      `UPDATE users SET "visitCount" = $1 WHERE id = $2`,
      [visits.rows[0].sum, userId.rows[0].userId]
    );
  
    const userUrls = await connectionDB.query(
      `SELECT users.id, users.name ,users."visitCount" ,json_agg((urls.id, urls."shortUrl", urls.url, urls."visitCount")) as "shortenedUrls" FROM urls 
JOIN users ON users.id =
urls."userId" 
JOIN sessions ON sessions."userId" = 
users.id WHERE sessions.token = $1
GROUP BY users.id
`,
      [token]
    );
  const newArray = userUrls.rows[0].shortenedUrls.map(item => {return {id: item.f1,ShortUrl:item.f2, url:item.f3, visitCount:item.f4}})
    

    return res.send({...userUrls.rows[0], shortenedUrls:newArray});
  } catch (err) {
    res.send(err.message);
  }
}
export { searchData };
