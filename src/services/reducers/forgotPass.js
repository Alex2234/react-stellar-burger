import {
  POST_FORGOT_PASS_SUCCESS,
  POST_FORGOT_PASS_REQUEST,
  POST_FORGOT_PASS_FAILED,
} from "../actions/forgotPass";

const initialState = {
  dataForgotPass: null,
  forgotPassRequest: false,
  forgotPassFailed: false,
};

export const forgotPassReducer = (state = initialState, action) => {
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
