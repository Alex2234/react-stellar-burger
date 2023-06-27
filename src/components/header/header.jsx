import React from "react";
import styles from "../../components/header/header.module.css";
import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

const AppHeader = () => {
  return (
    <header className={styles.header}>
      <div className={`${styles.container} p-4`}>
        <nav className={`${styles.nav}`}>
          <a className={`${styles.link} pl-5 pr-5 pb-5 pt-5`} href="">
            <BurgerIcon type="primary" />
            <p className="text text_type_main-default p-2">Конструктор</p>
          </a>
          <a className={`${styles.link} pl-5 pr-5 pb-5 pt-5`} href="">
            <ListIcon type="secondary" />
            <p className="text text_type_main-default text_color_inactive p-2">
              Лента заказов
            </p>
          </a>
        </nav>
        <Logo />
        <a className={`${styles.link} pl-5 pr-5 pb-5 pt-5`} href="">
          <ProfileIcon type="secondary" />
          <p className="text text_type_main-default text_color_inactive p-2">
            Личный кабинет
          </p>
        </a>
      </div>
    </header>
  );
};

export default AppHeader;
