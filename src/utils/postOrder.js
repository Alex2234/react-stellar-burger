import { url } from "./constants";
import { checkResponse } from "./checkResponse";

export const fetchPostOrderRequest = (ingredients) => {
    return fetch(`${url}/orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ ingredients: ingredients })
    }).then(checkResponse);
  };