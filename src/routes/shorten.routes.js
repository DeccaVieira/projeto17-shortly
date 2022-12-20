import {PostShorten,GetShorten }from "../controllers/shorten.controllers.js";
import { validateToken } from "../midlewares/token.middleware.js";
import { Router } from "express";

const shortenRouter = Router();
shortenRouter.use(validateToken);

shortenRouter.post("/urls/shorten",PostShorten);
shortenRouter.get("/urls/:id", GetShorten);

export default shortenRouter;
