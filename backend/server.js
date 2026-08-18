import express from "express";
import authRoutes from "./routes/auth.js";
import "dotenv/config";
import mongoose from "mongoose";


const port = process.env.PORT;
const connectionString=process.env.connectionString;
const app=express();
async function connectDB()
{
    await mongoose.connect(connectionString);
    console.log("DB connected")
}
app.use(express.json());
app.use("/auth", authRoutes);


app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
    connectDB();
})