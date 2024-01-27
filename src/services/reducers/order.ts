import {
  POST_ORDER_REQUEST,
  POST_ORDER_SUCCESS,
  POST_ORDER_FAILED,
} from "../actions/order";
import { TPostOrderActions } from "../actions/order";

type TOrderState = {
  orderId: number | null;
  orderRequest: boolean;
  orderFailed: boolean;
}

const initialState: TOrderState = {
  orderId: null,
  orderRequest: false,
  orderFailed: false,
};

export const orderReducer = (state = initialState, action: TPostOrderActions) => {
  switch (action.type) {
    case POST_ORDER_REQUEST: {
      return {
        ...state,
        orderRequest: true,
      };
    }
    case POST_ORDER_SUCCESS: {
      return {
        ...state,
        orderId: action.orderId,
        orderRequest: false,
      };
    }
    case POST_ORDER_FAILED: {
      return {
        ...state,
        orderFailed: true,
        orderRequest: false,
        orderId: null,
      };
    }
    default: {
      return state;
    }
  }
};
