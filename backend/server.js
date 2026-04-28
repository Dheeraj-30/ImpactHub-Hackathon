
import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { connectDB } from './config/db.js';


import RaiseQuestRouter from './routes/RaiseQuestRouter.js';
import NgoDetailRouter from './routes/NgoDetailRouter.js';
import userRouter from './routes/userRoute.js';

const app = express();
const port = process.env.PORT || 4000;


app.use(express.json());
app.use(cors());


connectDB(); 


app.use("/api/RaiseQuest", RaiseQuestRouter);
app.use("/api/ngoDetail", NgoDetailRouter);
app.use("/api/user", userRouter);
app.use("/images", express.static('uploads'));

app.get("/", (req, res) => {
    res.send("ImpactHub Backend is Running smoothly!");
});


app.listen(port, () => {
    console.log(`✅ Server running on port ${port}`); 
});