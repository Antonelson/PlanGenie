import { useState, useEffect } from "react";
import styles from "./Login.module.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { Eye, EyeOff } from "lucide-react";
export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [eye, setEye] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  const msg = location.state?.success;

  useEffect(() => {
    if (msg) {
      toast.success("Registered successfully. Please log in.");
    }
  }, [msg]);

  async function handleSubmit(e) {
    e.preventDefault();

    const response = await fetch("http://localhost:3000/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ gmail: email, password: password }),
    });
    const data = await response.json();
    if (!response.ok) {
      toast.error(data.message);
      return;
    }
    toast.success(data.message);
    navigate("/promptpage");
  }

  return (
    <>
      <div className={styles.page}>
        <div className={styles.brandPanel}>
          <div className={styles.dotPattern} />
          <div className={styles.brandContent}>
            <span className={styles.logo}>PlanGenie</span>
            <h1 className={styles.brandHeading}>
              Turn intentions into
              <br />
              finished tasks.
            </h1>
            <p className={styles.brandSub}>
              Describe a goal. Get a plan you can actually work through.
            </p>
          </div>
        </div>

        <div className={styles.formPanel}>
          <div className={styles.formCard}>
            <h2 className={styles.title}>Welcome back</h2>
            <p className={styles.subtitle}>
              Log in to pick up where you left off.
            </p>

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
                <div className={styles.passwordWrapper}>
                  <input
                    className={styles.input}
                    type={eye ? "password" : "text"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <button onClick={() => setEye((prev) => !prev)}  className={styles.eyeBtn}>
                     {eye ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              <button type="submit" className={styles.submitBtn}>
                Log in
              </button>
            </form>

            <p className={styles.switchText}>
              Don't have an account?{" "}
              <Link to="/register" className={styles.switchText}>
                Register
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
