import mongoose from "mongoose";

const schema=mongoose.Schema(
    {
        gmail:{
            required:[true,"Must Enter Gmail"],
            unique:true ,
            type:String
        },
        password:{
            required:[true,"Must Enter Gmail"],
            type:String,
        }
    }
)

const User=mongoose.model("User",schema)
export default User;