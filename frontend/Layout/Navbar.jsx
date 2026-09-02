import { Link,NavLink } from "react-router-dom";
import styles from "./Layout.module.css"
export default function Navbar() {
  return (
   <nav className={styles.navbarPill}>
          <NavLink
            to="/promptpage"
            end
            className={({ isActive }) => `${styles.navLink} ${isActive ? styles.active : ""}`}
          >
            Home
          </NavLink>
          <NavLink
            to="/promptpage/profile"
            className={({ isActive }) => `${styles.navLink} ${isActive ? styles.active : ""}`}
          >
            Profile
          </NavLink>
          <NavLink
            to="/promptpage/checklist"
            className={({ isActive }) => `${styles.navLink} ${isActive ? styles.active : ""}`}
          >
            Checklist
          </NavLink>
          <NavLink
            to="/promptpage/description"
            className={({ isActive }) => `${styles.navLink} ${isActive ? styles.active : ""}`}
          >
            Description
          </NavLink>
        </nav>
  );
}