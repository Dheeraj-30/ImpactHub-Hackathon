import express from "express";
import { NgoDetail } from "../controllers/NgoDetailController.js";

const NgoDetailRouter = express.Router();

NgoDetailRouter.get("/getNgoDetail", NgoDetail);

export default NgoDetailRouter;
