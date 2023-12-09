import { url } from "./constants";
import { checkResponse } from "./checkResponse";

export const fetchPostAuthorizationRequest = (email, password) => {
  return fetch(`${url}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email: email, password: password }),
  }).then(checkResponse);
};
