import { url } from "./constants";
import  { checkResponse } from "./checkResponse";


export const fetchHttpsOrderRequest
 = (number) => {
  return fetch(`${url}/orders/${number}`).then(checkResponse);
};