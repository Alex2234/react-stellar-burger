import { url } from "./constants";
import { fetchWithRefresh } from "./fetchWithRefresh";


const endpoint = '/auth/user';

const fullUrl = url + endpoint;


export const patchProfileRequest = (name: string, login: string, pass: string) => {
  const accessToken = localStorage.getItem('accessToken') || '';
    return fetchWithRefresh(fullUrl, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': accessToken
        },
        body: JSON.stringify({ name: name, login: login, pass: pass })
      })
}
