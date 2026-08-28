import { useState } from "react";
import styles from "./Login.module.css";
import { useNavigate,Link } from "react-router-dom";
import {toast} from "react-hot-toast"  


export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate=useNavigate();
  async function handleSubmit(e) {
    e.preventDefault();
    const response = await fetch("http://localhost:3000/auth/register", {
      method: "POST",
      body: JSON.stringify({ gmail: email, password: password }),
      headers: { "Content-Type": "application/json" },
    });
    const data=await response.json();
    if(!response.ok)
    {
      toast.error(data.message);
      return;
    }
    navigate("/login",{
        state:{
         success:true
        }
      });
    
  }

  return (
    <div className={styles.page}>
      <div className={styles.brandPanel}>
        <div className={styles.dotPattern} />
        <div className={styles.brandContent}>
          <span className={styles.logo}>Plan Genie</span>
          <h1 className={styles.brandHeading}>Every goal starts<br />as a plan.</h1>
          <p className={styles.brandSub}>Create an account and let AI break your next goal into steps.</p>
        </div>
      </div>

      <div className={styles.formPanel}>
        <div className={styles.formCard}>
          <h2 className={styles.title}>Create your account</h2>
          <p className={styles.subtitle}>Start planning in less than a minute.</p>

          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.field}>
              <label className={styles.label}>Email</label>
              <input
                className={styles.input}
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className={styles.field}>
              <label className={styles.label}>Password</label>
              <input
                className={styles.input}
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button type="submit" className={styles.submitBtn}>Register</button>
          </form>

          <p className={styles.switchText}>
            Already have an account? <Link to="/login" className={styles.switchText}>Log in</Link>
          </p>
        </div>
      </div>
    </div>
  );
}