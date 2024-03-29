import styles from "./Order.module.css";
import { useMemo } from "react";
import {
    FormattedDate,
    CurrencyIcon,
  } from "@ya.praktikum/react-developer-burger-ui-components";
  import CircleIcons from "../circleIcons/circleIcons";
  import { createSelector } from "reselect";
  import { useSelector } from "react-redux";

const Order = ({ order }) => {
    const getIngredientsState = (state) => state.ingredients.ingredients;
    const selectIngredients = createSelector(
      getIngredientsState,
      (ingredients) => ingredients
    );
  
    const ingredients = useSelector(selectIngredients);
  
    const findIngredients = order.ingredients.map((ingredientId) =>
      ingredients.find((ingredient) => ingredient._id === ingredientId)
    );
  
    const iconFind = useMemo(() => {
      const allIcon = findIngredients
        .map((ingredient) => {
          return ingredient ? ingredient.image : null;
        })
        .filter(Boolean);
  
      const uniqueIcon = [...new Set(allIcon)];
  
      return uniqueIcon;
    }, [findIngredients]);
  
    const sumOrder = useMemo(() => {
      let total = 0;
      findIngredients.forEach((ingredient) => {
        if (ingredient) {
          total += ingredient.price;
        }
      });
      return total;
    }, [findIngredients]);
  
    return (
      <div className={`${styles.order} mb-4 mr-2`}>
        <div className={`${styles.head} pb-6`}>
          <p className="text text_type_digits-default">#{order.number}</p>
          <p className="text text_type_main-default text_color_inactive">
            <FormattedDate date={new Date(order.createdAt)} /> i-GMT +3
          </p>
        </div>
        <h2 className="text text_type_main-medium pb-6">{order.name}</h2>
        <div className={styles.details}>
          <CircleIcons icons={iconFind} />
          <div className={styles.prices}>
            <p className="text text_type_digits-default">{sumOrder}</p>
            <CurrencyIcon type="primary" />
          </div>
        </div>
      </div>
    );
  };


  export default Order;