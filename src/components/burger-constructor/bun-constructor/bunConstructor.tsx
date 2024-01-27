import styles from "./bunConstructor.module.css";
import {
  ConstructorElement,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { TIngredient } from "../../../types/types";

type TBun = {
  bun: TIngredient;
  type?: "top" | "bottom";
};

const Bun = ({ bun, type }: TBun) => {
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
