
export default async function callGemini(promptDetails) {
  const API_KEY = process.env.GEMINI_API_KEY;
  // const MODEL = "gemini-3.6-flash";
  const MODEL = "gemini-3.5-flash-lite";
  const { prompt, restype } = promptDetails;
  // console.log(prompt +"ff"+restype);
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent`;

  const requestBody = {
    contents: [
      {
        role: "user",
        parts: [{ text: prompt }],
      },
    ],
  };
  if (restype === "checkList") {
    requestBody.generationConfig = {
      responseMimeType: "application/json",
      responseSchema: {
        type: "OBJECT",
        description:
          "A list of checklist items based on the prompt.along with a heading",
        properties: {
          heading: {
            type: "STRING",
            description: "A short heading summarizing the prompt.",
          },
          checklist: {
            type: "ARRAY",
            description: "A list of checklist items based on the prompt.",
            items: {
              type: "OBJECT",
              properties: {
                taskNumber: {
                  type: "INTEGER",
                  description: "The sequence number of the task.",
                },
                taskName: {
                  type: "STRING",
                  description: "The short title of the task.",
                },
                description: {
                  type: "STRING",
                  description: "A brief detail or instruction for this task.",
                },
              },
              required: ["taskNumber", "taskName", "description"],
            },
          },
        },
        required: ["heading", "checklist"],
      },
    };
  } else {
    // plain description response
    requestBody.generationConfig = {
      responseMimeType: "application/json",
      responseSchema: {
        type: "OBJECT",
        description:
          "description way of result based on the prompt along with heading.",
        properties: {
          heading: {
            type: "STRING",
            description: "A short heading summarizing the prompt",
          },
          description: {
            type: "STRING",
            description:
              "Provide a detailed, thorough, and well-explained response. Explain the topic step by step with sufficient detail, including important instructions, tips, examples, common mistakes, and other relevant information. Do not give an overly short or superficial answer.",
          },
        },
        required: ["heading", "description"],
      },
    };
  }
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-goog-api-key": API_KEY,
      },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      const errorBody = await response.text();
      throw new Error(`Gemini API error ${response.status}: ${errorBody}`);
    }

    const data = await response.json();
    const reply = data?.candidates?.[0]?.content?.parts?.[0]?.text;

    return JSON.parse(reply) ?? "No response generated.";
  } catch (err) {
    console.error("Gemini call failed:", err);
    return null;
  }
}