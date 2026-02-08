import { Router } from "express";
import  registerUser from "../controllers/auth/singup.js";
import login from "../controllers/auth/login.js";


export const userRouter = Router();

userRouter.post("/signup",registerUser);
userRouter.post("/login", login);
