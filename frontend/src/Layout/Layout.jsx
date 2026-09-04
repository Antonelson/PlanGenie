import { Outlet, NavLink } from "react-router-dom";
import styles from "./Layout.module.css";
import Navbar from "./Navbar";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function Layout() {
    const navigate=useNavigate()
async function logout(){
   try{
    const response=await fetch("http://localhost:3000/auth/logout",{
        method:"POST",
        credentials:"include"
    })
    if(!response.ok)
    {
        toast.error(await response.json())
    }
    
    navigate("/login")
    toast.success(await response.json())
    }
    catch(e)
    {

    }
}

function handleLogout() {
    toast((t) => (
      <div>
        <p>Are you sure you want to logout?</p>

        <button className={styles.getStartedBtn}
          onClick={() => {
            toast.dismiss(t.id);
            logout();
          }}
        >
          Yes
        </button>

        <button className={styles.getStartedBtn} onClick={() => toast.dismiss(t.id)}>Cancel</button>
      </div>
    ));
  }

  return (
    <div className={styles.layout}>
      <header className={styles.navbar}>
        <div className={styles.navbarLogo}>
          <span className={styles.logoIcon}>
            
            <img src="/asset/image/logo.svg" alt="PlanGenie" />
          </span>
          <span className={styles.logoText}>PlanGenie</span>
        </div>
        <Navbar>
          
        </Navbar>

        <button className={styles.getStartedBtn} onClick={handleLogout}>
          Logout
        </button>
      </header>

      <main className={styles.layoutContent}>
        <Outlet />
      </main>
    </div>
  );
}
