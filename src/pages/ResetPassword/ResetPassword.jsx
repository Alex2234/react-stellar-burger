import { useState } from "react";
import styles from "./resetpassword.module.css";
import {
  Button,
  PasswordInput,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { postResetPass } from "../../services/actions/resetPass";

const ResetPassword = () => {
  const [pass, setPass] = useState("");
  const [token, setToken] = useState("");

  const dispatch = useDispatch();

  const submitResetPass = (e) => {
    e.preventDefault();
    dispatch(postResetPass(pass, token));
  };

  return (
    <div className={styles.wrapper}>
      <h2 className="text text_type_main-medium pb-4">Восстановление пароля</h2>
      <PasswordInput
        placeholder={"Введите новый пароль"}
        name={"password"}
        extraClass="pb-4"
        value={pass}
        onChange={(e) => setPass(e.target.value)}
      />
      <Input
        type={"text"}
        placeholder={"Введите код из письма"}
        name={"код"}
        extraClass="pb-4"
        value={token}
        onChange={(e) => setToken(e.target.value)}
      />
      <Button
        htmlType="button"
        type="primary"
        size="large"
        extraClass="mb-20"
        onClick={submitResetPass}>
        Сохранить
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

export default ResetPassword;
