import { useNavigate } from "react-router-dom";
import styles from "./Home.module.css";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className={styles.page}>
      <div className={styles.imagePanel}>
        <video autoPlay muted loop playsInline className={styles.heroVdo}>
          <source src="/asset/video/Home_Video.mp4" type="video/mp4" />
        </video>
      </div>

      <div className={styles.actionPanel}>
        <div className={styles.card}>
          <h1 className={styles.title}>Plan Genie Here</h1>
          <p className={styles.subtitle}>Simply tell Genie what you want to accomplish. Our AI turns your goal into an organized, actionable plan that you can manage, complete, and track—all in one place.</p>
          <div className={styles.actions}>
            <button
              className={styles.primaryBtn}
              onClick={() => navigate("/login")}
            >
              Login
            </button>
            <button
              className={styles.secondaryBtn}
              onClick={() => navigate("/register")}
            >
              Register
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
