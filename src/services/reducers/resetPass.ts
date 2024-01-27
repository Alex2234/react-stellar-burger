import {
  POST_RESET_PASS_SUCCESS,
  POST_RESET_PASS_REQUEST,
  POST_RESET_PASS_FAILED,
} from "../actions/resetPass";
import { TResetPass } from "../../types/types";
import { TResetPassActions } from "../actions/resetPass";

type TResetPassState = {
  dataResetPass: TResetPass | null;
  resetPassRequest: boolean;
  resetPassFailed: boolean;
};

const initialState: TResetPassState = {
  dataResetPass: null,
  resetPassRequest: false,
  resetPassFailed: false,
};

export const resetPassReducer = (
  state = initialState,
  action: TResetPassActions
) => {
  switch (action.type) {
    case POST_RESET_PASS_REQUEST: {
      return {
        ...state,
        resetPassRequest: true,
      };
    }
    case POST_RESET_PASS_SUCCESS: {
      return {
        ...state,
        dataResetPass: action.dataResetPass,
        resetPassRequest: false,
      };
    }
    case POST_RESET_PASS_FAILED: {
      return {
        ...state,
        resetPassFailed: true,
        resetPassRequest: false,
        dataResetPass: null,
      };
    }
    default: {
      return state;
    }
  }
};
