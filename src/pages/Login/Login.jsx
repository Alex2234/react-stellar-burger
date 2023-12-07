import { useState } from "react";
import styles from "./login.module.css";
import {
  EmailInput,
  PasswordInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createSelector } from "reselect";
import { postAuthorization } from "../../services/actions/authorization";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const getDataAuth = (state) => state.authorization;

  const dataAuth = createSelector(
    [getDataAuth],
    (authorization) => authorization.dataAuthorization
  );

  const resAuth = useSelector(dataAuth);

  if (resAuth) {
    if (resAuth.success) {
      localStorage.setItem("accessToken", resAuth.accessToken);
      localStorage.setItem("refreshToken", resAuth.refreshToken);
      return <Navigate to="/" />;
    }
  }

  const submitAuthorization = (e) => {
    e.preventDefault();
    dispatch(postAuthorization(email, password));
  };

  return (
    <div className={styles.wrapper}>
      <h2 className="text text_type_main-medium pb-4">Вход</h2>
      <EmailInput
        name={"email"}
        isIcon={false}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        extraClass="pb-4"
        
      />
      <PasswordInput
        name={"password"}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        extraClass="pb-4"
      />
      <Button
        htmlType="button"
        type="primary"
        size="large"
        extraClass="mb-20"
        onClick={submitAuthorization}>
        Войти
      </Button>
      <p className="text text_type_main-default text_color_inactive mb-4">
        Вы - новый пользователь?{" "}
        <Link to="/register" className={styles.link}>
          Зарегистрироваться
        </Link>
      </p>
      <p className="text text_type_main-default text_color_inactive">
        Забыли пароль?{" "}
        <Link to="/forgot-password" className={styles.link}>
          Восстановить пароль
        </Link>
      </p>
    </div>
  );
};

export default Login;
