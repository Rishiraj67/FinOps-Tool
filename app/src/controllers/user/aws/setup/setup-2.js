import AWS from "../../../../model/aws.js";
import { generateExternalId } from "../../../../../utils/generateExternalID.js";

const awsStep2 = async (req, res) => {
    const awsData = req.aws; // from loadCurrentAws middleware

    const aws = await AWS.findOne({ aws_account: awsData.aws_account });
    if (!aws || aws.step !== 1) {
        return res.status(400).json({ message: "Invalid step flow" });
    }



    aws.aws_external_id = generateExternalId();
    aws.step = 2;

    await aws.save();

    res.json({
        success: true,
        message: "External ID generated",
        externalId: aws,
    });
};

export default awsStep2;