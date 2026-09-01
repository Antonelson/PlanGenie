import mongoose from "mongoose";

const schema=mongoose.Schema({
    heading:{type:String,required:true},
    details:[{
        taskNo:{type:Number},
        title:{type:String},
        description:{type:String},
        completion:{type:Boolean,default:false}
    }]
})

export const Details=mongoose.model("Details",schema);