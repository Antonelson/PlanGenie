import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import HeadingCardDisplay from "../../Components/HeadingCardDisplay";
import styles from "./DescriptionPage.module.css";
import DescriptionPanel from "./DescriptionPanel";

export default function DescriptionPage() {
  const [descData, setdescData] = useState([]);
  const [descriptionData, setDescriptionData] = useState(null);
  useEffect(() => {
    fetchData();
  }, []);
  async function fetchData() {
      const response = await fetch("http://localhost:3000/post/descHeading", {
        method: "GET",
        credentials: "include",
      });
      if (!response.ok) {
        toast.error("Went wrong");
        return;
      }
      const data = await response.json();
      setdescData(data.resultArray);
    }
  async function fetchWholeDescription(id) {
    const response = await fetch(
      `http://localhost:3000/post/descHeading/${id}`,
      {
        method: "GET",
        credentials: "include",
      },
    );
    const data = await response.json();
    console.log(data);
    setDescriptionData(data.descData);
  }
  async function deleteList() {
    // console.log("DFdf")
    console.log(descriptionData._id);
    try{
        const response=await fetch(`http://localhost:3000/post/DescriptionDelete/${descriptionData._id}`,{
          method:"Delete",
          credentials:"include"
        })
        if(!response.ok)
        {
            toast.error("Cant delete");
        }
        const data=await response.json();
        fetchData();
        setDescriptionData(null)
    }
    catch(e){
        toast.error("Cant delete");
    }
  }

  const headingCards = descData.map((item) => (
    <button
      key={item._id}
      onClick={() => {
        fetchWholeDescription(item._id);
      }}
      className={styles.cardButton}
    >
      <HeadingCardDisplay id={item._id} heading={item.heading} />
    </button>
  ));
  return (
    <>
      <div
        className={`${styles.container} ${descriptionData ? styles.split : ""}`}
      >
        <div className={styles.headingList}>{headingCards}</div>

        {descriptionData && (
          <div className={styles.detailsPanel}>
            <DescriptionPanel
              heading={descriptionData.heading}
              description={descriptionData.description}
            />
            <button
              className={styles.submitBtn}
              onClick={() => {
                setDescriptionData(null);
              }}
            >
              Close
            </button>
            <button
              className={`${styles.submitBtn} ${styles.delete} `}
              onClick={deleteList}
            >
              Delete
            </button>
          </div>
        )}
      </div>
    </>
  );
}
