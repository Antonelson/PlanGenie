import { useState, useEffect } from "react";
import styles from "./ChecklistPanel.module.css";

export default function ChecklistPanel({ heading, items = [] ,toggleFunction}) {
  

  return(

  <div className={styles.wrap}>
      <h1 className={styles.heading}>{heading}</h1>

      <div className={styles.list}>
        {items.map((item ,index) => {
          const isChecked = item.completion;
          return (
            <div
              key={item._id}
              className={`${styles.row} ${isChecked ? styles.isChecked : ""}`}
              onClick={() => toggleFunction(item._id)}
              role="checkbox"
              aria-checked={isChecked}
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  toggleFunction(item._id);
                }
              }}
            >
              <span className={styles.index}>{String( index+ 1).padStart(2, "0")}</span>
              <div className={styles.body}>
                <p className={styles.title}>{item.title}</p>
                <p className={styles.note}>{item.description}</p>
              </div>
              <span className={styles.toggle}>
                <svg className={styles.checkMark} viewBox="0 0 12 12" fill="none">
                  <path d="M2 6L5 9L10 3" stroke="#0f1115" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}