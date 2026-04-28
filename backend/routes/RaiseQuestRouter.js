import express from "express";
import authmiddleware from "../middleware/auth.js";
import multer from "multer";

import {
  addRequest,
  GetAllRequest,
  AcceptRequest,
  GetMyAcceptedRequests,
  resolveRequest,
} from "../controllers/RaiseQuestControllers.js";

const RaiseQuestRouter = express.Router();

const storage = multer.diskStorage({
  destination: "uploads",
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
});
const upload = multer({ storage: storage });

RaiseQuestRouter.post(
  "/addRequest",
  authmiddleware,
  upload.single("image"),
  addRequest,
);
RaiseQuestRouter.get("/getAllRequest", authmiddleware, GetAllRequest);
RaiseQuestRouter.post("/AcceptRequest", authmiddleware, AcceptRequest);
RaiseQuestRouter.get(
  "/GetMyAcceptedRequests",
  authmiddleware,
  GetMyAcceptedRequests,
);
RaiseQuestRouter.post("/resolveRequest", authmiddleware, resolveRequest);

export default RaiseQuestRouter;
