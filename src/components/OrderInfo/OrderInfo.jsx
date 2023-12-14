import styles from "./order-info.module.css";
import { useEffect, useMemo } from "react";
import {
  CurrencyIcon,
  FormattedDate,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  connect,
  disconnect,
  getHttpsOrder,
} from "../../services/actions/feed";
import { wsUrl } from "../../utils/constants";
import { getIngredients } from "../../services/actions/ingredients";

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

const OrderInfo = () => {
  const { number } = useParams();
  const orderNumber = parseInt(number, 10);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getIngredients());
    dispatch(connect(`${wsUrl}/all`));

    return () => {
      dispatch(disconnect());
    };
  }, [dispatch]);

  const ingredients = useSelector((state) => state.ingredients.ingredients);
  const orders = useSelector((state) => state.feed.orders);

  const httpsOrder = useSelector((state) => state.feed.order);

  useEffect(() => {
    if (!orders.some((order) => order.number === orderNumber)) {
      dispatch(disconnect());
      dispatch(getHttpsOrder(number));
    }
  }, [dispatch, orders, number, orderNumber]);

  const currentOrder = useMemo(() => {
    return orders.find((order) => order.number === orderNumber) || httpsOrder;
  }, [orders, orderNumber, httpsOrder]);

  const findIngredients = useMemo(() => {
    return currentOrder
      ? currentOrder.ingredients.map((ingredientId) =>
          ingredients.find((ingredient) => ingredient._id === ingredientId)
        )
      : [];
  }, [currentOrder, ingredients]);

  const uniqIngredients = useMemo(() => {
    const allIngredients = findIngredients.filter(Boolean);

    const uniqueIngredients = [...new Set(allIngredients)];

    return uniqueIngredients;
  }, [findIngredients]);

  const count = useMemo(() => {
    return findIngredients.reduce((acc, ingredient) => {
      if (ingredient && ingredient._id) {
        acc[ingredient._id] = (acc[ingredient._id] || 0) + 1;
      }
      return acc;
    }, {});
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

  const getStatus = (status) => {
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

  if (!currentOrder) {
    return (
      <div className={styles.preloader}>
        <p className="text text_type_main-large">Загрузка...</p>
      </div>
    );
  }

  return (
    <div className={styles.wrapper}>
      <p className={`${styles.number} text text_type_digits-default mb-10`}>
        #{currentOrder.number}
      </p>
      <h2 className={`${styles.name} text text_type_main-medium mb-3`}>
        {currentOrder.name}
      </h2>
      <p className={`${styles.status} text text_type_main-default mb-15`}>
        {getStatus(currentOrder.status)}:
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
          <FormattedDate date={new Date(currentOrder.createdAt)} /> i-GMT +3
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
