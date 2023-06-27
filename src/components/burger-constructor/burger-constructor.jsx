import React from "react"
import PropTypes from 'prop-types'
import styles from "../../components/burger-constructor/burger-constructor.module.css"
import {
  ConstructorElement,
  DragIcon,
  Button,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components"

const BurgerConstructor = ({ data }) => {
  return (
    <section className={`${styles.section} pl-10`}>
      <div className={`${styles.wrapper} pt-25 pb-10`}>
        <div className={styles.constructorElement}>
          <div className={styles.icon_inactive}>
            <DragIcon type="primary" />
          </div>
          <ConstructorElement
            type="top"
            isLocked={true}
            text={data[0].name}
            price={data[0].price}
            thumbnail={data[0].image}
          />
        </div>
        <div className={styles.constructorElement}>
          <div>
            <DragIcon type="primary" />
          </div>
          <ConstructorElement
            text={data[6].name}
            price={data[6].price}
            thumbnail={data[6].image}
          />
        </div>
        <div className={styles.constructorElement}>
          <div>
            <DragIcon type="primary" />
          </div>
          <ConstructorElement
            text={data[5].name}
            price={data[5].price}
            thumbnail={data[5].image}
          />
        </div>
        <div className={styles.constructorElement}>
          <div>
            <DragIcon type="primary" />
          </div>
          <ConstructorElement
            text={data[7].name}
            price={data[7].price}
            thumbnail={data[7].image}
          />
        </div>
        <div className={styles.constructorElement}>
          <div>
            <DragIcon type="primary" />
          </div>
          <ConstructorElement
            text={data[8].name}
            price={data[8].price}
            thumbnail={data[8].image}
          />
        </div>
        <div className={styles.constructorElement}>
          <div>
            <DragIcon type="primary" />
          </div>
          <ConstructorElement
            text={data[8].name}
            price={data[8].price}
            thumbnail={data[8].image}
          />
        </div>
        <div className={styles.constructorElement}>
          <div className={styles.icon_inactive}>
            <DragIcon type="primary" />
          </div>
          <ConstructorElement
            type="bottom"
            isLocked={true}
            text={data[0].name}
            price={data[0].price}
            thumbnail={data[0].image}
          />
        </div>
      </div>
      <div className={styles.order}>
        <p className="text text_type_digits-medium pr-2">610</p>
        <CurrencyIcon type="primary" />
        <div className="pl-10">
          <Button htmlType="button" type="primary" size="large">
            Оформить заказ
          </Button>
        </div>
      </div>
    </section>
  );
};

BurgerConstructor.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      image: PropTypes.string.isRequired,
    }).isRequired
  ).isRequired,
};

export default BurgerConstructor;
