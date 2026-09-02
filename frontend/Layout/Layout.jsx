import { Outlet, NavLink } from "react-router-dom";
import styles from "./Layout.module.css";
import Navbar from "./Navbar"
export default function Layout() {
  return (
   <div className={styles.layout}>
      <header className={styles.navbar}>
        <div className={styles.navbarLogo}>
          <span className={styles.logoIcon}> <img src="/asset/image/logo.svg" alt="PlanGenie" /></span>
          <span className={styles.logoText}>PlanGenie</span>
        </div>
        <Navbar></Navbar>
       

        <button className={styles.getStartedBtn}>Logout</button>
      </header>

      <main className={styles.layoutContent}>
        <Outlet />
      </main>
    </div>
  );
}