import React, { useEffect, useMemo, useState, useRef } from "react";
import styles from "./burger-ingredients.module.css";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import Ingredient from "./ingredient/ingredient";
import Modal from "../modal/modal";
import IngredientDetails from "../ingredient-details/ingredient-detail";
import { getIngredients } from "../../services/actions/ingredients";
import { v4 as uuidv4 } from "uuid";
import { useSelector, useDispatch } from "react-redux";
import {
  getIngredientDetail,
  deleteIngredientDetail,
} from "../../services/actions/ingredientDetail";

const BurgerIngredients = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getIngredients());
  }, [dispatch]);

  const { ingredients, ingredientDetail, bun, selectIngredients } = useSelector(
    (state) => ({
      ingredients: state.ingredients.ingredients,
      ingredientDetail: state.ingredientDetail.ingredientDetail,
      bun: state.burgerConstructor.bun,
      selectIngredients: state.burgerConstructor.selectIngredients,
    })
  );

  const buns = useMemo(
    () => ingredients.filter((item) => item.type === "bun"),
    [ingredients]
  );
  const mains = useMemo(
    () => ingredients.filter((item) => item.type === "main"),
    [ingredients]
  );
  const sauces = useMemo(
    () => ingredients.filter((item) => item.type === "sauce"),
    [ingredients]
  );

  const [current, setCurrent] = useState("buns");

  const getIngredientCount = (id) => {
    if (bun && bun._id === id) {
      return 1;
    }
    return selectIngredients.filter((item) => item._id === id).length;
  };

  const [modalOpen, setModalOpen] = useState(false);

  const openModal = (ingredientDetail) => {
    setModalOpen(true);
    dispatch(getIngredientDetail(ingredientDetail));
  };

  const closeModal = (ingredientDetail) => {
    setModalOpen(false);
    dispatch(deleteIngredientDetail(ingredientDetail));
  };

  const bunsRef = useRef(null);
  const saucesRef = useRef(null);
  const mainsRef = useRef(null);

  const containerRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const bunsTop =
        bunsRef.current.getBoundingClientRect().top -
        containerRef.current.getBoundingClientRect().top;
      const saucesTop =
        saucesRef.current.getBoundingClientRect().top -
        containerRef.current.getBoundingClientRect().top;
      const mainsTop =
        mainsRef.current.getBoundingClientRect().top -
        containerRef.current.getBoundingClientRect().top;

      if (bunsTop <= 0 && bunsTop + bunsRef.current.clientHeight > 0) {
        setCurrent("buns");
      } else if (
        saucesTop <= 0 &&
        saucesTop + saucesRef.current.clientHeight > 0
      ) {
        setCurrent("sauces");
      } else if (
        mainsTop <= 0 &&
        mainsTop + mainsRef.current.clientHeight > 0
      ) {
        setCurrent("mains");
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener("scroll", handleScroll);
      return () => {
        container.removeEventListener("scroll", handleScroll);
      };
    }
  }, []);

  return (
    <section className={styles.section}>
      <h2 className="text text_type_main-large pt-10 pb-5">Соберите бургер</h2>
      <div className={styles.tab}>
        <Tab value="buns" active={current === "buns"} onClick={setCurrent}>
          Булки
        </Tab>
        <Tab value="sauces" active={current === "sauces"} onClick={setCurrent}>
          Соусы
        </Tab>
        <Tab value="mains" active={current === "mains"} onClick={setCurrent}>
          Начинки
        </Tab>
      </div>
      <div ref={containerRef} className={`${styles.container} custom-scroll`}>
        <h3 ref={bunsRef} className="text text_type_main-medium pt-10 pb-6">
          Булки
        </h3>
        <div className={`${styles.ingredients} pl-4 pr-4`}>
          {buns.map((ingredient) => (
            <Ingredient
              key={uuidv4()}
              {...ingredient}
              counter={getIngredientCount(ingredient._id)}
              openModal={() => openModal(ingredient)}
            />
          ))}
        </div>
        <h3 ref={saucesRef} className="text text_type_main-medium pt-10 pb-6">
          Соусы
        </h3>
        <div className={`${styles.ingredients} pl-4 pr-4`}>
          {sauces.map((ingredient) => (
            <Ingredient
              key={uuidv4()}
              {...ingredient}
              counter={getIngredientCount(ingredient._id)}
              openModal={() => openModal(ingredient)}
            />
          ))}
        </div>
        <h3 ref={mainsRef} className="text text_type_main-medium pt-10 pb-6">
          Ингридиенты
        </h3>
        <div className={`${styles.ingredients} pl-4 pr-4`}>
          {mains.map((ingredient) => (
            <Ingredient
              key={uuidv4()}
              {...ingredient}
              counter={getIngredientCount(ingredient._id)}
              openModal={() => openModal(ingredient)}
            />
          ))}
        </div>
      </div>
      <Modal
        title="Детали ингредиента"
        onClose={closeModal}
        isActive={modalOpen}>
        <IngredientDetails ingredient={ingredientDetail} />
      </Modal>
    </section>
  );
};

export default BurgerIngredients;
