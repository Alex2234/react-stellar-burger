import { useEffect } from "react";
import styles from "./feed.module.css";
import Order from "../../components/Order/Order";
import { useSelector, useDispatch } from "react-redux";
import { connect, disconnect } from "../../services/actions/feed";
import { wsUrl } from "../../utils/constants";
import { Link, useLocation } from "react-router-dom";



const Feed = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(connect(`${wsUrl}/all`));
    return () => {
      dispatch(disconnect());
    };
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
