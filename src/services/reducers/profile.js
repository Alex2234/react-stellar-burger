import {
    GET_PROFILE_REQUEST,
    GET_PROFILE_FAILED,
    SET_AUTH_CHECKED,
    SET_USER,
    PATCH_PROFILE_REQUEST,
    PATCH_PROFILE_SUCCESS,
    PATCH_PROFILE_FAILED
  } from "../actions/profile";
  
  const initialState = {
    user: null,
    dataProfile: null,
    profileRequest: false,
    profileFailed: false,
    isAuthChecked: false
  };


  export const profileReducer = (state = initialState, action) => {
    switch (action.type) {
      case GET_PROFILE_REQUEST: {
        return {
          ...state,
          profileRequest: true,
        };
      }
      case SET_AUTH_CHECKED: {
        return {
          ...state,
          isAuthChecked: action.payload
        }
      }
      case SET_USER: {
        return {
          ...state,
          user: action.user,
          profileRequest: false,
        };
      }
    
      case GET_PROFILE_FAILED: {
        return {
          ...state,
          profileFailed: true,
          profileRequest: false,
          user: null
        };
      }
      case PATCH_PROFILE_REQUEST: {
        return {
          ...state,
          profileRequest: true,
          dataProfile: null
        };
      }
      case PATCH_PROFILE_SUCCESS: {
        return {
          ...state,
          profileRequest: false,
          dataProfile: action.dataProfile
        };
      }
      case PATCH_PROFILE_FAILED: {
        return {
          ...state,
          profileFailed: true,
          profileRequest: false,
          dataProfile: null
        };
      }
      default: {
        return state;
      }
    }
  };
  