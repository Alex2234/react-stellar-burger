import styles from "./orders.module.css";
import { useEffect } from "react";
import Order from "../../components/Order/Order";
import { useSelector, useDispatch } from "react-redux";
import { connect, disconnect } from "../../services/actions/historyOrders";
import { wsUrl } from "../../utils/constants";
import { Link, useLocation } from "react-router-dom";

const Orders = () => {
  const dispatch = useDispatch();

  const token = localStorage.getItem("accessToken").split("Bearer ")[1];

  useEffect(() => {
    dispatch(connect(`${wsUrl}?token=${token}`));
    return () => {
      dispatch(disconnect());
    };
  }, [dispatch]);

  const location = useLocation();

  const { orders } = useSelector((state) => state.historyOrders);

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
