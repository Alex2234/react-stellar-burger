import { useEffect, useMemo, useState, useRef } from "react";
import styles from "./burger-ingredients.module.css";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import Ingredient from "./ingredient/ingredient";
import { getIngredients } from "../../services/actions/ingredients";
import { createSelector } from "reselect";
import { useSelector, useDispatch } from "react-redux";
import { Link, useLocation } from "react-router-dom";

const BurgerIngredients = () => {
  const dispatch = useDispatch();

  const location = useLocation();

  useEffect(() => {
    dispatch(getIngredients());
  }, [dispatch]);

  const getIngredientsState = (state) => state.ingredients.ingredients;
  const getBunState = (state) => state.burgerConstructor.bun;
  const getSelectIngredientsState = (state) =>
    state.burgerConstructor.selectIngredients;

  const selectIngredients = createSelector(
    getIngredientsState,
    (ingredients) => ingredients
  );

  const selectBun = createSelector(getBunState, (bun) => bun);

  const selectSelectedIngredients = createSelector(
    getSelectIngredientsState,
    (selectedIngredients) => selectedIngredients
  );

  const ingredients = useSelector(selectIngredients);
  const bun = useSelector(selectBun);
  const selectedIngredients = useSelector(selectSelectedIngredients);

  const { buns, mains, sauces } = useMemo(() => {
    const buns = ingredients.filter((item) => item.type === "bun");
    const mains = ingredients.filter((item) => item.type === "main");
    const sauces = ingredients.filter((item) => item.type === "sauce");

    return { buns, mains, sauces };
  }, [ingredients]);

  const [current, setCurrent] = useState("buns");

  const getIngredientCount = (id) => {
    if (bun && bun._id === id) {
      return 1;
    }
    return selectedIngredients.filter((item) => item._id === id).length;
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

  if(!ingredients) {
    return (
      <div className={styles.preloader}>
        <p className="text text_type_main-large">Загрузка...</p>
      </div>
    )
  }

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
            <Link
              to={`/ingredients/${ingredient._id}`}
              className={styles.link}
              key={ingredient._id}
              state={{ background: location }}>
              <Ingredient
                {...ingredient}
                counter={getIngredientCount(ingredient._id)}
              />
            </Link>
          ))}
        </div>
        <h3 ref={saucesRef} className="text text_type_main-medium pt-10 pb-6">
          Соусы
        </h3>
        <div className={`${styles.ingredients} pl-4 pr-4`}>
          {sauces.map((ingredient) => (
            <Link
              to={`/ingredients/${ingredient._id}`}
              className={styles.link}
              key={ingredient._id}
              state={{ background: location }}>
              <Ingredient
                {...ingredient}
                counter={getIngredientCount(ingredient._id)}
              />
            </Link>
          ))}
        </div>
        <h3 ref={mainsRef} className="text text_type_main-medium pt-10 pb-6">
          Ингридиенты
        </h3>
        <div className={`${styles.ingredients} pl-4 pr-4`}>
          {mains.map((ingredient) => (
            <Link
              to={`/ingredients/${ingredient._id}`}
              className={styles.link}
              key={ingredient._id}
              state={{ background: location }}>
              <Ingredient
                {...ingredient}
                counter={getIngredientCount(ingredient._id)}
              />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BurgerIngredients;
