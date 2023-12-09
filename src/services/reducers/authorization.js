import {
  POST_AUTHORIZATION_REQUEST,
  POST_AUTHORIZATION_SUCCESS,
  POST_AUTHORIZATION_FAILED,
} from "../actions/authorization";

const initialState = {
  dataAuthorization: null,
  authorizationRequest: false,
  authorizationFailed: false,
};

export const authorizationReducer = (state = initialState, action) => {
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
