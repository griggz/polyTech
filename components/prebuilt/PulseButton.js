import React from "react";
import styles from "../../styles/PulseButton.module.scss";
import { Information } from "@styled-icons/ionicons-solid/Information";

function PulseButton({ onClick }) {
  return (
    <div className={styles.container}>
      <div className={styles.bg}></div>
      <div onClick={onClick} className={styles.button}>
        <Information alt="info_" className={styles.icon} />
      </div>
    </div>
  );
}

export default PulseButton;
