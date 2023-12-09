import { url } from "./constants";
import { checkResponse } from "./checkResponse";

export const fetchPostLogoutRequest = () => {
  return fetch(`${url}/auth/logout`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ token: localStorage.getItem("refreshToken") }),
  }).then(checkResponse);
};
