import AWS from "../../../../model/aws.js";

const awsStep1 = async (req, res) => {
    const user = req.user;
    const {aws_account, region} = req.body;

    if (!user) {
        return res.status(400).json({
            success: false,
            message: "Didn't receive user data from middleware"
        });
    }
    if (!aws_account || !region) {
        return res.status(400).json({
            success: false,
            message: "AWS Account and Region are required"
        });
    }
    
    // AWS DB record creation 
    const aws = await AWS.create({
        aws_account,
        region,
        user: user._id
    });

    return res.status(200).json({
        success: true,
        message: "AWS Account and Region saved successfully",
        aws
    });
}

export default awsStep1;