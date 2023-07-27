import React from "react";
import IngredientType from "../../utils/prop-types";
import PropTypes from "prop-types";
import styles from "../../components/burger-ingredients/burger-ingredients.module.css";
import {
  Counter,
  CurrencyIcon,
  Tab,
} from "@ya.praktikum/react-developer-burger-ui-components";
import Modal from "../modal/modal";
import IngredientDetails from "../ingredient-details/ingredient-detail";
import IngredientsContext from "../../services/ingredientsContext";
import SelectedIngredientsContext from "../../services/selectedIngredientsContext";

const BurgerIngredients = () => {
  const ingredients = React.useContext(IngredientsContext);
  const { addIngredient } = React.useContext(SelectedIngredientsContext);

  const buns = ingredients.filter((item) => item.type === "bun");
  const mains = ingredients.filter((item) => item.type === "main");
  const sauces = ingredients.filter((item) => item.type === "sauce");

  const [current, setCurrent] = React.useState("buns");

  const [modalOpen, setModalOpen] = React.useState(false);
  const [selectedIngredient, setSelectedIngredient] = React.useState();

  const openModal = (ingredient) => {
    setSelectedIngredient(ingredient);
    setModalOpen(true);
  };

  const addIngredients = (ingredient) => {
    setSelectedIngredient(ingredient);
    addIngredient(ingredient);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <section className={styles.section}>
      <h2 className="text text_type_main-large pt-10 pb-5">Соберите бургер</h2>
      <div className={styles.tab}>
        <Tab value="buns" active={current === "buns"} onClick={setCurrent}>
          Булки
        </Tab>
        <Tab value="mains" active={current === "mains"} onClick={setCurrent}>
          Соусы
        </Tab>
        <Tab value="sauces" active={current === "sauces"} onClick={setCurrent}>
          Начинки
        </Tab>
      </div>
      <div className={`${styles.container} custom-scroll`}>
        <h3 className="text text_type_main-medium pt-10 pb-6">Булки</h3>
        <div className={`${styles.ingredients} pl-4 pr-4`}>
          {buns.map((item) => (
            <div key={item._id} className={`${styles.ingredient} pb-8`}>
              <Counter count={1} size="default" extraClass="m-1" />
              <img
                src={item.image}
                alt={item.name}
                className="pl-4"
                onClick={() => addIngredients(item)}
              />
              <div className={`${styles.prices} pt-1 pb-1`}>
                <p className="text text_type_digits-default">{item.price}</p>
                <CurrencyIcon />
              </div>
              <p
                className={`${styles.name} text text_type_main-default`}
                onClick={() => openModal(item)}>
                {item.name}
              </p>
            </div>
          ))}
        </div>
        <h3 className="text text_type_main-medium pt-10 pb-6">Соусы</h3>
        <div className={`${styles.ingredients} pl-4 pr-4`}>
          {sauces.map((item) => (
            <div key={item._id} className={`${styles.ingredient} pb-8`}>
              <Counter count={1} size="default" extraClass="m-1" />
              <img
                src={item.image}
                alt={item.name}
                className="pl-4"
                onClick={() => addIngredients(item)}
              />
              <div className={`${styles.prices} pt-1 pb-1`}>
                <p className="text text_type_digits-default">{item.price}</p>
                <CurrencyIcon />
              </div>
              <p
                className={`${styles.name} text text_type_main-default`}
                onClick={() => openModal(item)}>
                {item.name}
              </p>
            </div>
          ))}
        </div>
        <h3 className="text text_type_main-medium pt-10 pb-6">Ингридиенты</h3>
        <div className={`${styles.ingredients} pl-4 pr-4`}>
          {mains.map((item) => (
            <div key={item._id} className={`${styles.ingredient} pb-8`}>
              <Counter count={1} size="default" extraClass="m-1" />
              <img
                src={item.image}
                alt={item.name}
                className="pl-4"
                onClick={() => addIngredients(item)}
              />
              <div className={`${styles.prices} pt-1 pb-1`}>
                <p className="text text_type_digits-default">{item.price}</p>
                <CurrencyIcon />
              </div>
              <p
                className={`${styles.name} text text_type_main-default`}
                onClick={() => openModal(item)}>
                {item.name}
              </p>
            </div>
          ))}
        </div>
      </div>
      <Modal
        title="Детали ингредиента"
        onClose={closeModal}
        isActive={modalOpen}>
        <IngredientDetails ingredient={selectedIngredient} />
      </Modal>
    </section>
  );
};

export default BurgerIngredients;
