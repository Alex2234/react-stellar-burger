import { url } from "./constants";
import { fetchWithRefresh } from "./fetchWithRefresh";
import { TIngredient } from "../types/types";

const endpoint = "/orders";

const fullUrl = url + endpoint;

export const fetchPostOrderRequest = (ingredients: TIngredient[]) => {
  const accessToken = localStorage.getItem("accessToken") || "";
  return fetchWithRefresh(fullUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: accessToken,
    },
    body: JSON.stringify({ ingredients: ingredients }),
  });
};
