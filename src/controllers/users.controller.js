import { connectionDB } from "../database/db.js";

async function findUsers(req,res) {
  try{
    const usersCheck = await connectionDB.query(`select * from users`);
    console.log(usersCheck);
return res.send(usersCheck);
  }catch (err){
    res.send(err.message)
  }     
}
export {findUsers}