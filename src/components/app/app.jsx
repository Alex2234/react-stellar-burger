import React from "react";
import styles from "./app.module.css";
import AppHeader from "../header/header";
import fetchIngredients from "../../utils/burger-api";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";

const App = () => {
  const [data, setData] = React.useState([]);
  const [error, setError] = React.useState();

  React.useEffect(() => {
    fetchIngredients()
      .then(({ data }) => setData(data))
      .catch((err) => {
        setError(err.message);
      });
  }, []);

  if (error) {
    return <div>Произошла ошибка: {error}</div>;
  }

  return (
    <div className={styles.app}>
      <AppHeader />
      <div className={styles.wrapper}>
        <BurgerIngredients data={data} />
        <BurgerConstructor data={data} />
      </div>
    </div>
  );
};

export default App;
