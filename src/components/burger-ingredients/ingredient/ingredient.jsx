import styles from "./ingredient.module.css";
import {
  Counter,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useDrag } from "react-dnd";

const Ingredient = (props) => {
  const [{ isDragging }, dragIngredient] = useDrag({
    type: "ingredient",
    item: props,
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  return (
    <>
      <div
        ref={dragIngredient}
        onClick={props.openModal}
        className={`${styles.ingredient}  ${
          isDragging ? styles.drag : ""
        } pb-8`}>
        {props.counter > 0 && (
          <Counter count={props.counter} size="default" extraClass="m-1" />
        )}
        <img src={props.image} alt={props.name} className="pl-4" />
        <div className={`${styles.prices} pt-1 pb-1`}>
          <p className="text text_type_digits-default">{props.price}</p>
          <CurrencyIcon />
        </div>
        <p className={`${styles.name} text text_type_main-default`}>
          {props.name}
        </p>
      </div>
    </>
  );
};

export default Ingredient;
