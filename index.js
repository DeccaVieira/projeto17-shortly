import express from "express";
import cors from "cors";
import dotenv from 'dotenv';
dotenv.config();
import authRouter from "./src/routes/auth.routes.js"
import shortenRouter from "./src/routes/shorten.routes.js";
import rankingRouter from "./src/routes/ranking.routes.js";
import userRouter from "./src/routes/users.routes.js";

const app = express();
app.use(express.json());
app.use(cors());
app.use(authRouter);
app.use(shortenRouter);
app.use(userRouter);
app.use(rankingRouter);


const port = process.env.PORT;
console.log(port);
app.listen(port, () => console.log(`Server running in port ${port}`));