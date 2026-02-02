import mongoose from "mongoose";

const AWSSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.ObjectId,
        ref: "User",
        require: true
    },
    aws_account:{
        type: String,
        unique: true,
    },
    aws_role:{
        type:String
    },
    region:{
        type: String
    }
});


const AWS = mongoose.model("AWS", AWSSchema);

export default AWS;
