import styles from "./order-info.module.css";
import { useEffect, useMemo } from "react";
import IngredientInfo from "../ingredientInfo/ingredientInfo";
import {
  CurrencyIcon,
  FormattedDate,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useParams } from "react-router-dom";
import { getHttpsOrder } from "../../services/actions/feed";
import { TOrder, TIngredient } from "../../types/types";
import { useAppSelector } from "../../hooks/useAppSelector";
import { useAppDispatch } from "../../hooks/useAppDispatch";

const OrderInfo = () => {
  const { number } = useParams<{ number: string }>();
  const orderNumber = number ? parseInt(number, 10) : 0;
  const dispatch = useAppDispatch();

  const orders = useAppSelector((state): TOrder | null => {
    const feedOrder = state.feed.orders.find(
      (order: TOrder) => order.number === orderNumber
    );

    if (feedOrder) {
      return feedOrder;
    }

    const historyOrder = state.historyOrders.orders.find(
      (order: TOrder) => order.number === orderNumber
    );

    if (historyOrder) {
      return historyOrder;
    }

    return state.feed.order ? state.feed.order[0] : null;
  });


  const ingredients = useAppSelector(
    (state) => state.ingredients.ingredients
  );

  useEffect(() => {
    if (!orders) {
      dispatch(getHttpsOrder(orderNumber));
    }
  }, [orders]);

  const findIngredients = useMemo(() => {
    return orders
      ? orders.ingredients.map((ingredientId: string) =>
          ingredients.find(
            (ingredient: TIngredient) => ingredient._id === ingredientId
          )
        )
      : [];
  }, [ingredients, orders]);

  const uniqIngredients = useMemo(() => {
    const allIngredients = findIngredients.filter(Boolean) as TIngredient[];

    const uniqueIngredients = [
      ...new Set(allIngredients.map((ing) => ing._id)),
    ].map((id) =>
      allIngredients.find((ing) => ing._id === id)
    ) as TIngredient[];

    return uniqueIngredients;
  }, [findIngredients]);

  const count = useMemo(() => {
    return findIngredients.reduce((acc, ingredient) => {
      if (ingredient && ingredient._id) {
        acc[ingredient._id] = (acc[ingredient._id] || 0) + 1;
      }
      return acc;
    }, {} as Record<string, number>);
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

  const getStatus = (status: string) => {
    switch (status) {
      case "done":
        return "Выполнен";
      case "pending":
        return "Готовится";
      case "created":
        return "Создан";
      default:
        return "";
    }
  };

  if (!orders) {
    return (
      <div className={styles.preloader}>
        <p className="text text_type_main-large">Загрузка...</p>
      </div>
    );
  }

  return (
    <div className={styles.wrapper}>
      <p className={`${styles.number} text text_type_digits-default mb-10`}>
        #{orders.number}
      </p>
      <h2 className={`${styles.name} text text_type_main-medium mb-3`}>
        {orders.name}
      </h2>
      <p className={`${styles.status} text text_type_main-default mb-15`}>
        {getStatus(orders.status)}:
      </p>
      <p className={`${styles.compound} text text_type_main-medium mb-6`}>
        Состав:
      </p>
      <div className={`${styles.compoundContainer} mb-10`}>
        {uniqIngredients.map((ingredient, index) => (
          <IngredientInfo
            key={index}
            img={ingredient.image}
            name={ingredient.name}
            price={ingredient.price}
            count={count[ingredient._id]}
          />
        ))}
      </div>
      <div className={`${styles.footer} mb-10`}>
        <p className="text text_type_main-default text_color_inactive">
          <FormattedDate date={new Date(orders.createdAt)} /> i-GMT +3
        </p>
        <div className={styles.prices}>
          <p className="text text_type_digits-default">{sumOrder}</p>
          <CurrencyIcon type="primary" />
        </div>
      </div>
    </div>
  );
};

export default OrderInfo;
