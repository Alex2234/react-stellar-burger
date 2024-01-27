import { url } from "./constants";
import { checkResponse } from "./checkResponse";

export const fetchPostResetPassRequest = (pass: string, token: string) => {
  return fetch(`${url}/password-reset`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ pass: pass, token: token }),
  }).then(checkResponse);
};
