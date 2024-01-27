import {
  useEffect,
  useState,
  ChangeEvent,
  Dispatch,
  SetStateAction,
} from "react";
import styles from "./profiledata.module.css";
import {
  Input,
  EmailInput,
  PasswordInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { createSelector } from "reselect";
import { getProfile } from "../../services/actions/profile";
import { patchProfile } from "../../services/actions/profile";
import { RootState } from "../../services/reducers";
import { useAppSelector } from "../../hooks/useAppSelector";
import { useAppDispatch } from "../../hooks/useAppDispatch";

const ProfileData = () => {
  const dispatch = useAppDispatch();

  const [name, setName] = useState<string>("");
  const [login, setLogin] = useState<string>("");
  const [pass, setPass] = useState<string>("*******");
  const [isChanged, setIsChanged] = useState<boolean>(false);

  useEffect(() => {
    dispatch(getProfile());
  }, [dispatch]);

  const getUser = (state: RootState) => state.profile;

  const userProfile = createSelector([getUser], (profile) => profile.user);

  const user = useAppSelector(userProfile);

  useEffect(() => {
    if (user) {
      setName(user.name);
      setLogin(user.email);
    }
  }, [user]);

  const handleInputChange =
    (setter: Dispatch<SetStateAction<string>>) =>
    (e: ChangeEvent<HTMLInputElement>) => {
      setter(e.target.value);
      setIsChanged(true);
    };

  const submitSave = () => {
    dispatch(patchProfile(name, login, pass));
  };

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
        <Button
          htmlType="button"
          type="primary"
          size="large"
          onClick={submitSave}>
          Сохранить
        </Button>
      </div>
    </div>
  );
};

export default ProfileData;
