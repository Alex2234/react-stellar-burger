import styles from "./app.module.css";
import AppHeader from "../header/header";
import Home from "../../pages/Home/Home";
import Login from "../../pages/Login/Login";
import Registration from "../../pages/Registration/Registration";
import ForgotPassword from "../../pages/ForgotPassword/ForgotPassword";
import ResetPassword from "../../pages/ResetPassword/ResetPassword";
import Profile from "../../pages/Profile/Profile";
import ProfileData from "../../pages/ProfileData/ProfileData";
import Orders from "../../pages/Orders/Orders";
import IngredientDetails from "../ingredientDetails/ingredient-detail";
import Feed from "../../pages/Feed/Feed";
import OrderInfo from "../OrderInfo/OrderInfo";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { checkUserAuth } from "../../services/actions/profile";
import { OnlyAuth, OnlyUnAuth } from "../ProtectedRoute/ProtectedRouteElement";
import { getIngredients } from "../../services/actions/ingredients";
import Modal from "../modal/modal";

const App = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state;

  const closeModal = () => {
    navigate(-1);
  };

  useEffect(() => {
    dispatch(checkUserAuth());
  }, []);

  useEffect(() => {
    dispatch(getIngredients());
  }, [dispatch]);

  return (
    <>
      <div className={styles.app}>
        <AppHeader />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<OnlyUnAuth component={<Login />} />} />
          <Route
            path="/register"
            element={<OnlyUnAuth component={<Registration />} />}
          />
          <Route
            path="/forgot-password"
            element={<OnlyUnAuth component={<ForgotPassword />} />}
          />
          <Route
            path="/reset-password"
            element={<OnlyUnAuth component={<ResetPassword />} />}
          />
          <Route path="/profile" element={<OnlyAuth component={<Profile />} />}>
            <Route index element={<ProfileData />} />
            <Route path="orders" element={<Orders />} />
          </Route>
          <Route
            path="/ingredients/:id"
            element={<IngredientDetails title="Детали ингредиента" />}
          />
          <Route path="/feed" element={<Feed />} />
          <Route path="/feed/:number" element={<OrderInfo />} />
          <Route
            path="/profile/orders/:number"
            element={<OnlyAuth component={<OrderInfo />} />}
          />
        </Routes>
      </div>

      {state?.background && (
        <Routes>
          <Route
            path="/ingredients/:id"
            element={
              <Modal title="Детали ингредиента" onClose={closeModal}>
                <IngredientDetails />
              </Modal>
            }
          />
          <Route
            path="/feed/:number"
            element={
              <Modal onClose={closeModal}>
                <OrderInfo />
              </Modal>
            }
          />
          <Route
            path="/profile/orders/:number"
            element={
              <Modal onClose={closeModal}>
                <OrderInfo />
              </Modal>
            }
          />
        </Routes>
      )}
    </>
  );
};

export default App;
