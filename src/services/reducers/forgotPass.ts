import {
  POST_FORGOT_PASS_SUCCESS,
  POST_FORGOT_PASS_REQUEST,
  POST_FORGOT_PASS_FAILED,
} from "../actions/forgotPass";
import { TForgotPass } from "../../types/types";
import { TForgotPassActions } from "../actions/forgotPass";

type TForgotPassState = {
  dataForgotPass: TForgotPass | null;
  forgotPassRequest: boolean;
  forgotPassFailed: boolean;
}

const initialState: TForgotPassState = {
  dataForgotPass: null,
  forgotPassRequest: false,
  forgotPassFailed: false,
};

export const forgotPassReducer = (state = initialState, action: TForgotPassActions) => {
  switch (action.type) {
    case POST_FORGOT_PASS_REQUEST: {
      return {
        ...state,
        forgotPassRequest: true,
      };
    }
    case POST_FORGOT_PASS_SUCCESS: {
      return {
        ...state,
        dataForgotPass: action.dataForgotPass,
        forgotPassRequest: false,
      };
    }
    case POST_FORGOT_PASS_FAILED: {
      return {
        ...state,
        forgotPassFailed: true,
        forgotPassRequest: false,
        dataForgotPass: null,
      };
    }
    default: {
      return state;
    }
  }
};
