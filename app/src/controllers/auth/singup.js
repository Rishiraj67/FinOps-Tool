import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs";
import User from '../../model/user.js';
import { PutObjectCommand } from "@aws-sdk/client-s3";

const registerUser = async (req, res) => {
    const { email, phone, name, password } = req.body;

    const requiredFields = {
        email: "Email is required",
        name: "Name is required",
        password: "Password is required",
        phone: "Phone number is required",
    };

    for (const [field, message] of Object.entries(requiredFields)) {
        if (!req.body[field]) {
            return res.status(400).json({ message });
        }
    }

    try {
        const existingUser = await User.findOne({
            $or: [{email}, {phoneNum: phone}]
        });

        if(existingUser){
            if(existingUser.email === email){
                return res.status(400).json({message: "Email already registered"});
            } else if (existingUser.phoneNum === phone){
                return res.status(400).json({message: "Phone Number already registered"});
            }
        };

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await User.create({
            phoneNum: phone,
            name,
            email,
            password: hashedPassword,
            isVerified: false
        });

        return res.status(200).json({
            message: "User registered successfully",
            isVerified: newUser});
    } catch (error) {
        // Handle duplicate key error explicitly
        if (error.code === 11000) {
            if (error.keyPattern.phone) {
                return res.status(400).json({ message: "Phone number already registered." });
            }
            if (error.keyPattern.email) {
                return res.status(400).json({ message: "Email already registered." });
            }
        }

        console.error("Error during user registration:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};


export default registerUser;
