import React from "react";
import PropTypes from "prop-types";
import ReactDOM from "react-dom";
import styles from "./modal.module.css";
import ModalOverlay from "./modal-overlay/modal-overlay";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";

const Modal = (props) => {
  React.useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") {
        props.onClose();
      }
    };

    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, []);

  return ReactDOM.createPortal(
    <div
      className={`${styles.modal} ${
        props.isActive ? styles.modal_active : ""
      }`}>
      <ModalOverlay onClose={props.onClose} />
      <div className={styles.wrapper}>
        <div className={`${styles.head} pt-10`}>
          <h2 className="text text_type_main-large pl-10">{props.title}</h2>
          <div className={`${styles.icon} pr-10`} onClick={props.onClose}>
            <CloseIcon type="primary" />
          </div>
        </div>
        {props.children}
      </div>
    </div>,
    document.getElementById("modals")
  );
};

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  isActive: PropTypes.bool.isRequired,
  title: PropTypes.string,
  children: PropTypes.node,
};

export default Modal;
