import AWS from "../model/aws.js";

const loadCurrentAwsSetup = async (req, res, next) => {
  const user = req.user;

  if (!user) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const aws = await AWS.findOne({
    user: user._id,
    // status: "IN_PROGRESS",
  });

  if (!aws) {
    return res.status(404).json({
      message: "No active AWS setup found. Complete step 1 first.",
    });
  }

  req.aws = aws; // ✅ attach AWS record
  next();
};

export default loadCurrentAwsSetup;
