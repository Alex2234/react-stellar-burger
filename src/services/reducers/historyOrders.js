import { WebsocketStatus } from "../../utils/wsStatus";
import {
  HISTORY_ORDERS_WS_CLOSE,
  HISTORY_ORDERS_WS_CONNECTING,
  HISTORY_ORDERS_WS_ERROR,
  HISTORY_ORDERS_WS_MESSAGE,
  HISTORY_ORDERS_WS_OPEN,
} from "../actions/historyOrders";

const initialState = {
  status: WebsocketStatus.OFFLINE,
  orders: [],
  connectingError: "",
};

export const historyOrdersReducer = (state = initialState, action) => {
  switch (action.type) {
    case HISTORY_ORDERS_WS_CONNECTING:
      return {
        ...state,
        status: WebsocketStatus.CONNECTING,
      };

    case HISTORY_ORDERS_WS_OPEN:
      return {
        ...state,
        status: WebsocketStatus.ONLINE,
      };
    case HISTORY_ORDERS_WS_CLOSE:
      return {
        ...state,
        status: WebsocketStatus.OFFLINE,
      };
    case HISTORY_ORDERS_WS_ERROR:
      return {
        ...state,
        connectingError: action.payload,
      };
    case HISTORY_ORDERS_WS_MESSAGE:
      return {
        ...state,
        orders: action.payload.orders,
      };
    default:
      return state;
  }
};
