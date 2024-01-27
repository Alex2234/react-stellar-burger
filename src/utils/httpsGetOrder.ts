import { url } from "./constants";
import  { checkResponse } from "./checkResponse";


export const fetchHttpsOrderRequest
 = (number: number) => {
  return fetch(`${url}/orders/${number}`).then(checkResponse);
};