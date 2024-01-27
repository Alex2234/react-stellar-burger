import { useEffect } from "react";
import styles from "./ingredient-detail.module.css";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getIngredients } from "../../services/actions/ingredients";
import { TIngredient } from "../../types/types";
import { useTypedSelector } from "../../hooks/useTypedSelector";

type TIngredientDetails = {
  title: string;
};

const IngredientDetails = ({ title }: TIngredientDetails) => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const ingredient = useTypedSelector((state) =>
    state.ingredients.ingredients.find(
      (ingredient: TIngredient) => ingredient._id === id
    )
  );

  useEffect(() => {
    if (!ingredient) {
      dispatch(getIngredients());
    }
  }, []);

  if (!ingredient) {
    return (
      <div className={styles.preloader}>
        <p className="text text_type_main-large">Загрузка...</p>
      </div>
    );
  }

  return (
    <>
      <div className={styles.wrapper}>
        <h2 className="text text_type_main-large pl-10">{title}</h2>
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

export default IngredientDetails;
