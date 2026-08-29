import styles from "./ChecklistPreviewCard.module.css";

export default function CheckListPreviewCard({ id, task, desc }) {
  return (
    <div className={styles.card}>
      <span className={styles.id}>{id}</span>
      <div className={styles.content}>
        <h3 className={styles.task}>{task}</h3>
        {desc && <h4 className={styles.desc}>{desc}</h4>}
      </div>
    </div>
  );
}