import assumeUserRole from "../../../../config/aws/assumeUserRole.js";
import {discoverUsedAwsServices} from "../../AWS/services/discoverServices.js";

const reConnectAWS = async (req, res) => {
  try {
    if (!req.aws) {
      return res.status(400).json({ message: "AWS data missing" });
    }

    const credentials = await assumeUserRole(
      req.aws.aws_arn,
      req.aws.aws_external_id,
    );

      const usedServices = await discoverUsedAwsServices(credentials);

    res.json({
      success: true,
      message: "AWS re-connection successful",
      usedServices,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "AWS re-connection failed",
      error: error.message,
    });
  }
};


export default reConnectAWS;
