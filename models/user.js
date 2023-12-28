import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,'name is required'],
    },
    email:{
        type:String,
        required:[true,'email id is required and should be unique'],
        unique:true,
    },
    password:{
        type:String,
        required:[true,'password is required']
    }

},{timestamps:true})


const userModel = mongoose.model('users',userSchema);
export default userModel;