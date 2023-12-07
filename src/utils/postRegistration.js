import { url } from "./constants";
import { checkResponse } from "./checkResponse";

export const fetchPostRegistrationRequest = (name, email, password) => {
  return fetch(`${url}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name: name, email: email, password: password }),
  }).then(checkResponse);
};
