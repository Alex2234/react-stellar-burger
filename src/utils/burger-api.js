import url from "./constants";

const checkResponse = (res) => {
  return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
};

const fetchIngredients = () => {
  return fetch(`${url}/ingredients`).then(checkResponse);
};

export default fetchIngredients;
