import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import CheckListCardDisplay from "./CheckListCardDisplay";
import styles from "./Checklist.module.css";
import ChecklistPanel from "./ChecklistPanel";
export default function CheckList() {
  const [headings, setHeadings] = useState([]);
  const [selectedChecklist, setSelectedChecklist] = useState(null);
  useEffect(() => {
    async function fetchHeadings() {
      try {
        await getHeading();
      } catch (e) {
        console.log(e);
        toast.error("something went wrong");
      }
    }
    fetchHeadings();
  }, []);

  async function getHeading() {
    const response = await fetch("http://localhost:3000/post/headings", {
      method: "GET",
      credentials: "include",
    });
    if (!response.ok) {
      throw new Error("Went Wrong");
    }
    const data = await response.json();
    setHeadings(data);
  }

  async function getChecklists(id) {
    try {
      const response = await fetch(
        `http://localhost:3000/post/headings/${id}`,
        {
          method: "GET",
          credentials: "include",
        },
      );
      if (!response.ok) {
        throw new Error("Went Wrong");
      }
      const data = await response.json();
      setSelectedChecklist(data.resultArray);
    } catch (e) {
      console.log(e);
      toast.error("something went wrong");
    }
  }

  async function toggleUpdate(id) {
    console.log(id);
    const response = await fetch(
      `http://localhost:3000/post/checkListUpdate/${id}`,
      {
        method: "PATCH",
        credentials: "include",
      },
    );
    const data = await response.json();

    if (!response.ok) {
      toast.error("problem Occured")
      return
    }
    setSelectedChecklist(data.updatedData)
  //   console.log(selectedChecklist);
  //   console.log(selectedChecklist.details[0]._id);
    // setSelectedChecklist((prev)=>({
    //   ...prev,
    //   details:prev.details.map((item)=>(item._id===id?{...item,completion:!item.completion}:item))
    // }))
  }
  const headingCards = headings.map((item) => {
    return (
      <button
        className={styles.cardButton}
        onClick={() => {
          getChecklists(item._id);
        }}
        key={item._id}
      >
        <CheckListCardDisplay id={item._id} heading={item.heading} />
      </button>
    );
  });

  return (
    <div
      className={`${styles.container} ${selectedChecklist ? styles.split : ""}`}
    >
      <div className={styles.headingList}>{headingCards}</div>

      {selectedChecklist && (
        <div className={styles.detailsPanel}>
          <ChecklistPanel
            heading={selectedChecklist.heading}
            items={selectedChecklist.details}
            toggleFunction={toggleUpdate}
          />
        </div>
      )}
    </div>
  );
}
