import React from "react";
import IngredientType from "../../utils/prop-types";
import PropTypes from "prop-types";
import styles from "./ingredient-detail.module.css";

const IngredientDetails = ({ ingredient }) => {
  if (!ingredient) return null;

  return (
    <>
      <div className={styles.wrapper}>
        <img src={ingredient.image_large} alt={ingredient.name} />
        <h2 className="text text_type_main-medium pt-4">{ingredient.name}</h2>
        <div className={`${styles.consists} pt-8 pb-15`}>
          <div className={styles.consist}>
            <p
              className={`${styles.name_consists} text text_type_main-default`}>
              Калории, ккал
            </p>
            <p className={`${styles.value} text text_type_digits-default`}>
              {ingredient.calories}
            </p>
          </div>
          <div className={styles.consist}>
            <p
              className={`${styles.name_consists} text text_type_main-default`}>
              Белки, г
            </p>
            <p className={`${styles.value} text text_type_digits-default`}>
              {ingredient.proteins}
            </p>
          </div>
          <div className={styles.consist}>
            <p
              className={`${styles.name_consists} text text_type_main-default`}>
              Жиры, г
            </p>
            <p className={`${styles.value} text text_type_digits-default`}>
              {ingredient.fat}
            </p>
          </div>
          <div className={styles.consist}>
            <p
              className={`${styles.name_consists} text text_type_main-default`}>
              Углеводы, г
            </p>
            <p className={`${styles.value} text text_type_digits-default`}>
              {ingredient.carbohydrates}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

// IngredientDetails.propTypes = {
//   ingredient: PropTypes.arrayOf(IngredientType).isRequired,
// };

export default IngredientDetails;
