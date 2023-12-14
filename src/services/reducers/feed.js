import { WebsocketStatus } from "../../utils/wsStatus";
import {
  FEED_WS_CLOSE,
  FEED_WS_CONNECTING,
  FEED_WS_ERROR,
  FEED_WS_MESSAGE,
  FEED_WS_OPEN,
  GET_HTTPS_ORDER_REQUEST,
  GET_HTTPS_ORDER_SUCCESS,
  GET_HTTPS_ORDER_FAILED,
} from "../actions/feed";

const initialState = {
  status: WebsocketStatus.OFFLINE,
  orders: [],
  total: "",
  totalToday: "",
  connectingError: "",
  orderRequest: false,
  orderFailed: false,
  order: null,
};

export const feedReducer = (state = initialState, action) => {
  switch (action.type) {
    case FEED_WS_CONNECTING:
      return {
        ...state,
        status: WebsocketStatus.CONNECTING,
      };

    case FEED_WS_OPEN:
      return {
        ...state,
        status: WebsocketStatus.ONLINE,
      };
    case FEED_WS_CLOSE:
      return {
        ...state,
        status: WebsocketStatus.OFFLINE,
      };
    case FEED_WS_ERROR:
      return {
        ...state,
        connectingError: action.payload,
      };
    case FEED_WS_MESSAGE:
      return {
        ...state,
        orders: action.payload.orders,
        total: action.payload.total,
        totalToday: action.payload.totalToday,
      };
    case GET_HTTPS_ORDER_REQUEST: {
      return {
        ...state,
        orderRequest: true,
      };
    }
    case GET_HTTPS_ORDER_SUCCESS: {
      return {
        ...state,
        order: action.order,
        orderRequest: false,
      };
    }
    case GET_HTTPS_ORDER_FAILED: {
      return {
        ...state,
        orderFailed: true,
        orderRequest: false,
        order: null,
      };
    }
    default:
      return state;
  }
};
