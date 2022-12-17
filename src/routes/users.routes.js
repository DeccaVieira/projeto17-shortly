import { Router } from "express";
import { findUsers } from "../controllers/users.controller.js";

const userRouter = Router();

userRouter.get("/users", findUsers);

export default userRouter;