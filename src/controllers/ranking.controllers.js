import { connectionDB } from "../database/db.js";

async function GetRanking(req, res) {
  try {
  

    const rankingLink = await connectionDB.query(
      `SELECT id, name, "linksCount", "visitCount" from users GROUP BY id ORDER BY "visitCount" DESC LIMIT 10`
    );
    console.log(rankingLink, "rank");
    res.status(200).send(rankingLink.rows);
  } catch (err) {
    console.log(err);
    res.sendStatus(422);
  }
}
export { GetRanking };
