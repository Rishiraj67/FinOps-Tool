import assumeUserRole from "../config/aws/assumeUserRole.js";


const stsCache = new Map();

/**
 * Get valid STS credentials (reuse until expiry)
 */
const getStsCredentials = async (cacheKey, roleArn, externalId) => {
  const cached = stsCache.get(cacheKey);

  // 1. Reuse if not expired
  if (cached && new Date(cached.Expiration) > new Date()) {
    return cached;
  }

  // 2. Refresh silently
  try {
    const fresh = await assumeUserRole(roleArn, externalId);
    stsCache.set(cacheKey, fresh);
    return fresh;
  } catch (err) {
    throw new Error("AWS_ASSUME_ROLE_FAILED");
  }
};

export default getStsCredentials;