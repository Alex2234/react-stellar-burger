import styles from "./ingredientInfo.module.css";
import {
    CurrencyIcon
  } from "@ya.praktikum/react-developer-burger-ui-components";

const IngredientInfo = ({ img, name, price, count }) => {
    return (
      <div className={styles.ingredientWrapper}>
        <div className={`${styles.circle} mr-4`}>
          <img className={styles.logo} src={img} alt={name} />
        </div>
        <p
          className={`${styles.nameIngredient} text text_type_main-default mr-4`}>
          {name}
        </p>
        <div className={`${styles.price} mr-6`}>
          <p className="text text_type_main-default">{count}</p>
          <p className="text text_type_main-default">X</p>
          <p className="text text_type_digits-default">{price}</p>
          <CurrencyIcon type="Primary" />
        </div>
      </div>
    );
  };

  export default IngredientInfo;