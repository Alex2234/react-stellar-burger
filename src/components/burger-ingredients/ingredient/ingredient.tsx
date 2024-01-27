import styles from "./ingredient.module.css";
import {
  Counter,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useDrag } from "react-dnd";
import { TIngredient } from "../../../types/types";

type TIngredientProps = {
  counter?: number | null;
} & TIngredient;

const Ingredient = (props: TIngredientProps) => {
  const [{ isDragging }, dragIngredient] = useDrag({
    type: "ingredient",
    item: props,
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  const counter = props.counter || 0;

  return (
    <>
      <div
        ref={dragIngredient}
        className={`${styles.ingredient}  ${
          isDragging ? styles.drag : ""
        } pb-8`}>
        {counter > 0 ? (
          <Counter count={counter} size="default" extraClass="m-1" />
        ) : null}
        <img src={props.image} alt={props.name} className="pl-4" />
        <div className={`${styles.prices} pt-1 pb-1`}>
          <p className="text text_type_digits-default">{props.price}</p>
          <CurrencyIcon type="primary" />
        </div>
        <p className={`${styles.name} text text_type_main-default`}>
          {props.name}
        </p>
      </div>
    </>
  );
};

export default Ingredient;
