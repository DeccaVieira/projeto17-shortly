import { connectionDB } from "../database/db.js";
import bcrypt from "bcrypt";
import { v4 as uuidV4 } from "uuid";
import { signUpSchema, signInSchema } from "../schemas/userSchemas.js";

async function SignUp(req, res) {
  const { name, email, password, confirmPassword } = req.body;
  const visitCount = 0;
  const linksCount = 0;
  try {
    const userExists = await connectionDB.query(
      "SELECT * FROM users WHERE email = $1",
      [email]
    );
    const { error } = signUpSchema.validate(req.body, { abortEarly: false });
    if (error) {
      const errors = error.details.map((detail) => detail.message);
      return res.status(422).send(errors);
    }
    if (userExists.rows.length !== 0) {
      return res.status(409).send({ message: "Usuário já cadastrado" });
    }
    if (password !== confirmPassword) {
      return res
        .status(409)
        .send({ message: "Confirmação de senha não confere!" });
    }

    const hashPassword = bcrypt.hashSync(password, 10);

    await connectionDB.query(
      `INSERT INTO users (name, email, password, "visitCount", "linksCount") VALUES ($1,$2,$3,$4,$5)`,
      [name, email, hashPassword, visitCount, linksCount]
    );
    return res.status(201).send("Cadastro feito com sucesso!");
  } catch (err) {
    return res.status(400).send(err.message);
  }
}

async function SingIn(req, res) {
  const { email, password } = req.body;

  try {
    const userExists = await connectionDB.query(
      "SELECT * FROM users WHERE email = $1",
      [email]
    );
 
    if (!userExists) {
      return res.status(401).send("Usuário não cadastrado!");
    }
  
    const { error } = signInSchema.validate(req.body, { abortEarly: false });
    if (error) {
      const errors = error.details.map((detail) => detail.message);
      return res.status(422).send(errors);
    }
   
    const passwordOk = bcrypt.compareSync(
      password,
      userExists.rows[0].password
    );
 
    if (!passwordOk) {
      return res.status(401).send("Usuário ou senha Incorreta!");
    }

    const token = uuidV4();
    await connectionDB.query(
      `INSERT INTO sessions(token, "userId") VALUES ($1,$2)`,
      [token, userExists.rows[0].id]
    );
  
    res.status(200).send({ token, name: userExists.name });
  } catch (err) {
    console.log(err);
    res.sendStatus(422);
  }
}

export { SignUp, SingIn };
