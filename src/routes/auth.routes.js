import {SignUp} from "../controllers/auth.controllers.js"
import { Router } from "express";

const authRouter = Router();

authRouter.post("/signup",SignUp);

export default authRouter;