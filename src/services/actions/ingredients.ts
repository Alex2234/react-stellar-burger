import { fetchIngredientsRequest } from "../../utils/getIngredients";
import { TIngredient } from "../../types/types";
import { Dispatch, Action } from "redux";
import { RootState } from "../reducers";
import { ThunkAction } from "redux-thunk";

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

export type TIngredientsActions =
  | GetIngredientsRequest
  | GetIngredientsSuccess
  | GetIngredientsFailed;

  type ThunkResult<R = void> = ThunkAction<
  R,
  RootState,
  undefined,
  TIngredientsActions
>;

export const getIngredients = (): ThunkResult => {
  return function (dispatch: Dispatch<TIngredientsActions>) {
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
