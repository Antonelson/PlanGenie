import { useEffect, useState } from "react"
import styles from "./profile.module.css"

export default function Profile(){
    const [profileData, setProfileData] = useState(null);

    useEffect(()=>{
        async function fetchProfileData(){
            const response = await fetch("http://localhost:3000/profile/profileFetch",{
                method:"GET",
                credentials:"include"
            })
            const data = await response.json();
            setProfileData(data);
        }
        fetchProfileData();
    },[])

    if(!profileData) return <div className={styles.profileLoading}>Loading...</div>;

    return (
        <div className={styles.profilePage}>
            <div className={styles.profileHeader}>
                <div className={styles.profileAvatar}>{profileData.mail?.[0]?.toUpperCase()}</div>
                <h2 className={styles.profileEmail}>{profileData.mail}</h2>
            </div>

            <div className={styles.profileStats}>
                <div className={styles.statCard}>
                    <span className={styles.statLabel}>Checklist Records</span>
                    <span className={styles.statValue}>{profileData.ChecklistCount}</span>
                </div>
                <div className={styles.statCard}>
                    <span className={styles.statLabel}>Description Records</span>
                    <span className={styles.statValue}>{profileData.DescriptionCount}</span>
                </div>
            </div>
        </div>
    )
}