import { useMemo, useState, useCallback, useEffect } from "react";
import styles from "../../components/burger-constructor/burger-constructor.module.css";
import {
  Button,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import Bun from "./bun-constructor/bunConstructor";
import DragIngredient from "./dragIngredient-constructor/dragIngredientConstructor";
import Modal from "../modal/modal";
import OrderDetails from "../OrderDetails/order-details";
import { postOrder } from "../../services/actions/order";
import { useSelector, useDispatch } from "react-redux";
import { createSelector } from "reselect";
import {
  deleteIngredient,
  addIngredient,
} from "../../services/actions/burgerConstructor";
import { useDrop } from "react-dnd";
import update from "immutability-helper";

const BurgerConstructor = () => {
  const dispatch = useDispatch();

  const getBurgerConstructorState = (state) => state.burgerConstructor;
  const getOrderState = (state) => state.order;

  const selectBun = createSelector(
    [getBurgerConstructorState],
    (burgerConstructor) => burgerConstructor.bun
  );

  const selectSelectedIngredients = createSelector(
    [getBurgerConstructorState],
    (burgerConstructor) => burgerConstructor.selectIngredients
  );

  const selectOrderId = createSelector(
    [getOrderState],
    (order) => order.orderId
  );

  const bun = useSelector(selectBun);
  const selectedIngredients = useSelector(selectSelectedIngredients);
  const orderId = useSelector(selectOrderId);

  const orderBurger = useMemo(() => {
    return [...selectedIngredients, bun];
  }, [selectedIngredients, bun]);

  const sumOrder = useMemo(() => {
    let total = 0;
    selectedIngredients.forEach((ingredient) => {
      total += ingredient.price;
    });

    if (bun) {
      total += bun.price * 2;
    }

    return total;
  }, [selectedIngredients, bun]);

  const [modalOpen, setModalOpen] = useState(false);

  const openModal = (ingredients) => {
    setModalOpen(true);
    dispatch(postOrder(ingredients));
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const [, dropConstructor] = useDrop(() => ({
    accept: "ingredient",
    drop: (item) => dispatch(addIngredient(item)),
  }));

  const [moveIngredients, setMoveIngredients] = useState([]);

  useEffect(() => {
    setMoveIngredients(selectedIngredients);
  }, [selectedIngredients]);

  const moveIngredient = useCallback((dragIndex, hoverIndex) => {
    setMoveIngredients((prevCards) =>
      update(prevCards, {
        $splice: [
          [dragIndex, 1],
          [hoverIndex, 0, prevCards[dragIndex]],
        ],
      })
    );
  }, []);

  const renderDragIngredient = useMemo(() => {
    return moveIngredients.map((ingredient, index) => (
      <DragIngredient
        key={ingredient.key}
        id={ingredient.key}
        ingredient={ingredient}
        index={index}
        moveIngredient={moveIngredient}
        deleteIngredient={() => dispatch(deleteIngredient(ingredient.key))}
      />
    ));
  }, [moveIngredients, moveIngredient, dispatch]);

  return (
    <section className={`${styles.section} pl-10`}>
      <div ref={dropConstructor} className={`${styles.wrapper} pt-25 pb-10`}>
        {bun && <Bun bun={bun} type="top" />}
        <div className={`${styles.scroll} custom-scroll ${styles.wrapper}`}>
          {renderDragIngredient}
        </div>
        {bun && <Bun bun={bun} type="bottom" />}
      </div>
      <div className={styles.order}>
        <p className="text text_type_digits-medium pr-2">{sumOrder}</p>
        <CurrencyIcon type="primary" />
        <div className="pl-10">
          <Button
            htmlType="button"
            type="primary"
            size="large"
            onClick={() => openModal(orderBurger)}>
            Оформить заказ
          </Button>
        </div>
      </div>
      {modalOpen && (
        <Modal onClose={closeModal}>
          <OrderDetails orderId={orderId} />
        </Modal>
      )}
    </section>
  );
};

export default BurgerConstructor;
