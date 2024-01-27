import { refreshToken } from "./refreshToken";
import { checkResponse } from "./checkResponse";

export const fetchWithRefresh = async (
  url: string,
  options?: RequestInit
): Promise<any> => {
  try {
    const res = await fetch(url, options);
    return await checkResponse(res);
  } catch (err: any) {
    if (err.message === "jwt expired") {
      const refreshData = await refreshToken();
      if (!refreshData.success) {
        return Promise.reject(refreshData);
      }
      localStorage.setItem("refreshToken", refreshData.refreshToken);
      localStorage.setItem("accessToken", refreshData.accessToken);
      options = {
        ...options,
        headers: {
          ...options?.headers,
          Authorization: `Bearer ${refreshData.accessToken}`,
        },
      };
      const res = await fetch(url, options);
      return await checkResponse(res);
    } else {
      return Promise.reject(err);
    }
  }
};
