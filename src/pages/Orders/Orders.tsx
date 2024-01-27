import styles from "./orders.module.css";
import { useEffect } from "react";
import Order from "../../components/Order/Order";
import { useDispatch } from "react-redux";
import { connect, disconnect } from "../../services/actions/historyOrders";
import { wsUrl } from "../../utils/constants";
import { Link, useLocation } from "react-router-dom";
import { useTypedSelector } from "../../hooks/useTypedSelector";

const Orders = () => {
  const dispatch = useDispatch();

  const token = (): string | null => {
    const tokenString = localStorage.getItem("accessToken");

    if (tokenString) {
      const token = tokenString.split("Bearer ")[1];
      return token;
    } else {
      return null;
    }
  };

  const accessToken = token();

  useEffect(() => {
    dispatch(connect(`${wsUrl}?token=${accessToken}`));
    return () => {
      dispatch(disconnect());
    };
  }, [dispatch]);

  const location = useLocation();

  const { orders } = useTypedSelector((state) => state.historyOrders);

  if (orders.length === 0) {
    return (
      <div className={styles.preloader}>
        <p className="text text_type_main-large">Загрузка...</p>
      </div>
    );
  }
  return (
    <div className={styles.feed}>
      {orders.map((order, index) => (
        <Link
          to={`/profile/orders/${order.number}`}
          key={index}
          state={{ background: location }}
          className={styles.link}>
          <Order order={order} />
        </Link>
      ))}
    </div>
  );
};

export default Orders;
