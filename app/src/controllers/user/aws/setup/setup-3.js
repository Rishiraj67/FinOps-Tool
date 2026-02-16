import mongoose from "mongoose";
import createUserS3Folders from "../s3/createUserS3Folders.js";
import AWS from "../../../../model/aws.js";
import assumeUserRole from "../../../../../config/aws/assumeUserRole.js";

const awsStep3 = async (req, res) => {
  const awsData = req.aws;
  const user = req.user;

  const { aws_arn, aws_role } = req.body;

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const aws = await AWS.findOne({ aws_account: awsData.aws_account }).session(session);

    if (!aws || aws.step !== 2) {
      throw new Error("Invalid setup step");
    }

    aws.aws_arn = aws_arn;
    aws.aws_role = aws_role;
    aws.step = 3;
    aws.status = "COMPLETED";

    await aws.save({ session });

    // 🔥 irreversible external action
    const foldersCreated = await createUserS3Folders(user._id, awsData.aws_account);

    if (!foldersCreated) {
      throw new Error("S3 folder creation failed");
    }

    const credentials = await assumeUserRole(aws_arn, aws.aws_external_id);
    if (!credentials) {
      throw new Error("Failed to assume AWS role");
    }

    await session.commitTransaction();
    session.endSession();

    res.json({
      success: true,
      message: "AWS setup completed successfully",
      aws,
      credentials
    });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();

    res.status(500).json({
      success: false,
      message: "AWS setup failed",
      error: error,
    });
  }
};

export default awsStep3;
