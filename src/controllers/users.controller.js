import { connectionDB } from "../database/db.js";

async function searchData(req, res) {
  const { token } = res.locals;

  try {
    const userId = await connectionDB.query(
      'SELECT "userId" FROM sessions WHERE token = $1',
      [token]
    );
    if (userId.rows.length === 0) {
      return res.sendStatus(404);
    }

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
    console.log(userUrls.rows[0]);

    if (userUrls.rows.length === 0) {
      return res.send(userUrls.rows[0]);
    }
    const newArray = userUrls.rows[0]?.shortenedUrls.map((item) => {
      return {
        id: item.f1,
        ShortUrl: item.f2,
        url: item.f3,
        visitCount: item.f4,
      };
    });

    return res.send({ ...userUrls.rows[0], shortenedUrls: newArray });
  } catch (err) {
    res.send(err.message);
  }
}
export { searchData };
