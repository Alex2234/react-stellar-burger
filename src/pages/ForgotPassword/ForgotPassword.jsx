import { useState } from "react";
import styles from "./forgotpassword.module.css";
import {
  Button,
  EmailInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createSelector } from "reselect";
import { postForgotPass } from "../../services/actions/forgotPass";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();

  const getDataForgotPass = (state) => state.forgotPass;

  const dataForgotPass = createSelector(
    [getDataForgotPass],
    (forgotPass) => forgotPass.dataForgotPass
  );

  const resDataForgotPass = useSelector(dataForgotPass);

  if (resDataForgotPass) {
    if (resDataForgotPass.success) {
      return <Navigate to="/reset-password" />;
    }
  }

  const submitForgotPass = (e) => {
    e.preventDefault();
    dispatch(postForgotPass(email));
  };

  return (
    <div className={styles.wrapper}>
      <h2 className="text text_type_main-medium pb-4">Восстановление пароля</h2>
      <EmailInput
        placeholder={"Укажите e-mail"}
        name={"email"}
        isIcon={false}
        extraClass="pb-4"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Button
        htmlType="button"
        type="primary"
        size="large"
        extraClass="mb-20"
        onClick={submitForgotPass}>
        Восстановить
      </Button>
      <p className="text text_type_main-default text_color_inactive">
        Вспомнили пароль?{" "}
        <Link to="/login" className={styles.link}>
          Войти
        </Link>
      </p>
    </div>
  );
};

export default ForgotPassword;
