import { useEffect, useState } from "react";
import styles from "./profiledata.module.css";
import {
  Input,
  EmailInput,
  PasswordInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useDispatch, useSelector } from "react-redux";
import { createSelector } from "reselect";
import { getProfile } from "../../services/actions/profile";
import { patchProfile } from "../../services/actions/profile";

const ProfileData = () => {
  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [login, setLogin] = useState("");
  const [pass, setPass] = useState("*******");
  const [isChanged, setIsChanged] = useState(false);

  useEffect(() => {
    dispatch(getProfile());
  }, [dispatch]);

  const getUser = (state) => state.profile;

  const userProfile = createSelector([getUser], (profile) => profile.user);

  const user = useSelector(userProfile);

  useEffect(() => {
    if (user) {
      setName(user.name);
      setLogin(user.email);
    }
  }, [user]);

  const handleInputChange = (setter) => (e) => {
    setter(e.target.value);
    setIsChanged(true);
  };


  const submitSave = () => {
    dispatch(patchProfile(name, login, pass))
  }

  return (
    <div className={styles.wrapper}>
      <Input
        type={"text"}
        placeholder={"Имя"}
        name={"name"}
        icon="EditIcon"
        extraClass="pb-6"
        value={name}
        onChange={handleInputChange(setName)}
      />
      <EmailInput
        name={"email"}
        placeholder="Логин"
        isIcon={true}
        extraClass="pb-6"
        value={login}
        onChange={handleInputChange(setLogin)}
      />
      <PasswordInput
        name={"Пароль"}
        icon="EditIcon"
        value={pass}
        onChange={handleInputChange(setPass)}
      />

      <div
        className={`${styles.buttons} mt-6 ${
          isChanged ? styles.buttons_active : ""
        }`}>
        <Button htmlType="button" type="secondary" size="medium">
          Отмена
        </Button>
        <Button htmlType="button" type="primary" size="large" onClick={submitSave}>
          Сохранить
        </Button>
      </div>
    </div>
  );
};

export default ProfileData;
