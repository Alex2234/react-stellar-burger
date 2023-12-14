import useForm from "../../hooks/useForm";
import styles from "./registraion.module.css";
import {
  Button,
  Input,
  EmailInput,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createSelector } from "reselect";
import { postRegistration } from "../../services/actions/registration";

const Registration = () => {
  const [values, onChange] = useForm({ name: "", email: "", password: "" });
  const dispatch = useDispatch();

  const getDataRegister = (state) => state.registration;

  const dataRegister = createSelector(
    [getDataRegister],
    (registration) => registration.dataRegistration
  );

  const resRegister = useSelector(dataRegister);

  if (resRegister) {
    if (resRegister.success) {
      localStorage.setItem("accessToken", resRegister.accessToken);
      localStorage.setItem("refreshToken", resRegister.refreshToken);
    }
  }

  const submitRegister = (e) => {
    e.preventDefault();
    dispatch(postRegistration(values.name, values.email, values.password));
  };

  return (
    <div className={styles.wrapper}>
      <h2 className="text text_type_main-medium pb-4">Регистрация</h2>
      <form onSubmit={submitRegister} className={styles.form}>
        <Input
          type={"text"}
          placeholder={"Имя"}
          name={"name"}
          value={values.name}
          extraClass="pb-4"
          onChange={onChange}
        />
        <EmailInput
          name={"email"}
          isIcon={false}
          value={values.email}
          extraClass="pb-4"
          onChange={onChange}
        />
        <PasswordInput
          name={"password"}
          extraClass="pb-4"
          value={values.password}
          onChange={onChange}
        />
        <Button
          htmlType="submit"
          type="primary"
          size="large"
          extraClass="mb-20">
          Зарегистрироваться
        </Button>
      </form>
      <p className="text text_type_main-default text_color_inactive">
        Уже зарегистрированы?{" "}
        <Link to="/login" className={styles.link}>
          Войти
        </Link>
      </p>
    </div>
  );
};

export default Registration;
