import styles from "./bunConstructor.module.css";
import {
  ConstructorElement,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

const Bun = ({bun, type}) => {
  const bunText = type === "top" ? `${bun.name} верх` : `${bun.name} низ`;
  return (
    <div className={styles.bun}>
      <div className={styles.icon_inactive}>
        <DragIcon type="primary" />
      </div>
      <ConstructorElement
        type={type}
        isLocked={true}
        text={bunText}
        price={bun.price}
        thumbnail={bun.image}
      />
    </div>
  );
};

export default Bun;
