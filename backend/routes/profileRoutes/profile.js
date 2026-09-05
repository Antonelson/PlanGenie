import express from "express";
import jwtMiddleware from "../../middleware/authMiddleware.js"
import { Details } from "../../Schema/checkListSchema.js";
import User from "../../Schema/authSchema.js";
import { Description } from "../../Schema/Description.js";

const router =express.Router();

router.get("/profileFetch", jwtMiddleware, async (req, res) => {
  const userId = req.user.id;
  const ckresult = await Details.find({ user: userId });
  const resultUser = await User.findOne({ _id: userId });
  const dresult=await Description.find({user:userId});
  console.log(dresult.length)
  res.json({ ChecklistCount: ckresult.length, mail: resultUser.gmail,  DescriptionCount:dresult.length});
});

export default router;