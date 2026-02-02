import User from "../../../model/user";

const updateArn = async(req, res) => {
    const {arn} = req.body;

    const {user} = req.user;

    try {
        if (!user) {
            return res.status(400).json({
              success: false,
              message: "Didn't recieve user data from middleware",
            });
          }

          if(!arn){
            
          }
    } catch (error) {

    }
}
