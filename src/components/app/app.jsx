import React from "react";
import styles from "./app.module.css";
import AppHeader from "../header/header";
import { fetchIngredients } from "../../utils/burger-api";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import IngredientsContext from "../../services/ingredientsContext";
import SelectedIngredientsContext from "../../services/selectedIngredientsContext";

const App = () => {
  const [data, setData] = React.useState([]);
  const [error, setError] = React.useState();
  const [selectedIngredients, setSelectedIngredients] = React.useState([]);

  React.useEffect(() => {
    fetchIngredients()
      .then(({ data }) => setData(data))
      .catch((err) => {
        setError(err.message);
      });
  }, []);

  const addIngredient = (ingredient) => {
    if (ingredient.type === "bun") {
      setSelectedIngredients((prevIngredients) => {
        const ingredientsWithoutBun = prevIngredients.filter(
          (item) => item.type !== "bun"
        );
        return [...ingredientsWithoutBun, ingredient];
      });
    } else {
      setSelectedIngredients((prevIngredients) => [
        ...prevIngredients,
        ingredient,
      ]);
    }
  };

  if (error) {
    return <div>Произошла ошибка: {error}</div>;
  }

  return (
    <div className={styles.app}>
      <AppHeader />
      <div className={styles.wrapper}>
        <IngredientsContext.Provider value={data}>
          <SelectedIngredientsContext.Provider
            value={{ selectedIngredients, addIngredient }}>
            <BurgerIngredients />
            <BurgerConstructor />
          </SelectedIngredientsContext.Provider>
        </IngredientsContext.Provider>
      </div>
    </div>
  );
};

export default App;
