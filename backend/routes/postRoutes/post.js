import express from "express";
import jwtMiddleware from "../../middleware/authMiddleware.js";
const router=express.Router();

router.get("/check",jwtMiddleware,(req,res)=>{
    console.log(req.user);
    res.send("Post route is working");
})


export default router;