import { useState } from "react";
import styles from "./PromptPage.module.css";
import Card from "../Components/ChecklistPreviewCard";
import toast from "react-hot-toast"
export default function PromptPage() {
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [desc, setDesc] = useState(null);
  const [plan, setPlan] = useState([]);
  const [restype, setRestype] = useState("checklist");
  const [heading, setHeading] = useState("");
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
      const data = await response.json();
      console.log(data)
      if(!response.ok)
      {
        toast.error(data.message)
        return;
      }
      if (restype == "checkList") {
        const wholeData = wholeData.promptResult;
        setDesc(null);
        setPlan(wholeData.checklist);
        setHeading(wholeData.heading);
        // console.log(data.checklist)
        // console.log(data.heading)
      } else {
        const wholeData = data.promptResult;
        setPlan([]);
        setHeading(wholeData.heading);
        setDesc(wholeData.description);
        // console.log(desc);
      }
    } finally {
      setLoading(false);
    }
  }
  async function savedDescription() {
    const response=await fetch("http://localhost:3000/post/descriptionsave",{
      method:"POST",
      credentials:"include",
      body:JSON.stringify({heading,description:desc}),
      headers:{"Content-Type":"application/json"},
      
    })
    toast.success("Saved as Description");
    clear("desc")
  }
  async function saveCheckList(){
    const response=await fetch("http://localhost:3000/post/checklistsave",{
      method:"POST",
      credentials:"include",
      body:JSON.stringify({heading,plan}),
      headers:{"Content-Type":"application/json"}
    });
    // console.log(await response.text())
    toast.success("Converted as checklist");
    clear("plan")
  }
    function clear(stateVar)
    {
      setHeading(null);
      stateVar==="plan"?setPlan([]):setDesc(null);
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

        {heading &&
        <div className={styles.planCard}>
          <h2 className={styles.planTitle}>{heading}</h2>
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
        {plan.length > 0 && (
          <>
            <button className={`${styles.submitBtn} ${styles.last}`} onClick={saveCheckList}>
              Convert To CheckList
            </button>
            <button className={styles.submitBtn} onClick={()=>{clear("plan");toast.success("Discarded")}}>Discard</button>
          </>
        )}
        {desc && (
          <>
           <p className={styles.description}>{desc}</p>
            <button className={`${styles.submitBtn} ${styles.last}`} onClick={savedDescription}>
              Save
            </button>
            <button className={styles.submitBtn} onClick={()=>{clear("desc");toast.success("Discarded")}}>Discard</button>
          </>
        )}
      </div>}
    </div>
    </div>
  );
  
}
