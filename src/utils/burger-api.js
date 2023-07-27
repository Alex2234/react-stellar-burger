import url from "./constants";

const checkResponse = (res) => {
  return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
};

export const fetchIngredients = () => {
  return fetch(`${url}/ingredients`).then(checkResponse);
};




export const postOrder = (ingredients) => {
  return fetch(`${url}/orders`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ ingredients: ingredients })
  }).then(checkResponse);
};