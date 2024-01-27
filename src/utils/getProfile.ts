import { url } from "./constants";
import { fetchWithRefresh } from "./fetchWithRefresh";


const endpoint = '/auth/user';

const fullUrl = url + endpoint;


export const getProfileRequest = () => {
  const accessToken = localStorage.getItem('accessToken') || '';
    return fetchWithRefresh(fullUrl, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': accessToken
        }
      })
}





