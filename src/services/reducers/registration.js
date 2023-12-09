import {
  POST_REGISTRATION_REQUEST,
  POST_REGISTRATION_SUCCESS,
  POST_REGISTRATION_FAILED,
} from "../actions/registration";

const initialState = {
  dataRegistration: null,
  registrationRequest: false,
  registrationFailed: false,
};

export const registrationReducer = (state = initialState, action) => {
  switch (action.type) {
    case POST_REGISTRATION_REQUEST: {
      return {
        ...state,
        registrationRequest: true,
      };
    }
    case POST_REGISTRATION_SUCCESS: {
      return {
        ...state,
        dataRegistration: action.dataRegistration,
        registrationRequest: false,
      };
    }
    case POST_REGISTRATION_FAILED: {
      return {
        ...state,
        registrationFailed: true,
        registrationRequest: false,
        dataRegistration: null,
      };
    }
    default: {
      return state;
    }
  }
};
