import { applyMiddleware, createStore, compose } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { rootReducer } from "./reducers/index";
import thunk from "redux-thunk";
import { socketMiddleware } from "./middleware/socketMiddleware";
import {
  FEED_CONNECT,
  FEED_DISCONNECT,
  FEED_WS_CLOSE,
  FEED_WS_CONNECTING,
  FEED_WS_ERROR,
  FEED_WS_MESSAGE,
  FEED_WS_OPEN,
} from "./actions/feed";

import {
  HISTORY_ORDERS_CONNECT,
  HISTORY_ORDERS_DISCONNECT,
  HISTORY_ORDERS_WS_CLOSE,
  HISTORY_ORDERS_WS_CONNECTING,
  HISTORY_ORDERS_WS_ERROR,
  HISTORY_ORDERS_WS_MESSAGE,
  HISTORY_ORDERS_WS_OPEN,
} from "./actions/historyOrders";

const feedMiddleware = socketMiddleware({
  wsConnect: FEED_CONNECT,
  wsDisconnect: FEED_DISCONNECT,
  wsConnecting: FEED_WS_CONNECTING,
  onOpen: FEED_WS_OPEN,
  onClose: FEED_WS_CLOSE,
  onError: FEED_WS_ERROR,
  onMessage: FEED_WS_MESSAGE,
});

const historyOrdersMiddleware = socketMiddleware({
  wsConnect: HISTORY_ORDERS_CONNECT,
  wsDisconnect: HISTORY_ORDERS_DISCONNECT,
  wsConnecting: HISTORY_ORDERS_WS_CONNECTING,
  onOpen: HISTORY_ORDERS_WS_OPEN,
  onClose: HISTORY_ORDERS_WS_CLOSE,
  onError: HISTORY_ORDERS_WS_ERROR,
  onMessage: HISTORY_ORDERS_WS_MESSAGE,
});

const enhancer = composeWithDevTools(
  applyMiddleware(thunk, feedMiddleware, historyOrdersMiddleware)
);

const store = createStore(rootReducer, enhancer);

export default store;
