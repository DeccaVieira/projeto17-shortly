import { connectionDB } from "../database/db.js";
import bcrypt from "bcrypt";
import { v4 as uuidV4 } from "uuid";

async function SignUp(req,res){
const {name, email, password,confirmPassword} = req.body;
try{
  const userExists = await connectionDB.query('SELECT * FROM users WHERE email = $1', [email]);
if(userExists.rows.length !== 0){
  return res.status(409).send({ message: "Usuário já cadastrado" });
}
if(password !== confirmPassword){
  return res.status(409).send({ message: "Confirmação de senha não confere!" });
}
const hashPassword = bcrypt.hashSync(password, 10);

const user = await connectionDB.query(
  `INSERT INTO users (name, email, password) VALUES ($1,$2,$3)`,
  [name, email, hashPassword]);
  return res.status(201).send("Cadastro feito com sucesso!")
} catch (err) {
  return res.status(400).send(err.message);
}
}

async function SingIn (req,res){
  const { email, password } = req.body;
  try{
    const userExists = await connectionDB.query("SELECT * FROM users WHERE email = $1",[email]);
    if(!userExists){
      return res.status(401).send("Usuário não cadastrado!");
    }
    console.log(userExists.rows[0].password,"teste");
    const passwordOk = bcrypt.compareSync(password, userExists.rows[0].password);
console.log(password, userExists.password);
    if(!passwordOk){
      return res.status(401).send("Senha Incorreta!");
    }
    const token = uuidV4();
    await connectionDB.query(`INSERT INTO sessions(token, "userId") VALUES ($1,$2)`,[token, userExists.id]);
res.send({token, name:userExists.name})
  }catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}

export {SignUp, SingIn};