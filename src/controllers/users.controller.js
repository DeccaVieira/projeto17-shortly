import { connectionDB } from "../database/db.js";

async function searchData(req,res) {
  const { token } = res.locals;
  try{
//     const userId = await connectionDB.query('SELECT "userId" FROM sessions WHERE token = $1',[token]);
// console.log(userId.rows[0].userId, "UserIdU") 
// const {rows} = await connectionDB.query('SELECT id, name FROM users WHERE ID = $1',[userId.rows[0].userId])

// const urls = await connectionDB.query('SELECT * FROM urls WHERE "userId" = $1', [userId.rows[0].userId]);


const userUrls = await connectionDB.query(`SELECT users.id, users.name, json_agg(urls.*) as "shortenedUrls" FROM urls 
JOIN users ON users.id =
urls."userId" 
JOIN sessions ON sessions."userId" = 
users.id WHERE token = $1 
GROUP BY users.id
`,[token]);


console.log(userUrls, "urls");

return res.send(userUrls.rows);
  }catch (err){
    res.send(err.message)
  }     
}
export {searchData}