import userModel from "../models/user.js";

export const loginController = async(req,res)=>{
    try {
        const {email , password} = req.body;
        const user = await userModel.findOne({email , password});

        if(!user){
            res.send(404).send("User Not Found, Please Register!");
        }

        res.status(200).json({
            success:true,
            user
        })


    } catch (error) {
        res.status(400).json({
            success:false,
            error
        })
    }
}

export const registerController= async(req,res)=>{
    try {
       const newUser = new userModel(req.body);
       await newUser.save();
       res.status(201).json({
        success:true,
        newUser
       })
         
    } catch (error) {
        res.status(400).json({
            success:false,
            error
        })
    }
}
