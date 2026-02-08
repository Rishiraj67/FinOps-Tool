import { STSClient, AssumeRoleCommand } from "@aws-sdk/client-sts";

/**
 * Assume role in USER AWS ACCOUNT
 */
export const assumeUserRole = async (roleArn, externalId) => {
  const sts = new STSClient({
    region: process.env.AWS_REGION,
  });

  const command = new AssumeRoleCommand({
    RoleArn: roleArn,
    RoleSessionName: "cloudwatch-saas-session",
    ExternalId: externalId,
    DurationSeconds: 3600,
  });

  const response = await sts.send(command);

  return response.Credentials;
};
