import React from "react";
import styles from "./modal-overlay.module.css";

const ModalOverlay = (props) => {
  return <div className={styles.overlay} onClick={props.onClose}></div>;
};

export default ModalOverlay;
