import { useEffect, useMemo, useState, useRef } from "react";
import styles from "./burger-ingredients.module.css";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import Ingredient from "./ingredient/ingredient";
import { getIngredients } from "../../services/actions/ingredients";
import { createSelector } from "reselect";
import { Link, useLocation } from "react-router-dom";
import { RootState } from "../../services/reducers";
import { TIngredient } from "../../types/types";
import { useAppSelector } from "../../hooks/useAppSelector";
import { useAppDispatch } from "../../hooks/useAppDispatch";

const BurgerIngredients = () => {
  const dispatch = useAppDispatch();

  const location = useLocation();

  useEffect(() => {
    dispatch(getIngredients());
  }, [dispatch]);

  const getIngredientsState = (state: RootState) =>
    state.ingredients.ingredients;
  const getBunState = (state: RootState) => state.burgerConstructor.bun;
  const getSelectIngredientsState = (state: RootState) =>
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

  const ingredients = useAppSelector(selectIngredients);
  const bun = useAppSelector(selectBun);
  const selectedIngredients = useAppSelector(selectSelectedIngredients);

  const { buns, mains, sauces } = useMemo(() => {
    const buns = ingredients.filter((item: TIngredient) => item.type === "bun");
    const mains = ingredients.filter((item: TIngredient) => item.type === "main");
    const sauces = ingredients.filter((item: TIngredient) => item.type === "sauce");

    return { buns, mains, sauces };
  }, [ingredients]);

  const [current, setCurrent] = useState("buns");

  const getIngredientCount = (id: string) => {
    if (bun && bun._id === id) {
      return 1;
    }
    return selectedIngredients.filter((item: TIngredient) => item._id === id).length;
  };

  const bunsRef = useRef<HTMLDivElement | null>(null);
  const saucesRef = useRef<HTMLDivElement | null>(null);
  const mainsRef = useRef<HTMLDivElement | null>(null);

  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      const bunsTop = bunsRef.current
        ? bunsRef.current.getBoundingClientRect().top -
          containerRef.current!.getBoundingClientRect().top
        : 0;
      const saucesTop = saucesRef.current
        ? saucesRef.current.getBoundingClientRect().top -
          containerRef.current!.getBoundingClientRect().top
        : 0;
      const mainsTop = mainsRef.current
        ? mainsRef.current.getBoundingClientRect().top -
          containerRef.current!.getBoundingClientRect().top
        : 0;

      if (bunsTop <= 0 && bunsTop + bunsRef.current!.clientHeight > 0) {
        setCurrent("buns");
      } else if (
        saucesTop <= 0 &&
        saucesTop + saucesRef.current!.clientHeight > 0
      ) {
        setCurrent("sauces");
      } else if (
        mainsTop <= 0 &&
        mainsTop + mainsRef.current!.clientHeight > 0
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

  if (!ingredients) {
    return (
      <div className={styles.preloader}>
        <p className="text text_type_main-large">Загрузка...</p>
      </div>
    );
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
          {buns.map((ingredient: TIngredient) => (
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
          {sauces.map((ingredient: TIngredient) => (
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
          {mains.map((ingredient: TIngredient) => (
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
