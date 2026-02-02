import { PutObjectCommand } from "@aws-sdk/client-s3";


const upload = async (userId, newAccountId, data) => {
    const key = `user/${userId}/metrices/${newAccountId}/${Date.now()}.json`;

    await s3.send(
        new PutObjectCommand({
            Bucket: process.env.AWS_S3_BUCKET,
            Key: key,
            Body: JSON.stringify(data),
            ContentType: "application/json"
        })
    );
};
