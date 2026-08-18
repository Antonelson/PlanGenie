import express from "express";
import { hashConvert } from "../helper_methods/bcryptMethods.js";
import User from "../Schema/authSchema.js";
import user_val from "../validation/authValidate.js";
import { matchedData, validationResult } from "express-validator";
const router = express.Router();

router.use(express.json());
router.get("/check", (req, res) => {
  res.send("Auth route is working");
});

router.post("/register", user_val, async (req, res) => {
 const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).send(errors.array()[0].msg);
  try {
    const data = matchedData(req);
    const user = new User({
      gmail: data.gmail,
      password: hashConvert(data.password),
    });
    const result = await user.save();
    console.log(result);
  } catch (err) {
    return res.status(500).send(err.message);
  }
  res.status(201).send("done");
});



export default router;
