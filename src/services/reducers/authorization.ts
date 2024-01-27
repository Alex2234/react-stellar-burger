import {
  POST_AUTHORIZATION_REQUEST,
  POST_AUTHORIZATION_SUCCESS,
  POST_AUTHORIZATION_FAILED,
} from "../actions/authorization";
import { TAuthorizationActions } from "../actions/authorization";
import { TAuthorization } from "../../types/types";

type TAuthorizationState = {
  dataAuthorization: TAuthorization | null;
  authorizationRequest: boolean;
  authorizationFailed: boolean;
}

const initialState: TAuthorizationState = {
  dataAuthorization: null,
  authorizationRequest: false,
  authorizationFailed: false,
};

export const authorizationReducer = (state = initialState, action: TAuthorizationActions) => {
  switch (action.type) {
    case POST_AUTHORIZATION_REQUEST: {
      return {
        ...state,
        authorizationRequest: true,
      };
    }
    case POST_AUTHORIZATION_SUCCESS: {
      return {
        ...state,
        dataAuthorization: action.dataAuthorization,
        authorizationRequest: false,
      };
    }
    case POST_AUTHORIZATION_FAILED: {
      return {
        ...state,
        authorizationFailed: true,
        authorizationRequest: false,
        dataAuthorization: null,
      };
    }
    default: {
      return state;
    }
  }
};
