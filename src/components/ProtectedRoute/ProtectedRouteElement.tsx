import { ReactElement } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useTypedSelector } from "../../hooks/useTypedSelector";

type TProtected = {
  onlyUnAuth?: boolean;
  component: ReactElement;
}

const Protected = ({ onlyUnAuth = false, component }: TProtected) => {
  const isAuthChecked = useTypedSelector((state) => state.profile.isAuthChecked);
  const user = useTypedSelector((state) => state.profile.user);
  const location = useLocation();

  if (!isAuthChecked) {
    return null;
  }

  if (onlyUnAuth && user) {
    const { from } = location.state || { from: { pathname: "/" } };
    return <Navigate to={from} />;
  }

  if (!onlyUnAuth && !user) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  return component;
};

export const OnlyAuth = Protected;
export const OnlyUnAuth = ({ component }: {component: ReactElement}
  ) => (
  <Protected onlyUnAuth={true} component={component} />
);
