import { Router } from "express";
// import updateArn from "../controllers/user/CloudWatch/arn.js";
import protect from "../middleware/protect.js";
import awsStep1 from "../controllers/user/aws/setup/setup-1.js";
import awsStep2 from "../controllers/user/aws/setup/setup-2.js";
import awsStep3 from "../controllers/user/aws/setup/setup-3.js";
import loadCurrentAws from "../middleware/loadAws.js";
import reConnectAWS from "../controllers/user/aws/reConnectAWS.js";
import getCostAndUsage from "../controllers/AWS/inventory/costExplorer.js";

export const awsRouter = Router();


// Update Aws
// awsRouter.patch("/set-up-aws-account", protect, updateArn);

awsRouter.post("/aws-set-up1", protect, awsStep1);
awsRouter.post("/aws-set-up2", protect, loadCurrentAws, awsStep2);
awsRouter.post("/aws-set-up3", protect, loadCurrentAws, awsStep3);

awsRouter.get("/re-connect-aws", protect, loadCurrentAws,reConnectAWS);

// Inventory
awsRouter.get("/get/cost-explorer/cost-and-usage", protect, loadCurrentAws, getCostAndUsage);