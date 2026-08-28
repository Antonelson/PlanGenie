import express from "express";
import { hashConvert, hashCompare } from "../../helper_methods/bcryptMethods.js";
import User from "../../Schema/authSchema.js";
import user_val from "../../validation/authValidate.js";
import { matchedData, validationResult } from "express-validator";
import jwt from "jsonwebtoken";
import "dotenv/config";
import cookie from "cookie-parser";

const router = express.Router();


router.use(express.json());

router.get("/check", (req, res) => {
  res.send("Auth route is working");
});

router.post("/register", user_val, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({mesasage:errors.array()[0].msg});
  try {
    const data = matchedData(req);
    const user = new User({
      gmail: data.gmail,
      password: hashConvert(data.password),
    });
    const result = await user.save();
  } catch (err) {
    return res.status(500).json({message:err.message});
  }

  res.status(201).json({status:"success"});
});

router.post("/login", user_val, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({message:errors.array()[0].msg});
  try {
    const data = matchedData(req);
    const user = await User.findOne({ gmail: data.gmail });
    if (!user) return res.status(400).json({message:"User Not Fund"});
    if (!hashCompare(user.password, data.password))
      return res.status(400).json({message:"Invalid Password"});
    
    const token = jwt.sign({ gmail: user.gmail }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    
    res.cookie("jwt",token,{signed:true,httpOnly:true});
    res.status(200).json({message:"login Succesful" });
  } catch (err) {
    return res.status(500).send(err.message);
  }
});

export default router;
