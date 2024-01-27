import { getProfileRequest } from "../../utils/getProfile";
import { patchProfileRequest } from "../../utils/patchProfile";
import { TUser, TProfile } from "../../types/types";
import { Dispatch } from "redux";
import { ThunkDispatch } from 'redux-thunk';
import { RootState } from "../reducers";

export const GET_PROFILE_REQUEST: "GET_PROFILE_REQUEST" = "GET_PROFILE_REQUEST";
export const GET_PROFILE_FAILED: "GET_PROFILE_FAILED" = "GET_PROFILE_FAILED";
export const SET_AUTH_CHECKED: "SET_AUTH_CHECKED" = "SET_AUTH_CHECKED";
export const SET_USER: "SET_USER" = "SET_USER";
export const PATCH_PROFILE_REQUEST: "PATCH_PROFILE_REQUEST" =
  "PATCH_PROFILE_REQUEST";
export const PATCH_PROFILE_SUCCESS: "PATCH_PROFILE_SUCCESS" =
  "PATCH_PROFILE_SUCCESS";
export const PATCH_PROFILE_FAILED: "PATCH_PROFILE_FAILED" =
  "PATCH_PROFILE_FAILED";

type GetProfileRequest = {
  type: typeof GET_PROFILE_REQUEST;
};

type GetProfileFailed = {
  type: typeof GET_PROFILE_FAILED;
};

type SetAuthChecked = {
  type: typeof SET_AUTH_CHECKED;
  payload: boolean;
};

type SetUser = {
  type: typeof SET_USER;
  user: TUser | null;
};

type PatchProfileRequest = {
  type: typeof PATCH_PROFILE_REQUEST;
};

type PatchProfileSuccess = {
  type: typeof PATCH_PROFILE_SUCCESS;
  dataProfile: TProfile;
};

type PatchProfileFailed = {
  type: typeof PATCH_PROFILE_FAILED;
};

export type TProfileActions =
  | GetProfileRequest
  | GetProfileFailed
  | SetAuthChecked
  | SetUser
  | PatchProfileRequest
  | PatchProfileSuccess
  | PatchProfileFailed;

export const setAuthChecked = (value: boolean): SetAuthChecked => ({
  type: SET_AUTH_CHECKED,
  payload: value,
});

export const setUser = (user: TUser | null): SetUser => ({
  type: SET_USER,
  user: user,
});

export const getProfile = () => {
  return function (dispatch: Dispatch<TProfileActions>) {
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
  return (dispatch: ThunkDispatch<RootState, undefined, TProfileActions>) => {
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

export const patchProfile = (name: string, login: string, pass: string) => {
  return function (dispatch: Dispatch<TProfileActions>) {
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
