import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "../../model/user.js";

const login = async (req, res) => {
  try {
    const { email, phone, password } = req.body;

    // 1. Validation
    if (!password) {
      return res.status(400).json({
        success: false,
        message: "Password is required",
      });
    }

    if (!email && !phone) {
      return res.status(400).json({
        success: false,
        message: "Email or phone is required",
      });
    }

    // 2. Fetch user WITH password
    const user = await User.findOne({
      $or: [
        email ? { email } : null,
        phone ? { phone } : null,
      ].filter(Boolean),
    }).select("+password"); // 🔥 FIX

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or phone",
      });
    }

    // 3. Password compare (NO ERROR NOW)
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid password",
      });
    }

    // 4. Tokens
    const accessToken = jwt.sign(
      { userId: user._id },
      process.env.JWT_ACCESS_SECRET,
      { expiresIn: "15m" }
    );

    const refreshToken = jwt.sign(
      { userId: user._id },
      process.env.JWT_REFRESH_SECRET,
      { expiresIn: "120d" }
    );

    // 5. Remove password from response
    const userData = user.toObject();
    delete userData.password;


    // Store Token in Cookies
    res.cookie("aToken", accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "prod",
        sameSite: 'strict',
        maxAge: 15 * 60 * 1000,
    });

    res.cookie("rToken", refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "prod",
        sameSite: 'strict',
        maxAge: 365 * 24 * 60 * 60 * 1000,
    });
    return res.status(200).json({
      success: true,
      message: "Login successful",
      accessToken,
      refreshToken,
      user: userData,
    });

  } catch (error) {
    console.error("Login Error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export default login;
