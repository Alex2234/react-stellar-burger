import styles from "./profile.module.css";
import { NavLink, Outlet, Navigate } from "react-router-dom";
import { createSelector } from "reselect";
import { postLogout } from "../../services/actions/logout";
import { useLocation } from "react-router-dom";
import { RootState } from "../../services/reducers";
import { useAppSelector } from "../../hooks/useAppSelector";
import { useAppDispatch } from "../../hooks/useAppDispatch";

const Profile = () => {
  const dispatch = useAppDispatch();

  const location = useLocation();

  const getDataLogout = (state: RootState) => state.logout;

  const getLogout = createSelector([getDataLogout], (logout) => logout.logout);

  const resLogout = useAppSelector(getLogout);

  if (resLogout) {
    if (resLogout.success) {
      return <Navigate to="/login" />;
    }
  }

  const submitLogout = () => {
    dispatch(postLogout());
  };

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.links}>
          <NavLink
            to="/profile"
            end
            className={({ isActive }) =>
              `${styles.link} text text_type_main-medium ${
                isActive ? styles.active : "text_color_inactive"
              }`
            }>
            Профиль
          </NavLink>
          <NavLink
            to="/profile/orders"
            end
            className={({ isActive }) =>
              `${styles.link} text text_type_main-medium ${
                isActive ? styles.active : "text_color_inactive"
              }`
            }>
            История заказов
          </NavLink>
          <button
            className={`${styles.link} text text_type_main-medium text_color_inactive`}
            onClick={submitLogout}>
            Выход
          </button>
          <p className="text text_type_main-default text_color_inactive mt-20">
            {location.pathname === "/profile" ? (
              <span>
                В этом разделе вы можете&nbsp; изменить свои персональные данные
              </span>
            ) : (
              <span>
                В этом разделе вы можете&nbsp; посмотреть свою историю заказов
              </span>
            )}
          </p>
        </div>
        <Outlet />
      </div>
    </div>
  );
};

export default Profile;
