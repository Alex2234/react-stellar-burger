import  useForm  from "../../hooks/useForm";
import styles from "./login.module.css";
import {
  EmailInput,
  PasswordInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { postAuthorization } from "../../services/actions/authorization";
import { FormEvent } from "react";

const Login = () => {
  const [values, onChange] = useForm({ email: '', password: '' });

  const dispatch = useDispatch();
  const submitAuthorization = (e: FormEvent) => {
    e.preventDefault();
    dispatch(postAuthorization(values.email, values.password));
  };

  return (
    <div className={styles.wrapper}>
      <h2 className="text text_type_main-medium pb-4">Вход</h2>
      <form onSubmit={submitAuthorization} className={styles.form}>
        <EmailInput
          name={"email"}
          isIcon={false}
          value={values.email}
          onChange={onChange}
          extraClass="pb-4"
        />
        <PasswordInput
          name={"password"}
          value={values.password}
          onChange={onChange}
          extraClass="pb-4"
        />
        <Button
          htmlType="submit"
          type="primary"
          size="large"
          extraClass="mb-20">
          Войти
        </Button>
      </form>
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
