import express from "express";
import authRoutes from "./routes/authRoutes/auth.js";
import "dotenv/config";
import mongoose from "mongoose";
import postRoute from "./routes/postRoutes/post.js";
import cors from "cors";

const port = process.env.PORT;
const connectionString=process.env.connectionString;

const app=express();
app.use(cors({
    origin:"http://localhost:5173"
}))
app.use(express.json());
app.use("/auth", authRoutes);
app.use("/post", postRoute);


async function connectDB()
{
    await mongoose.connect(connectionString);
    console.log("DB connected")
}

app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
    connectDB();
})