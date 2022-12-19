import {SignUp, SingIn} from "../controllers/auth.controllers.js"
import { Router } from "express";

const authRouter = Router();

authRouter.post("/signup",SignUp);
authRouter.post("/signin", SingIn);

export default authRouter;