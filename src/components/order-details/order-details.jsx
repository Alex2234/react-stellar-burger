import PropTypes from "prop-types";
import styles from "./order-details.module.css";
import checkBox from "../../images/graphics.svg";

const OrderDetails = ({ orderId }) => {
  return (
    <div className={styles.wrapper}>
      <p className="text text_type_digits-large pt-30">{orderId}</p>
      <p className="text text_type_main-medium pt-8">идентификатор заказа</p>
      <img src={checkBox} alt="" className="pt-15" />
      <p className="text text_type_main-default pt-15">
        Ваш заказ начали готовить
      </p>
      <span className={`${styles.span} text text_type_main-default pt-2 pb-30`}>
        Дождитесь готовности на орбитальной станции
      </span>
    </div>
  );
};

OrderDetails.propTypes = {
  orderId: PropTypes.number,
};

export default OrderDetails;
