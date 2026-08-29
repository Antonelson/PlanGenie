import { useState } from "react";
import styles from "./PromptPage.module.css";
import Card from "../Components/ChecklistPreviewCard";

export default function PromptPage() {
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [desc, setDesc] = useState(null);
  const [plan, setPlan] = useState([]);
  const [restype, setRestype] = useState("checklist");
 
  async function handleSubmit(e) {
    e.preventDefault();

    setLoading(true);
    try {
      const response = await fetch("http://localhost:3000/post/prompt", {
        method: "POST",
        body: JSON.stringify({ prompt: prompt, restype: restype }),
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });

      if (restype == "checkList") {
        const data = await response.json();
        setDesc([])
        setPlan(data.promptResult);
        // console.log(plan);
      } else {
        const data = await response.json();
        setPlan([]);
        setDesc(data.promptResult);
        console.log(desc);
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.title}>Describe your goal</h1>
          <p className={styles.subtitle}>
            Tell the AI what you want to accomplish. It will break it down into
            a plan with actionable tasks.
          </p>
        </div>

        <form className={styles.form} onSubmit={handleSubmit}>
          <textarea
            className={styles.textarea}
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="e.g. Prepare for a job interview next week"
            rows={4}
          />

          <div className={styles.radioGroup}>
            <label className={styles.radioLabel} htmlFor="checklist">
              <input
                type="radio"
                value="checklist"
                name="responseType"
                id="checklist"
                checked={restype === "checkList"}
                onChange={() => {
                  setRestype("checkList");
                }}
              />
              Checklist
            </label>

            <label className={styles.radioLabel} htmlFor="description">
              <input
                type="radio"
                value="description"
                name="responseType"
                id="description"
                checked={restype === "description"}
                onChange={() => {
                  setRestype("description");
                }}
              />
              Description
            </label>
          </div>

          <button className={styles.submitBtn} type="submit" disabled={loading}>
            {loading ? "Generating..." : "Generate Plan"}
          </button>
        </form>

        {plan.length > 0 &&
          plan.map((value) => {
            return (
              <Card
                key={value.taskNumber}
                id={value.taskNumber}
                task={value.taskName}
                desc={value.description}
              />
            );
          })}

        {(
          <div className={styles.planCard}>
            <h2 className={styles.planTitle}>Generated Description</h2>
            <p className={styles.description}>{desc}</p>
          </div>
        )}
      </div>
    </div>
  );
}