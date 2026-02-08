import User from "../model/user.js";
import { verifyRefreshToken } from "../../utils/verifyRefreshToken.js";

const protect = async (req, res, next) => {
  try {
    const rToken = req.cookies?.rToken;

    if (!rToken) {
      return res.status(401).json({ message: "Authentication required" });
    }

    // ✅ verify refresh token
    const { valid, data, error } = verifyRefreshToken(rToken);

    if (!valid) {
      return res.status(401).json({ message: error });
    }

    // ✅ Mongoose correct query + correct fields
    const user = await User.findById(data.userId).select(
      "name email phoneNum isVerified aws created_at"
    );

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    req.user = user;
    next();

  } catch (error) {
    console.error("Protect middleware error:", error);
    return res.status(401).json({
      message: "Invalid or expired token",
    });
  }
};

export default protect;
