// import {
//   CostExplorerClient,
//   GetCostAndUsageCommand,
// } from "@aws-sdk/client-cost-explorer";

// /**
//  * Discover AWS services used in the last 30 days
//  * @param {Object} creds - STS temporary credentials
//  * @returns {Promise<string[]>} List of AWS service names
//  */
// export const discoverUsedAwsServices = async (creds) => {
//   if (!creds) {
//     throw new Error("STS credentials are required");
//   }

//   const { startDate, endDate } = getLast30Days();

//   const client = new CostExplorerClient({
//     region: "us-east-1", // Cost Explorer is global
//     credentials: {
//       accessKeyId: creds.AccessKeyId,
//       secretAccessKey: creds.SecretAccessKey,
//       sessionToken: creds.SessionToken,
//     },
//   });

//   const command = new GetCostAndUsageCommand({
//     TimePeriod: {
//       Start: startDate,
//       End: endDate,
//     },
//     Granularity: "DAILY",
//     Metrics: ["UnblendedCost"],
//     GroupBy: [
//       {
//         Type: "DIMENSION",
//         Key: "SERVICE",
//       },
//     ],
//   });

//   const response = await client.send(command);

//   return extractUsedServices(response);
// };

// /* -------------------------------------------------------------------------- */
// /*                               Helper Methods                               */
// /* -------------------------------------------------------------------------- */

// /**
//  * Get last 30 days in YYYY-MM-DD format
//  */
// const getLast30Days = () => {
//   const end = new Date();
//   const start = new Date();

//   start.setDate(end.getDate() - 30);

//   return {
//     startDate: formatDate(start),
//     endDate: formatDate(end),
//   };
// };

// /**
//  * Format JS Date to YYYY-MM-DD
//  */
// const formatDate = (date) => date.toISOString().split("T")[0];

// /**
//  * Extract only services with cost > 0
//  */
// const extractUsedServices = (response) => {
//   const services = new Set();

//   if (!response?.ResultsByTime) {
//     return [];
//   }

//   response.ResultsByTime.forEach((period) => {
//     period.Groups?.forEach((group) => {
//       const serviceName = group.Keys?.[0];
//       const amount = group.Metrics?.UnblendedCost?.Amount;

//       if (serviceName && parseFloat(amount) > 0) {
//         services.add(serviceName);
//       }
//     });
//   });

//   return Array.from(services);
// };


import {
  CostExplorerClient,
  GetCostAndUsageCommand,
} from "@aws-sdk/client-cost-explorer";

/* -------------------------------------------------------------------------- */
/*                           MAIN ENTRY FUNCTION                              */
/* -------------------------------------------------------------------------- */

/**
 * Discover AWS services used in last 30 days
 * @param {Object} creds - STS temporary credentials
 * @returns {Promise<Array<{ service: string, cost: number }>>}
 */
export const discoverUsedAwsServices = async (creds) => {
  if (!creds) {
    throw new Error("STS credentials are required");
  }

  const { startDate, endDate } = getLast30Days();

  const client = new CostExplorerClient({
    region: "us-east-1", // Cost Explorer is global endpoint
    credentials: {
      accessKeyId: creds.AccessKeyId,
      secretAccessKey: creds.SecretAccessKey,
      sessionToken: creds.SessionToken,
    },
  });

  const command = new GetCostAndUsageCommand({
    TimePeriod: {
      Start: startDate,
      End: endDate,
    },
    Granularity: "DAILY", // IMPORTANT: use DAILY
    Metrics: ["UnblendedCost"],
    GroupBy: [
      {
        Type: "DIMENSION",
        Key: "SERVICE",
      },
    ],
  });

  const response = await client.send(command);

  return extractUsedServices(response);
};

/* -------------------------------------------------------------------------- */
/*                              HELPER METHODS                                */
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
 * Format Date -> YYYY-MM-DD
 */
const formatDate = (date) => date.toISOString().split("T")[0];

/**
 * Extract services with total cost > 0
 */
const extractUsedServices = (response) => {
  if (!response?.ResultsByTime) return [];

  const serviceCostMap = {};

  response.ResultsByTime.forEach((period) => {
    period.Groups?.forEach((group) => {
      const serviceName = group.Keys?.[0];
      const amount = parseFloat(
        group.Metrics?.UnblendedCost?.Amount || 0
      );

      if (!serviceName) return;

      const normalizedService = normalizeServiceName(serviceName);

      if (!serviceCostMap[normalizedService]) {
        serviceCostMap[normalizedService] = 0;
      }

      serviceCostMap[normalizedService] += amount;
    });
  });

  // Remove zero-cost services
  return Object.entries(serviceCostMap)
    .filter(([_, cost]) => cost > 0)
    .map(([service, cost]) => ({
      service,
      cost: Number(cost.toFixed(2)),
    }));
};

/* -------------------------------------------------------------------------- */
/*                         SERVICE NAME NORMALIZER                            */
/* -------------------------------------------------------------------------- */

/**
 * Normalize AWS billing names into logical services
 */
const normalizeServiceName = (serviceName) => {
  const ec2Keywords = [
    "Amazon Elastic Compute Cloud",
    "EC2",
    "Elastic Load Balancing",
    "Amazon Elastic Block Store",
  ];

  if (ec2Keywords.some((keyword) => serviceName.includes(keyword))) {
    return "EC2";
  }

  return serviceName;
};
