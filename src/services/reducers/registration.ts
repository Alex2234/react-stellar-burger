import {
  POST_REGISTRATION_REQUEST,
  POST_REGISTRATION_SUCCESS,
  POST_REGISTRATION_FAILED,
} from "../actions/registration";
import { TRegistration } from "../../types/types";
import { TRegistrationActions } from "../actions/registration";

type TRegistrationState = {
  dataRegistration: TRegistration | null;
  registrationRequest: boolean;
  registrationFailed: boolean;
}

const initialState: TRegistrationState = {
  dataRegistration: null,
  registrationRequest: false,
  registrationFailed: false,
};

export const registrationReducer = (state = initialState, action: TRegistrationActions) => {
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
