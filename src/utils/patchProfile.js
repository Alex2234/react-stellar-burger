import { url } from "./constants";
import { fetchWithRefresh } from "./fetchWithRefresh";


const endpoint = '/auth/user';

const fullUrl = url + endpoint;


export const patchProfileRequest = (name, login, pass) => {
    return fetchWithRefresh(fullUrl, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': localStorage.getItem('accessToken')
        },
        body: JSON.stringify({ name: name, login: login, pass: pass })
      })
}
