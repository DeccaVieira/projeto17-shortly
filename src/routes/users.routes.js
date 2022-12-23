import { Router } from "express";
import { validateToken } from "../midlewares/token.middleware.js";
import {searchData} from "../controllers/users.controller.js"

const userRouter = Router();

userRouter.get("/users/me", validateToken, searchData);


export default userRouter;