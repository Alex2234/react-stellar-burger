import { url } from "./constants";
import { checkResponse } from "./checkResponse";


export const refreshToken = () => {
    return fetch(`${url}/auth/token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify({
        token: localStorage.getItem("refreshToken"),
      }),
    }).then(checkResponse);
  };