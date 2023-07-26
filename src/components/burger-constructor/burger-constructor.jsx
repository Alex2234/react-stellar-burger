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
import SelectedIngredientsContext from "../../services/selectedIngredientsContext";
import { postOrder } from "../../utils/burger-api";

const BurgerConstructor = () => {
  const { selectedIngredients } = React.useContext(SelectedIngredientsContext);

  const bun = selectedIngredients.filter((item) => item.type === "bun");
  const ingredients = selectedIngredients.filter(
    (item) => item.type === "main" || item.type === "sauce"
  );

  const [sumOrder, setSumOrder] = React.useState(0);
  const [orderId, setOrderId] = React.useState("");

  React.useEffect(() => {
    let total = 0;
    ingredients.forEach((ingredient) => {
      total += ingredient.price;
    });

    if (bun.length > 0) {
      total += bun[0].price * 2;
    }

    setSumOrder(total);
  }, [ingredients, bun]);

  const [modalOpen, setModalOpen] = React.useState(false);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <section className={`${styles.section} pl-10`}>
      <div className={`${styles.wrapper} pt-25 pb-10`}>
        {bun.length !== 0 && (
          <div className={styles.constructorElement}>
            <div className={styles.icon_inactive}>
              <DragIcon type="primary" />
            </div>
            <ConstructorElement
              type="top"
              isLocked={true}
              text={`${bun[0].name} верх`}
              price={bun[0].price}
              thumbnail={bun[0].image}
            />
          </div>
        )}
        <div className={`${styles.scroll} custom-scroll`}>
          <div className={styles.wrapper}>
            {ingredients.map((item, index) => (
              <div key={index} className={styles.constructorElement}>
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
        {bun.length !== 0 && (
          <div className={styles.constructorElement}>
            <div className={styles.icon_inactive}>
              <DragIcon type="primary" />
            </div>
            <ConstructorElement
              type="bottom"
              isLocked={true}
              text={`${bun[0].name} низ`}
              price={bun[0].price}
              thumbnail={bun[0].image}
            />
          </div>
        )}
      </div>
      <div className={styles.order}>
        <p className="text text_type_digits-medium pr-2">{sumOrder}</p>
        <CurrencyIcon type="primary" />
        <div className="pl-10">
          <Button
            htmlType="button"
            type="primary"
            size="large"
            onClick={() => {
              postOrder(
                selectedIngredients.map((ingredient) => ingredient._id)
              ).then((data) => {
                setOrderId(data.order.number);
                openModal();
              });
            }}>
            Оформить заказ
          </Button>
        </div>
      </div>
      <Modal onClose={closeModal} isActive={modalOpen}>
        <OrderDetails orderId={orderId} />
      </Modal>
    </section>
  );
};

// BurgerConstructor.propTypes = {
//   selectedIngredients: PropTypes.arrayOf(IngredientType).isRequired,
// };

export default BurgerConstructor;
