import styles from "./profile.module.css";
import { NavLink, Outlet, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createSelector } from "reselect";
import { postLogout } from "../../services/actions/logout";
import { useParams, useLocation } from "react-router-dom";

const Profile = () => {
  const dispatch = useDispatch();

  const location = useLocation();

  const getDataLogout = (state) => state.logout;

  const getLogout = createSelector([getDataLogout], (logout) => logout.logout);

  const resLogout = useSelector(getLogout);

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
