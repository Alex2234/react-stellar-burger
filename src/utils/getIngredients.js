import { url } from "./constants";
import  { checkResponse } from "./checkResponse";


export const fetchIngredientsRequest
 = () => {
  return fetch(`${url}/ingredients`).then(checkResponse);
};