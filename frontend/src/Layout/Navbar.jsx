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
            to="/checklist"
            className={({ isActive }) => `${styles.navLink} ${isActive ? styles.active : ""}`}
          >
            Checklist
          </NavLink>
          <NavLink
            to="/description"
            className={({ isActive }) => `${styles.navLink} ${isActive ? styles.active : ""}`}
          >
            Description
          </NavLink>
           <NavLink
            to="/profile"
            className={({ isActive }) => `${styles.navLink} ${isActive ? styles.active : ""}`}
          >
            Profile
          </NavLink>
        </nav>
  );
}