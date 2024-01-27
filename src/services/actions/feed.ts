import { fetchHttpsOrderRequest } from "../../utils/httpsGetOrder";
import { TOrder } from "../../types/types";
import { Dispatch } from "redux";
import { RootState } from "../reducers";
import { ThunkAction } from "redux-thunk";

export const GET_HTTPS_ORDER_REQUEST: "GET_HTTPS_ORDER_REQUEST" =
  "GET_HTTPS_ORDER_REQUEST";
export const GET_HTTPS_ORDER_SUCCESS: "GET_HTTPS_ORDER_SUCCESS" =
  "GET_HTTPS_ORDER_SUCCESS";
export const GET_HTTPS_ORDER_FAILED: "GET_HTTPS_ORDER_FAILED" =
  "GET_HTTPS_ORDER_FAILED";

export const FEED_CONNECT: "FEED_CONNECT" = "FEED_CONNECT";
export const FEED_DISCONNECT: "FEED_DISCONNECT" = "FEED_DISCONNECT";

export const FEED_WS_CONNECTING: "FEED_WS_CONNECTING" = "FEED_WS_CONNECTING";
export const FEED_WS_OPEN: "FEED_WS_OPEN" = "FEED_WS_OPEN";
export const FEED_WS_CLOSE: "FEED_WS_CLOSE" = "FEED_WS_CLOSE";
export const FEED_WS_MESSAGE: "FEED_WS_MESSAGE" = "FEED_WS_MESSAGE";
export const FEED_WS_ERROR: "FEED_WS_ERROR" = "FEED_WS_ERROR";

type FeedConnect = {
  type: typeof FEED_CONNECT;
  payload: string;
};

type FeedDisconnect = {
  type: typeof FEED_DISCONNECT;
};

type FeedWsConnecting = {
  type: typeof FEED_WS_CONNECTING;
};

type FeedWsOpen = {
  type: typeof FEED_WS_OPEN;
};

type FeedWsClose = {
  type: typeof FEED_WS_CLOSE;
};

type FeedWsMessage = {
  type: typeof FEED_WS_MESSAGE;
  payload: {
    orders: TOrder[];
    total: string;
    totalToday: string;
  };
};

type FeedWsError = {
  type: typeof FEED_WS_ERROR;
  payload: string;
};

type GetHttpsOrderRequest = {
  type: typeof GET_HTTPS_ORDER_REQUEST;
};

type GetHttpsOrderSuccess = {
  type: typeof GET_HTTPS_ORDER_SUCCESS;
  order: TOrder[];
};

type GetHttpsOrderFailed = {
  type: typeof GET_HTTPS_ORDER_FAILED;
};

export type TFeedActions =
  | FeedConnect
  | FeedDisconnect
  | FeedWsConnecting
  | FeedWsOpen
  | FeedWsClose
  | FeedWsMessage
  | FeedWsError
  | GetHttpsOrderRequest
  | GetHttpsOrderSuccess
  | GetHttpsOrderFailed;

type ThunkResult<R = void> = ThunkAction<
  R,
  RootState,
  undefined,
  TFeedActions
>;

export const connect = (url: string) => ({
  type: FEED_CONNECT,
  payload: url,
});

export const disconnect = () => ({
  type: FEED_DISCONNECT,
});

export const getHttpsOrder = (number: number): ThunkResult => {
  return function (dispatch: Dispatch<TFeedActions>) {
    dispatch({
      type: GET_HTTPS_ORDER_REQUEST,
    });
    fetchHttpsOrderRequest(number)
      .then((res) =>
        dispatch({
          type: GET_HTTPS_ORDER_SUCCESS,
          order: res.orders,
        })
      )
      .catch((err) => {
        dispatch({
          type: GET_HTTPS_ORDER_FAILED,
        });
      });
  };
};
