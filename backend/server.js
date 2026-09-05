import express from "express";
import authRoutes from "./routes/authRoutes/auth.js";
import postRoute from "./routes/postRoutes/post.js";
import profileRoute from "./routes/profileRoutes/profile.js"
import "dotenv/config";
import mongoose from "mongoose";

import cors from "cors";
import cookieParser from "cookie-parser";

const port = process.env.PORT;
const connectionString=process.env.connectionString;

const app=express();
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}))
app.use(express.json());

app.use(cookieParser(process.env.COOKIE_SECRET))
app.use("/auth", authRoutes);
app.use("/post", postRoute);
app.use("/profile",profileRoute)


async function connectDB()
{
    await mongoose.connect(connectionString);
    console.log("DB connected")
}

app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
    connectDB();
})