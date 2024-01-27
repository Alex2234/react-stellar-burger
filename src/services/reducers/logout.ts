import {
    POST_LOGOUT_REQUEST,
    POST_LOGOUT_SUCCESS,
    POST_LOGOUT_FAILED,
  } from "../actions/logout";
  import { TLogout } from "../../types/types";
  import { TLogoutActions } from "../actions/logout";

  type TLogoutState = {
    logout: TLogout| null;
    logoutRequest: boolean;
    logoutFailed: boolean;
  }
  
  const initialState: TLogoutState = {
    logout: null,
    logoutRequest: false,
    logoutFailed: false,
  };
  
  export const logoutReducer = (state = initialState, action: TLogoutActions) => {
    switch (action.type) {
      case POST_LOGOUT_REQUEST: {
        return {
          ...state,
          logoutRequest: true,
        };
      }
      case POST_LOGOUT_SUCCESS: {
        return {
          ...state,
          logout: action.logout,
          logoutRequest: false,
        };
      }
      case POST_LOGOUT_FAILED: {
        return {
          ...state,
          logoutFailed: true,
          logoutRequest: false,
          logout: null,
        };
      }
      default: {
        return state;
      }
    }
  };