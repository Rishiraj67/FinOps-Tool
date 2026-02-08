import { PutObjectCommand } from "@aws-sdk/client-s3";
import { s3 } from "../../../../config/aws/config.js";

const createUserS3Folders = async (userId, awsAccountId) => {
  const basePath = `users/${userId}/${awsAccountId}/`;

  const folders = [
    `${basePath}metrics/`,
    `${basePath}reports/`,
    `${basePath}logs/`,
  ];

  try {
    for (const folder of folders) {
      await s3.send(
        new PutObjectCommand({
          Bucket: process.env.AWS_S3_BUCKET,
          Key: folder,      
          Body: "",
        })
      );
    }
    return true;
  } catch (error) {
    console.error("Failed to create S3 folders:", error);
    return false;
  }
};

export default createUserS3Folders;
