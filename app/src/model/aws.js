import mongoose from "mongoose";


const awsSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  aws_account: {
    type: String,
    required: true,
    unique: true,
  },
  
  region: String,

  aws_external_id: String,
  aws_arn: String,
  aws_role: String,

  step: {
    type: Number,
    default: 1, // 1 = basic info, 2 = externalId generated, 3 = arn verified
  },

  status: {
    type: String,
    enum: ["IN_PROGRESS", "COMPLETED"],
    default: "IN_PROGRESS",
  },
}, { timestamps: true });



const AWS = mongoose.model("AWS", awsSchema);

export default AWS;
