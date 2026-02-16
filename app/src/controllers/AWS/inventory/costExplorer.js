import {
  CostExplorerClient,
  GetCostAndUsageCommand,
} from "@aws-sdk/client-cost-explorer";
import assumeUserRole from "../../../../config/aws/assumeUserRole.js";

const getCostAndUsage = async (req, res) => {
  try {
    if (!req.aws) {
      return res.status(400).json({
        success: false,
        message: "AWS configuration missing",
      });
    }

    const { startDate, endDate } = getLast30Days();


    // 1️⃣ Assume role
    const stsCreds = await assumeUserRole(
      req.aws.aws_arn,
      req.aws.aws_external_id
    );

    if (!stsCreds) {
      return res.status(403).json({
        success: false,
        message: "Failed to assume AWS role. Check IAM role and external ID.",
      });
    }

    const credentials = {
      accessKeyId: stsCreds.AccessKeyId,
      secretAccessKey: stsCreds.SecretAccessKey,
      sessionToken: stsCreds.SessionToken,
    };

    // 3️⃣ Create Cost Explorer client
    const costExplorerClient = new CostExplorerClient({
      region: "us-east-1",
      credentials,
    });

    // 4️⃣ Correct metric name
    const command = new GetCostAndUsageCommand({
      TimePeriod: {
        Start: startDate,
        End: endDate,
      },
      Granularity: "DAILY",
      Metrics: ["UnblendedCost"],
    });

    const response = await costExplorerClient.send(command);

    // 5️⃣ Send response properly
    return res.status(200).json({
      success: true,
      data: response,
    });

  } catch (error) {
    console.error("Cost Explorer error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch AWS cost data",
      error: error.message,
    });
  }
};



/* -------------------------------------------------------------------------- */
/*                               Helper Methods                               */
/* -------------------------------------------------------------------------- */

/**
 * Get last 30 days in YYYY-MM-DD format
 */
const getLast30Days = () => {
  const end = new Date();
  const start = new Date();

  start.setDate(end.getDate() - 30);

  return {
    startDate: formatDate(start),
    endDate: formatDate(end),
  };
};

/**
 * Format JS Date to YYYY-MM-DD
 */
const formatDate = (date) => date.toISOString().split("T")[0];





export default getCostAndUsage;
