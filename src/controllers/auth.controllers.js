import { connectionDB } from "../database/db.js";
import bcrypt from "bcrypt";

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
  return res.status(200).send("Cadastro feito com sucesso!")
} catch (err) {
  return res.status(400).send(err.message);
}
}

async function SingIn (req,res){
  const { email, password } = req.body;
}

export {SignUp};