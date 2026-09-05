import styles from "./DescriptionPanel.module.css";

export default function DescriptionPanel({ heading, description }) {
  return (
    <div className={styles.wrap}>
      <h1 className={styles.heading}>{heading}</h1>
      <p className={styles.description}>{description}</p>
    </div>
  );
}