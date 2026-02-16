import crypto from "crypto";

/**
 * Generates a secure 32-character External ID
 * Example: finops-a3f9c1e8b2d44e6f7c9a3b1d5e8f2c90
 */
export function generateExternalId(prefix = "finops") {
  const randomPart = crypto.randomBytes(16).toString("hex"); // 32 chars
  return `${prefix}-${randomPart}`;
}


