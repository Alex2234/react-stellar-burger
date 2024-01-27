import { TOrder } from "../../types/types";

export const HISTORY_ORDERS_CONNECT: "HISTORY_ORDERS_CONNECT" =
  "HISTORY_ORDERS_CONNECT";
export const HISTORY_ORDERS_DISCONNECT: "HISTORY_ORDERS_DISCONNECT" =
  "HISTORY_ORDERS_DISCONNECT";

export const HISTORY_ORDERS_WS_CONNECTING: "HISTORY_ORDERS_WS_CONNECTING" =
  "HISTORY_ORDERS_WS_CONNECTING";
export const HISTORY_ORDERS_WS_OPEN: "HISTORY_ORDERS_WS_OPEN" =
  "HISTORY_ORDERS_WS_OPEN";
export const HISTORY_ORDERS_WS_CLOSE: "HISTORY_ORDERS_WS_CLOSE" =
  "HISTORY_ORDERS_WS_CLOSE";
export const HISTORY_ORDERS_WS_MESSAGE: "HISTORY_ORDERS_WS_MESSAGE" =
  "HISTORY_ORDERS_WS_MESSAGE";
export const HISTORY_ORDERS_WS_ERROR: "HISTORY_ORDERS_WS_ERROR" =
  "HISTORY_ORDERS_WS_ERROR";

type HistoryOrdersConnect = {
  type: typeof HISTORY_ORDERS_CONNECT;
  payload: string;
};

type HistoryOrdersDisconnect = {
  type: typeof HISTORY_ORDERS_DISCONNECT;
};

type HistoryOrdersWsConnecting = {
  type: typeof HISTORY_ORDERS_WS_CONNECTING;
};

type HistoryOrdersWsOpen = {
  type: typeof HISTORY_ORDERS_WS_OPEN;
};

type HistoryOrdersWsClose = {
  type: typeof HISTORY_ORDERS_WS_CLOSE;
};

type HistoryOrdersWsMessage = {
  type: typeof HISTORY_ORDERS_WS_MESSAGE;
  payload: {
    orders: TOrder[];
  };
};

type HistoryOrdersWsError = {
  type: typeof HISTORY_ORDERS_WS_ERROR;
  payload: string;
};

export type THistoryOrdersActions =
  | HistoryOrdersConnect
  | HistoryOrdersDisconnect
  | HistoryOrdersWsConnecting
  | HistoryOrdersWsOpen
  | HistoryOrdersWsClose
  | HistoryOrdersWsMessage
  | HistoryOrdersWsError;

export const connect = (url: string) => ({
  type: HISTORY_ORDERS_CONNECT,
  payload: url,
});

export const disconnect = () => ({
  type: HISTORY_ORDERS_DISCONNECT,
});
