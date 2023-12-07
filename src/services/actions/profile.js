import { getProfileRequest } from "../../utils/getProfile";
import { patchProfileRequest } from "../../utils/patchProfile";

export const GET_PROFILE_REQUEST = "GET_PROFILE_REQUEST";
export const GET_PROFILE_FAILED = "GET_PROFILE_FAILED";
export const SET_AUTH_CHECKED = "SET_AUTH_CHECKED";
export const SET_USER = "SET_USER";
export const PATCH_PROFILE_REQUEST = "PATCH_PROFILE_REQUEST";
export const PATCH_PROFILE_SUCCESS = "PATCH_PROFILE_SUCCESS";
export const PATCH_PROFILE_FAILED = "PATCH_PROFILE_FAILED";

export const setAuthChecked = (value) => ({
  type: SET_AUTH_CHECKED,
  payload: value,
});

export const setUser = (user) => ({
  type: SET_USER,
  user: user,
});

export const getProfile = () => {
  return function (dispatch) {
    dispatch({ type: GET_PROFILE_REQUEST });
    return getProfileRequest()
      .then((res) => {
        dispatch(setUser(res.user));
      })
      .catch((err) => {
        dispatch({ type: GET_PROFILE_FAILED });
      });
  };
};

export const checkUserAuth = () => {
  return (dispatch) => {
    if (localStorage.getItem("accessToken")) {
      dispatch(getProfile())
        .catch(() => {
          localStorage.removeItem("accessToken");
          localStorage.removeItem("refreshToken");
          dispatch(setUser(null));
        })
        .finally(() => dispatch(setAuthChecked(true)));
    } else {
      dispatch(setAuthChecked(true));
    }
  };
};

export const patchProfile = (name, login, pass) => {
  return function (dispatch) {
    dispatch({
      type: PATCH_PROFILE_REQUEST,
    });
    patchProfileRequest(name, login, pass)
      .then((res) =>
        dispatch({
          type: PATCH_PROFILE_SUCCESS,
          dataProfile: res,
        })
      )
      .catch((err) => {
        dispatch({
          type: PATCH_PROFILE_FAILED,
          dataProfile: err,
        });
      });
  };
};
