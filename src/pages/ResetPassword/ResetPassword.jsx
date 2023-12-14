import useForm from "../../hooks/useForm";
import styles from "./resetpassword.module.css";
import {
  Button,
  PasswordInput,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { postResetPass } from "../../services/actions/resetPass";
import { createSelector } from "reselect";

const ResetPassword = () => {
  const [values, onChange] = useForm({ pass: "", token: "" });

  const dispatch = useDispatch();

  const submitResetPass = (e) => {
    e.preventDefault();
    dispatch(postResetPass(values.pass, values.token));
  };

  const getDataResetPass = (state) => state.resetPass;

  const dataResetPass = createSelector(
    [getDataResetPass],
    (resetPass) => resetPass.dataResetPass
  );

  const resDataResetPass = useSelector(dataResetPass);

  if (!localStorage.getItem("Success")) {
    return <Navigate to="/" />;
  }

  if (resDataResetPass) {
    if (resDataResetPass.success) {
      return <Navigate to="/login" />;
    }
  }

  return (
    <div className={styles.wrapper}>
      <h2 className="text text_type_main-medium pb-4">Восстановление пароля</h2>
      <form onSubmit={submitResetPass} className={styles.form}>
        <PasswordInput
          placeholder={"Введите новый пароль"}
          name={"password"}
          extraClass="pb-4"
          value={values.pass}
          onChange={onChange}
        />
        <Input
          type={"text"}
          placeholder={"Введите код из письма"}
          name={"код"}
          extraClass="pb-4"
          value={values.token}
          onChange={onChange}
        />
        <Button
          htmlType="submit"
          type="primary"
          size="large"
          extraClass="mb-20">
          Сохранить
        </Button>
      </form>
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
