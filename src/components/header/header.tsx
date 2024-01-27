import { ElementType} from "react";
import styles from "./header.module.css";
import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { NavLink } from "react-router-dom";

type TAppHeader = {
  to: string;
  Icon: ElementType;
  title: string;
}

const AppHeader = () => {
  const Link = ({ to, Icon, title }: TAppHeader) => {
    return (
      <NavLink
        to={to}
        className={({ isActive }) =>
          `${styles.link} pl-5 pr-5 pb-5 pt-5 ${isActive ? styles.active : ""}`
        }>
        {({ isActive }) => (
          <div className={styles.button}>
            <Icon type={isActive ? "primary" : "secondary"} />
            <p
              className={`text text_type_main-default p-2 ${
                isActive ? styles.active : "text_color_inactive"
              }`}>
              {title}
            </p>
          </div>
        )}
      </NavLink>
    );
  };

  return (
    <header className={styles.header}>
      <div className={`${styles.container} p-4`}>
        <nav className={`${styles.nav}`}>
          <Link to="/" Icon={BurgerIcon} title="Конструктор" />
          <Link to="/feed" Icon={ListIcon} title="Лента заказов" />
        </nav>
        <Logo />
        <Link to="/profile" Icon={ProfileIcon} title="Личный кабинет" />
      </div>
    </header>
  );
};

export default AppHeader;
