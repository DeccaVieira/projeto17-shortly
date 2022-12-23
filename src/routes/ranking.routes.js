import { Router } from "express";
import {GetRanking} from "../controllers/ranking.controllers.js"

const rankingRouter = Router();

rankingRouter.get("/ranking", GetRanking);


export default rankingRouter;