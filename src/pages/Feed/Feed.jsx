import { useEffect, useMemo } from "react";
import styles from "./feed.module.css";
import {
  FormattedDate,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { getIngredients } from "../../services/actions/ingredients";
import { createSelector } from "reselect";
import { useSelector, useDispatch } from "react-redux";
import { connect } from "../../services/actions/feed";
import { wsUrl } from "../../utils/constants";
import { Link, useLocation } from "react-router-dom";

const CircleIcons = ({ icons }) => {
  const maxIcons = 5;

  const displayedIcons = icons.slice(0, maxIcons);
  const extraIconsCount = icons.length > maxIcons ? icons.length - maxIcons : 0;

  return (
    <div className={styles.iconsContainer}>
      {displayedIcons.map((icon, index) => (
        <div key={index} className={styles.circle}>
          <img className={styles.icon} src={icon} alt="icon" />
          {index === maxIcons - 1 && extraIconsCount > 0 && (
            <>
              <div className={styles.overlay}></div>
              <p className={`${styles.iconText} text text_type_digits-default`}>
                +{extraIconsCount}
              </p>
            </>
          )}
        </div>
      ))}
    </div>
  );
};

export const Order = ({ order }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getIngredients());
  }, [dispatch]);

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

const Feed = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(connect(`${wsUrl}/all`));
  }, [dispatch]);

  const location = useLocation();

  const { orders, total, totalToday } = useSelector((state) => state.feed);

  if (orders.length === 0) {
    return (
      <div className={styles.preloader}>
        <p className="text text_type_main-large">Загрузка...</p>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <h2 className={`${styles.title} text text_type_main-large`}>
        Лента заказов
      </h2>
      <div className={styles.wrapper}>
        <div className={styles.feed}>
          {orders.map((order, index) => (
            <Link
              to={`/feed/${order.number}`}
              key={index}
              state={{ background: location }}
              className={styles.link}>
              <Order order={order} />
            </Link>
          ))}
        </div>
        <div className={`${styles.table} ml-15`}>
          <div className={`${styles.statuses} mb-15`}>
            <div className="mr-9">
              <h2 className="text text_type_main-medium mb-6">Готовы:</h2>
              <div className={styles.orderNumb}>
                {orders
                  .filter((order) => order.status === "done")
                  .slice(0, 10)
                  .map((order, index) => (
                    <p
                      key={index}
                      className={`${styles.numberDone} text text_type_digits-default mb-2`}>
                      {order.number}
                    </p>
                  ))}
              </div>
            </div>
            <div>
              <h2 className="text text_type_main-medium mb-6">В работе:</h2>
              <div className={styles.orderNumb}>
                {orders
                  .filter((order) => order.status === "pending")
                  .slice(0, 10)
                  .map((order, index) => (
                    <p
                      key={index}
                      className="text text_type_digits-default mb-2">
                      {order.number}
                    </p>
                  ))}
              </div>
            </div>
          </div>
          <h2 className="text text_type_main-medium">
            Выполнено за все время:
          </h2>
          <p
            className={`${styles.allOrders} text text_type_digits-large mb-15`}>
            {total}
          </p>
          <h2 className="text text_type_main-medium">Выполнено за сегодня:</h2>
          <p
            className={`${styles.allOrders} text text_type_digits-large mb-15`}>
            {totalToday}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Feed;
