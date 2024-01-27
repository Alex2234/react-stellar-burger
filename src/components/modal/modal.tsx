import {useEffect, ReactNode} from "react";
import ReactDOM from "react-dom";
import styles from "./modal.module.css";
import ModalOverlay from "./modal-overlay/modal-overlay";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";

type TModal = {
  onClose: () => void;
  children: ReactNode;
}

const Modal = ({onClose, children}: TModal) => {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, []);

  return ReactDOM.createPortal(
    <div className={styles.modal}>
      <ModalOverlay onClose={onClose} />
      <div className={styles.wrapper}>
        <div className={`${styles.head} pt-10`}>
          <div className={`${styles.icon} pr-10`} onClick={onClose}>
            <CloseIcon type="primary" />
          </div>
        </div>
        {children}
      </div>
    </div>,
    document.getElementById("modals")!
  );
};

export default Modal;
