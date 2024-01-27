import { fetchPostAuthorizationRequest } from "../../utils/postAuthorization";
import { setAuthChecked, setUser } from "./profile";
import { TAuthorization } from "../../types/types";
import { Dispatch } from "redux";
import { TProfileActions } from "./profile";

export const POST_AUTHORIZATION_REQUEST: "POST_AUTHORIZATION_REQUEST" =
  "POST_AUTHORIZATION_REQUEST";
export const POST_AUTHORIZATION_SUCCESS: "POST_AUTHORIZATION_SUCCESS" =
  "POST_AUTHORIZATION_SUCCESS";
export const POST_AUTHORIZATION_FAILED: "POST_AUTHORIZATION_FAILED" =
  "POST_AUTHORIZATION_FAILED";

type PostAuthRequest = {
  type: typeof POST_AUTHORIZATION_REQUEST;
};

type PostAuthSuccess = {
  type: typeof POST_AUTHORIZATION_SUCCESS;
  dataAuthorization: TAuthorization | null;
};

type PostAuthFailed = {
  type: typeof POST_AUTHORIZATION_FAILED;
};

export type TAuthorizationActions =
  | PostAuthRequest
  | PostAuthSuccess
  | PostAuthFailed;


  type TCombinedActions = TAuthorizationActions | TProfileActions;

export const postAuthorization = (email: string, password: string) => {
  return function (dispatch: Dispatch<TCombinedActions>) {
    dispatch({
      type: POST_AUTHORIZATION_REQUEST,
    });
    fetchPostAuthorizationRequest(email, password)
      .then((res) => {
        localStorage.setItem("accessToken", res.accessToken);
        localStorage.setItem("refreshToken", res.refreshToken);
        dispatch({
          type: POST_AUTHORIZATION_SUCCESS,
          dataAuthorization: res,
        });
        dispatch(setAuthChecked(true));
        dispatch(setUser(res.user));
      })
      .catch((err) => {
        dispatch({
          type: POST_AUTHORIZATION_FAILED,
          dataAuthorization: err,
        });
      });
  };
};
