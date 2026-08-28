import express from "express";
import jwtMiddleware from "../../middleware/authMiddleware.js";
import "dotenv/config";
const router=express.Router();

router.get("/check",jwtMiddleware,(req,res)=>{
    console.log(req.user);
    res.send("Post route is working");
})
router.post("/prompt",async (req,res)=>{
    console.log(req.body)
    const data=await callGemini(req.body.prompt)
    console.log(data);
    res.json({msg:data})
})

async function callGemini(userPrompt) {
  const API_KEY = process.env.GEMINI_API_KEY; // careful: never commit this to a public repo
  const MODEL = "gemini-3.6-flash"; // free tier model, good for learning

   const url = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent`;

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-goog-api-key": API_KEY
      },
      body: JSON.stringify({
        contents: [
          {
            role: "user",
            parts: [{ text: userPrompt }]
          }
        ]
      })
    });

    if (!response.ok) {
      const errorBody = await response.text();
      throw new Error(`Gemini API error ${response.status}: ${errorBody}`);
    }

    const data = await response.json();
    const reply = data?.candidates?.[0]?.content?.parts?.[0]?.text;

    return reply ?? "No response generated.";
  } catch (err) {
    console.error("Gemini call failed:", err);
    return null;
  }
}

export default router;