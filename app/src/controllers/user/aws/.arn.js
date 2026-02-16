// import mongoose from "mongoose";
// import AWS from "../../../model/aws.js";
// import createUserS3Folders from "../S3/createUserS3Folders.js";

// const updateArn = async (req, res) => {
//   const { aws_account, aws_arn, aws_role, aws_external_id, region } = req.body;
//   const user = req.user;

//   if (!user) {
//     return res.status(400).json({
//       success: false,
//       message: "Didn't receive user data from middleware",
//     });
//   }

//   if (!aws_arn) {
//     return res.status(400).json({
//       message: "Enter Valid ARN",
//     });
//   }

//   const session = await mongoose.startSession();
//   session.startTransaction();

//   try {
//     // 1️⃣ Create AWS DB record (inside transaction)
//     const [updateAws] = await AWS.create(
//       [
//         {
//           aws_account,
//           region,
//           user: user._id,
//         },
//       ],
//       { session }
//     );

//     // 2️⃣ Create S3 folders
//     const foldersCreated = await createUserS3Folders(
//       user._id,
//       updateAws.aws_account
//     );

//     if (!foldersCreated) {
//       throw new Error("S3 folder creation failed");
//     } 

//     // 3️⃣ Commit transaction (ONLY now)
//     await session.commitTransaction();
//     session.endSession();

//     return res.status(200).json({
//       success: true,
//       message: "AWS credentials saved & S3 folders created successfully",
//       updateAws,
//     });
//   } catch (error) {
//     // ❌ Rollback everything
//     await session.abortTransaction();
//     session.endSession();

//     return res.status(500).json({
//       success: false,
//       message: "Operation failed. No data was saved.",
//       error: error.message,
//     });
//   }
// };

// export default updateArn;
