import { useState } from "react"
import styles from "./PromptPage.module.css"

export default function PromptPage() {
    const [prompt, setPrompt] = useState("");
    const [loading, setLoading] = useState(false);
    const [plan, setPlan] = useState(null);

    async function handleSubmit(e) {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await fetch("http://localhost:3000/post/prompt", {
                method: "POST",
                body: JSON.stringify({ prompt }),
                headers: { "Content-Type": "application/json" },
                credentials: "include"
            })
            const data = await response.text()
            setPlan(data);
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
                        Tell the AI what you want to accomplish. It will break it down into a plan with actionable tasks.
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
                    <button className={styles.submitBtn} type="submit" disabled={loading}>
                        {loading ? "Generating..." : "Generate Plan"}
                    </button>
                </form>
{/* 
                {plan && (
                    <div className={styles.planCard}>
                        <h2 className={styles.planTitle}>{plan.title || "Generated Plan"}</h2>
                        <ul className={styles.taskList}>
                            {(plan.tasks || []).map((task, i) => (
                                <li key={i} className={styles.taskItem}>
                                    <span className={styles.taskIndex}>{i + 1}</span>
                                    <div>
                                        <p className={styles.taskName}>{task.name}</p>
                                        {task.description && (
                                            <p className={styles.taskDesc}>{task.description}</p>
                                        )}
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                )} */}
                <h1>{plan}</h1>
            </div>
        </div>
    )
}