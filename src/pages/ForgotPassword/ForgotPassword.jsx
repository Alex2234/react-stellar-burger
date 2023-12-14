import useForm  from "../../hooks/useForm";
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
  const [values, onChange] = useForm({ email: ''});
  const dispatch = useDispatch();

  const submitForgotPass = (e) => {
    e.preventDefault();
    dispatch(postForgotPass(values.email));
  };

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

  return (
    <div className={styles.wrapper}>
      <h2 className="text text_type_main-medium pb-4">Восстановление пароля</h2>
      <form onSubmit={submitForgotPass} className={styles.form}>
        <EmailInput
          placeholder={"Укажите e-mail"}
          name={"email"}
          isIcon={false}
          extraClass="pb-4"
          value={values.email}
          onChange={onChange}
        />
        <Button
          htmlType="submit"
          type="primary"
          size="large"
          extraClass="mb-20">
          Восстановить
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

export default ForgotPassword;
