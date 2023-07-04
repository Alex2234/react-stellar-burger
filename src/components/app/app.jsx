import React from "react";
import styles from "./app.module.css";
import url from "../../utils/constants";
import AppHeader from "../header/header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";

const App = () => {
  const [data, setData] = React.useState([]);

  React.useEffect(() => {
    const fetchData = () => {
      fetch(url)
        .then((res) => {
          return res.json();
        })
        .then(({ data }) => setData(data))
        .catch((err) => {
          return console.log("Ошибка. Запрос не выполнен: ", err);
        });
    };
    fetchData();
  }, []);

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
