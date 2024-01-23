import { url } from "./constants";
import { fetchWithRefresh } from "./fetchWithRefresh";


const endpoint = '/orders';

const fullUrl = url + endpoint;


export const fetchPostOrderRequest = (ingredients) => {
    return fetchWithRefresh(fullUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': localStorage.getItem('accessToken')
        },
        body: JSON.stringify({ ingredients: ingredients })
      })
}