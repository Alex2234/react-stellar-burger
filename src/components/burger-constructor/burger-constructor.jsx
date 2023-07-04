import React from "react";
import IngredientType from "../../utils/prop-types";
import PropTypes from "prop-types";
import styles from "../../components/burger-constructor/burger-constructor.module.css";
import {
  ConstructorElement,
  DragIcon,
  Button,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import Modal from "../modal/modal";
import OrderDetails from "../order-details/order-details";

const BurgerConstructor = ({ data }) => {
  const [modalOpen, setModalOpen] = React.useState(false);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  if (!data.length) {
    return null;
  }

  return (
    <section className={`${styles.section} pl-10`}>
      <div className={`${styles.wrapper} pt-25 pb-10`}>
        <div className={styles.constructorElement}>
          <div className={styles.icon_inactive}>
            <DragIcon type="primary" />
          </div>
          <ConstructorElement
            type="top"
            isLocked={true}
            text={data[0].name}
            price={data[0].price}
            thumbnail={data[0].image}
          />
        </div>
        <div className={`${styles.scroll} custom-scroll`}>
          <div className={styles.wrapper}>
            {data.slice(1, -1).map((item) => (
              <div key={item._id} className={styles.constructorElement}>
                <div>
                  <DragIcon type="primary" />
                </div>
                <ConstructorElement
                  text={item.name}
                  price={item.price}
                  thumbnail={item.image}
                />
              </div>
            ))}
          </div>
        </div>
        <div className={styles.constructorElement}>
          <div className={styles.icon_inactive}>
            <DragIcon type="primary" />
          </div>
          <ConstructorElement
            type="bottom"
            isLocked={true}
            text={data[data.length - 1].name}
            price={data[data.length - 1].price}
            thumbnail={data[data.length - 1].image}
          />
        </div>
      </div>
      <div className={styles.order}>
        <p className="text text_type_digits-medium pr-2">610</p>
        <CurrencyIcon type="primary" />
        <div className="pl-10">
          <Button
            htmlType="button"
            type="primary"
            size="large"
            onClick={openModal}>
            Оформить заказ
          </Button>
        </div>
      </div>
      <Modal onClose={closeModal} isActive={modalOpen}>
        <OrderDetails />
      </Modal>
    </section>
  );
};

BurgerConstructor.propTypes = {
  data: PropTypes.arrayOf(IngredientType).isRequired,
};

export default BurgerConstructor;
