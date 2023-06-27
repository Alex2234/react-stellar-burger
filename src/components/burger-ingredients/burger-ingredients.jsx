import React from "react"
import PropTypes from 'prop-types'
import styles from "../../components/burger-ingredients/burger-ingredients.module.css"
import {
  Counter,
  CurrencyIcon,
  Tab,
} from "@ya.praktikum/react-developer-burger-ui-components"

const BurgerIngredients = ({ data }) => {
  const buns = data.filter((item) => item.type === "bun")
  const mains = data.filter((item) => item.type === "main")
  const sauces = data.filter((item) => item.type === "sauce")

  const [current, setCurrent] = React.useState("one")
  return (
    <section className={styles.section}>
      <h2 className="text text_type_main-large pt-10 pb-5">Соберите бургер</h2>
      <div className={styles.tab}>
        <Tab value="one" active={current === "one"} onClick={setCurrent}>
          Булки
        </Tab>
        <Tab value="two" active={current === "two"} onClick={setCurrent}>
          Соусы
        </Tab>
        <Tab value="three" active={current === "three"} onClick={setCurrent}>
          Начинки
        </Tab>
      </div>
      <div className={`${styles.container} custom-scroll`}>
        <div>
          <h3 className="text text_type_main-medium pt-10 pb-6">Булки</h3>
          <div className={`${styles.ingredients} pl-4`}>
            {buns.map((item) => (
              <div key={item._id} className={`${styles.ingredient} pb-8`}>
                <img src={item.image} alt={item.name} className="pl-4" />
                <div className={`${styles.prices} pt-1 pb-1`}>
                  <p className="text text_type_digits-default">{item.price}</p>
                  <CurrencyIcon />
                </div>
                <p className={`${styles.name} text text_type_main-default`}>
                  {item.name}
                </p>
              </div>
            ))}
          </div>
        </div>
        <div>
          <h3 className="text text_type_main-medium pt-10 pb-6">Соусы</h3>
          <div className={`${styles.ingredients} pl-4`}>
            {sauces.map((item) => (
              <div key={item._id} className={`${styles.ingredient} pb-8`}>
                <img src={item.image} alt={item.name} className="pl-4" />
                <div className={`${styles.prices} pt-1 pb-1`}>
                  <p className="text text_type_digits-default">{item.price}</p>
                  <CurrencyIcon />
                </div>
                <p className={`${styles.name} text text_type_main-default`}>
                  {item.name}
                </p>
              </div>
            ))}
          </div>
          <h3 className="text text_type_main-medium pt-10 pb-6">Ингридиенты</h3>
          <div className={`${styles.ingredients} pl-4`}>
            {mains.map((item) => (
              <div key={item._id} className={`${styles.ingredient} pb-8`}>
                <img src={item.image} alt={item.name} className="pl-4" />
                <div className={`${styles.prices} pt-1 pb-1`}>
                  <p className="text text_type_digits-default">{item.price}</p>
                  <CurrencyIcon />
                </div>
                <p className={`${styles.name} text text_type_main-default`}>
                  {item.name}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

BurgerIngredients.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      image: PropTypes.string.isRequired,
    }).isRequired
  ).isRequired,
};

export default BurgerIngredients;
