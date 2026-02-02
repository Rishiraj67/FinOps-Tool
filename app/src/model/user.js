import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        sparse: true
    },
    phoneNum:{
        type: String,
        unique: true,
        default: null,
        sparse: true
    },
    password: {
        type: String,
        required: true,
        select: false, // 🔒 important
    },
    googleId:{
        type: String,
        unique: true,
        sparse: true
    },
    aws:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"AWS"
    },
    isVerified:{
        type: Boolean,
        default: false
    },
    created_at:{
        type: Date,
        default: Date.now
    },
    update_at:{
        type: Date,
        default: Date.now
    }
});

const User = mongoose.model("User", UserSchema);

export default User;
