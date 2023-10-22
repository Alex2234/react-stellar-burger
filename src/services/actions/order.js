import { fetchPostOrderRequest } from "../../utils/postOrder";

export const POST_ORDER_REQUEST = "POST_ORDER_REQUEST";
export const POST_ORDER_SUCCESS = "POST_ORDER_SUCCESS";
export const POST_ORDER_FAILED = "POST_ORDER_FAILED";

export const postOrder = (ingredients) => {
  return function (dispatch) {
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
