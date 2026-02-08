import { Router } from "express";
import updateArn from "../controllers/user/CloudWatch/arn.js";
import protect from "../middleware/protect.js";

export const awsRouter = Router();


// Update Aws
awsRouter.patch("/set-up-aws-account", protect, updateArn);
