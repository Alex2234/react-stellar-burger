import { fetchPostOrderRequest } from "../../utils/postOrder";
import { TIngredient } from "../../types/types";
import { Dispatch } from "redux";
import { RootState } from "../reducers";
import { ThunkAction } from "redux-thunk";

export const POST_ORDER_REQUEST: "POST_ORDER_REQUEST" = "POST_ORDER_REQUEST";
export const POST_ORDER_SUCCESS: "POST_ORDER_SUCCESS" = "POST_ORDER_SUCCESS";
export const POST_ORDER_FAILED: "POST_ORDER_FAILED" = "POST_ORDER_FAILED";

type PostOrderRequest = {
  type: typeof POST_ORDER_REQUEST;
};

type PostOrderSuccess = {
  type: typeof POST_ORDER_SUCCESS;
  orderId: number;
};

type PostOrderFailed = {
  type: typeof POST_ORDER_FAILED;
};

export type TPostOrderActions =
  | PostOrderRequest
  | PostOrderSuccess
  | PostOrderFailed;

type ThunkResult<R = void> = ThunkAction<
  R,
  RootState,
  undefined,
  TPostOrderActions
>;

export const postOrder = (ingredients: TIngredient[]): ThunkResult => {
  return function (dispatch: Dispatch<TPostOrderActions>) {
    dispatch({
      type: POST_ORDER_REQUEST,
    });
    fetchPostOrderRequest(ingredients)
      .then((res) =>
        dispatch({
          type: POST_ORDER_SUCCESS,
          orderId: res.order.number,
        })
      )
      .catch((err) => {
        dispatch({
          type: POST_ORDER_FAILED,
        });
      });
  };
};
