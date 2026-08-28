import { useNavigate } from 'react-router-dom'
import styles from './Home.module.css'

export default function Home() {
  const navigate = useNavigate()

  return (
    <div className={styles.page}>
      <div className={styles.imagePanel}>
        {/* image goes here */}
      </div>

      <div className={styles.actionPanel}>
        <div className={styles.card}>
          <h1 className={styles.title}>Welcome</h1>
          <p className={styles.subtitle}>Choose an option to continue</p>
          <div className={styles.actions}>
            <button className={styles.primaryBtn} onClick={() => navigate("/login")}>
              Login
            </button>
            <button className={styles.secondaryBtn} onClick={() => navigate("/register")}>
              Register
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}