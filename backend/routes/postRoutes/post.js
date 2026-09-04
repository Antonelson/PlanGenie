import express from "express";
import jwtMiddleware from "../../middleware/authMiddleware.js";
import "dotenv/config";
import callGemini from "../../helper_methods/callGemini.js";
import { Details } from "../../Schema/checkListSchema.js";
import { Description } from "../../Schema/Description.js";
const router = express.Router();

router.get("/check", jwtMiddleware, (req, res) => {
  // console.log(req.user);
  res.send("Post route is working");
});

router.post("/prompt", jwtMiddleware, async (req, res) => {
  // console.log(req.body);
  const data = await callGemini(req.body);
  //     const data=[
  //   {
  //     taskNumber: 1,
  //     taskName: 'Learn Python',
  //     description: 'Ideal for beginners, widely used in data science, artificial intelligence, machine learning, and web development.'
  //   },
  //   {
  //     taskNumber: 2,
  //     taskName: 'Learn JavaScript',
  //     description: 'Essential language for web development, enabling interactive web pages and backend APIs via Node.js.'
  //   },
  //   {
  //     taskNumber: 3,
  //     taskName: 'Learn TypeScript',
  //     description: 'A typed superset of JavaScript that adds static types to build large-scale applications with fewer bugs.'
  //   },
  //   {
  //     taskNumber: 4,
  //     taskName: 'Learn Java',
  //     description: 'A versatile, object-oriented language commonly used for enterprise backend systems and Android mobile apps.'
  //   },
  //   {
  //     taskNumber: 5,
  //     taskName: 'Learn C#',
  //     description: 'Developed by Microsoft, popular for desktop applications, enterprise solutions, and game development using Unity.'
  //   },
  //   {
  //     taskNumber: 6,
  //     taskName: 'Learn C++',
  //     description: 'Offers high control over system resources, perfect for game engine development, performance-critical software, and systems programming.'
  //   },
  //   {
  //     taskNumber: 7,
  //     taskName: 'Learn Go (Golang)',
  //     description: 'Created by Google, optimized for high concurrency, cloud infrastructure, and microservices.'
  //   },
  //   {
  //     taskNumber: 8,
  //     taskName: 'Learn Rust',
  //     description: 'Focuses on memory safety and concurrency without a garbage collector, highly praised for systems development.'
  //   },
  //   {
  //     taskNumber: 9,
  //     taskName: 'Learn Swift',
  //     description: "Apple's modern programming language designed specifically for building iOS, macOS, watchOS, and tvOS apps."
  //   },
  //   {
  //     taskNumber: 10,
  //     taskName: 'Learn SQL',
  //     description: 'The standard database language critical for storing, querying, and managing structured data in relational databases.'
  //   }
  // ]
  // const data="exercises that recruit multiple muscle groups:\n    *   Squats\n    *   Deadlifts\n    *   Bench presses\n    *   Overhead presses\n    *   Barbell rows\n    *   Pull-ups\n*   **Train with Intensity:** Don't just go through the motions. Take your working sets close to failure (leaving 1–2 reps in the tank).\n*   **Don't Overdo Cardio:** You still need cardiovascular health, but excessive cardio burns the calories you need for growth. Limit cardio to 2–3 light sessions a week (e.g., 20 minutes of incline walking) unless you are trying to keep fat gain to an absolute minimum.\n\n---\n\n### 3. Recovery (The Growth Phase)\n*   **Sleep 7–9 Hours:** Muscles don't grow while you are lifting weights; they grow while you are resting, primarily during deep sleep. This is when growth hormone is released.\n*   **Stay Hydrated:** Water is essential for cellular function and nutrient transport. Being dehydrated can negatively impact your strength and performance in the gym.\n*   **Take Rest Days:** Overtraining leads to fatigue and injury. Listen to your body and take 1–2 rest days per week.\n\n---\n\n### 4. Tracking and Consistency\n*   **Weigh Yourself Consistently:** Weigh yourself every morning after using the bathroom and before eating. Because weight fluctuates daily due to water retention and food, look at the **weekly average** rather than day-to-day changes.\n*   **Adjust as Needed:** \n    *   If your weight stays the same for two weeks, add another 200–300 calories.\n    *   If you are gaining more than 2 pounds a week, you are likely gaining too much fat—dial back the ";
  // console.log(data);
  res.json({ promptResult: data });
});

router.post("/checklistSave", jwtMiddleware, async (req, res) => {
  const {
    body: { heading, plan },
  } = req;
  // console.log("incomming")
  // console.log(plan)
  const detail = new Details({
    user: req.user.id,
    heading: heading,
    details: plan.map((items) => {
      return {
        taskNo: items.taskNo,
        title: items.taskName,
        description: items.description,
      };
    }),
  });
  const result = await detail.save();
  // console.log("result")
  // console.log(result)
  res.send(result);
});

router.post("/descriptionsave", jwtMiddleware, async (req, res) => {
  // console.log(req.body);
  let {
    body: { heading, description },
  } = req;

  const descriptionObj = new Description({
    user: req.user.id,
    heading: heading,
    description: description,
  });
  const result = await descriptionObj.save();
  res.send(result);
});

router.get("/headings", jwtMiddleware, async (req, res) => {
  console.log(req.user.id);
  const result = await Details.find(
    { user: req.user.id },
    { heading: 1, "details.title": 1 },
  );
  console.log(result);
  res.json(result);
});

router.get("/headings/:id", jwtMiddleware, async (req, res) => {
  const headID = req.params.id;
  // console.log(headID)
  const result = await Details.findOne({ user: req.user.id, _id: headID });
  console.log(result);
  res.json({ resultArray: result });
});
router.patch("/checkListUpdate/:id", jwtMiddleware, async (req, res) => {
  try {
    const taskID = req.params.id;
    const find = await Details.findOne(
      { user: req.user.id, "details._id": taskID },
      {
        "details.$": 1,
      },
    );
    const boolValue = !find.details[0].completion;
    // console.log(boolValue)
    const result = await Details.updateOne(
      { user: req.user.id, "details._id": taskID },
      { $set: { "details.$.completion": boolValue } },
    );
    const updatedData = await Details.findOne({
      user: req.user.id,
      "details._id": taskID,
    });
    res.status(200).json({ updatedData: updatedData });
  } catch (e) {
    res.status(500).json({ message: "ERROR" });
  }
});
export default router;
