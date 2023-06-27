import styles from "./app.module.css"
import { data } from "../../utils/data"
import AppHeader from "../header/header"
import BurgerIngredients  from "../burger-ingredients/burger-ingredients"
import BurgerConstructor from "../burger-constructor/burger-constructor"

function App() {
  return (
    <div className={styles.app}>
      <AppHeader/>
      <div style={{ display: 'flex', margin: 'auto' }}>
        <BurgerIngredients data={data}/>
        <BurgerConstructor data={data}/>
      </div>
    </div>
  );
}

export default App;
