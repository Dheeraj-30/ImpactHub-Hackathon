import express from "express";
import { loginUser, registerUser } from "../controllers/userControllers.js";
import multer from "multer";

const userRouter = express.Router();

const storage = multer.diskStorage({
  destination: "uploads",
  filename: (req, file, cb) => {
    return cb(null, `${Date.now()}${file.originalname}`);
  },
});

const upload = multer({ storage: storage });

userRouter.post("/register", upload.single("Id_Proof"), registerUser);

userRouter.post("/login", loginUser);

export default userRouter;
