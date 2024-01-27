import { url } from "./constants";
import { checkResponse } from "./checkResponse";

export const fetchPostRegistrationRequest = (name: string, email: string, password: string) => {
  return fetch(`${url}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name: name, email: email, password: password }),
  }).then(checkResponse);
};
