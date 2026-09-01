import mongoose from "mongoose";

const schema=mongoose.Schema({
    heading:{
        type:String
    },
    description:{
        type:String
    }
})

export const Description =mongoose.model("Description",schema);