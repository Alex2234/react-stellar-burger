import { fetchPostLogoutRequest } from "../../utils/postLogout";
import { TLogout } from "../../types/types";
import { Dispatch } from "redux";
import { RootState } from "../reducers";
import { ThunkAction } from "redux-thunk";

export const POST_LOGOUT_REQUEST: "POST_LOGOUT_REQUEST" = "POST_LOGOUT_REQUEST";
export const POST_LOGOUT_SUCCESS: "POST_LOGOUT_SUCCESS" = "POST_LOGOUT_SUCCESS";
export const POST_LOGOUT_FAILED: "POST_LOGOUT_FAILED" = "POST_LOGOUT_FAILED";

type PostLogoutRequest = {
  type: typeof POST_LOGOUT_REQUEST;
};

type PostLogoutSuccess = {
  type: typeof POST_LOGOUT_SUCCESS;
  logout: TLogout | null;
};

type PostLogoutFailed = {
  type: typeof POST_LOGOUT_FAILED;
};

export type TLogoutActions =
  | PostLogoutRequest
  | PostLogoutSuccess
  | PostLogoutFailed;

  type ThunkResult<R = void> = ThunkAction<
  R,
  RootState,
  undefined,
  TLogoutActions
>;

export const postLogout = (): ThunkResult => {
  return function (dispatch: Dispatch<TLogoutActions>) {
    dispatch({
      type: POST_LOGOUT_REQUEST,
    });
    fetchPostLogoutRequest()
      .then((res) => {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        dispatch({
          type: POST_LOGOUT_SUCCESS,
          logout: res,
        });
      })
      .catch((err) => {
        dispatch({
          type: POST_LOGOUT_FAILED,
          logout: err,
        });
      });
  };
};