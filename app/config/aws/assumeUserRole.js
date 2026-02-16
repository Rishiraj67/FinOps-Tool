import { STSClient, AssumeRoleCommand } from "@aws-sdk/client-sts";

/**
 * Assume role in USER AWS ACCOUNT
 */
const assumeUserRole = async (roleArn, externalId) => {
  const sts = new STSClient({
    region: process.env.AWS_REGION,
  });

  // console.log("Assuming role with ARN:", roleArn);
  // console.log("Using External ID:", externalId);

  const command = new AssumeRoleCommand({
    RoleArn: roleArn,
    RoleSessionName: "cloudwatch-saas-session",
    ExternalId: externalId,
  });

  const response = await sts.send(command);

  return response.Credentials;
};


export default assumeUserRole;