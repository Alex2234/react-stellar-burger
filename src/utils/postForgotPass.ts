import { url } from "./constants";
import { checkResponse } from "./checkResponse";

export const fetchPostForgotPassRequest = (email: string) => {
  return fetch(`${url}/password-reset`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email: email }),
  }).then(checkResponse);
};
