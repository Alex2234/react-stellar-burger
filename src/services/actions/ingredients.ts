import { fetchIngredientsRequest } from "../../utils/getIngredients";
import { TIngredient } from "../../types/types";
import { Dispatch } from "redux";

export const GET_INGREDIENTS_REQUEST: "GET_INGREDIENTS_REQUEST" =
  "GET_INGREDIENTS_REQUEST";
export const GET_INGREDIENTS_SUCCESS: "GET_INGREDIENTS_SUCCESS" =
  "GET_INGREDIENTS_SUCCESS";
export const GET_INGREDIENTS_FAILED: "GET_INGREDIENTS_FAILED" =
  "GET_INGREDIENTS_FAILED";

type GetIngredientsRequest = {
  type: typeof GET_INGREDIENTS_REQUEST;
};

type GetIngredientsSuccess = {
  type: typeof GET_INGREDIENTS_SUCCESS;
  ingredients: TIngredient[];
};

type GetIngredientsFailed = {
  type: typeof GET_INGREDIENTS_FAILED;
};

export type TIngredientsAction =
  | GetIngredientsRequest
  | GetIngredientsSuccess
  | GetIngredientsFailed;

export const getIngredients = () => {
  return function (dispatch: Dispatch<TIngredientsAction>) {
    dispatch({
      type: GET_INGREDIENTS_REQUEST,
    });
    fetchIngredientsRequest()
      .then((res) =>
        dispatch({
          type: GET_INGREDIENTS_SUCCESS,
          ingredients: res.data,
        })
      )
      .catch((err) => {
        dispatch({
          type: GET_INGREDIENTS_FAILED,
        });
      });
  };
};
