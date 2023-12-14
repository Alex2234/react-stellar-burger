import { fetchHttpsOrderRequest } from "../../utils/httpsGetOrder";

export const GET_HTTPS_ORDER_REQUEST = "GET_HTTPS_ORDER_REQUEST";
export const GET_HTTPS_ORDER_SUCCESS = "GET_HTTPS_ORDER_SUCCESS";
export const GET_HTTPS_ORDER_FAILED = "GET_HTTPS_ORDER_FAILED";

export const FEED_CONNECT = "FEED_CONNECT";
export const FEED_DISCONNECT = "FEED_DISCONNECT";

export const FEED_WS_CONNECTING = "FEED_WS_CONNECTING";
export const FEED_WS_OPEN = "FEED_WS_OPEN";
export const FEED_WS_CLOSE = "FEED_WS_CLOSE";
export const FEED_WS_MESSAGE = "FEED_WS_MESSAGE";
export const FEED_WS_ERROR = "FEED_WS_ERROR";


export const connect = (url) => ({
    type: FEED_CONNECT,
    payload: url
})

export const disconnect = () => ({
    type: FEED_DISCONNECT
})


export const getHttpsOrder = (number) => {
    return function (dispatch) {
      dispatch({
        type: GET_HTTPS_ORDER_REQUEST,
      });
      fetchHttpsOrderRequest(number)
        .then((res) =>
          dispatch({
            type: GET_HTTPS_ORDER_SUCCESS,
            order: res.orders[0],
          })
        )
        .catch((err) => {
          dispatch({
            type: GET_HTTPS_ORDER_FAILED,
          });
        });
    };
  };