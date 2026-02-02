import express from "express";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import cors from "cors";


const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended: true}));


app.get("/", (req, res)=> {
    res.status(200).json({
        status: "Success",
        message: "Server is Running"
    })
});

// Use all Route here
import { userRouter } from "./src/routes/user.route.js";
app.use("/auth", userRouter);



export default app;
