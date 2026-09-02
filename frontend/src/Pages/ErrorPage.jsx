import { Link } from "react-router-dom";
import styles from "./ErrorPage.module.css";

export default function ErrorPage() {
  return (
    <div className={styles.errorPage}>
      <h1 className={styles.code}>404</h1>
      <p className={styles.message}>This page doesn't exist.</p>
      <Link to="/promptpage" className={styles.homeLink}>
        Back to Home
      </Link>
    </div>
  );
}