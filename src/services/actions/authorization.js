import { fetchPostAuthorizationRequest } from "../../utils/postAuthorization";
import { setAuthChecked, setUser } from "./profile";

export const POST_AUTHORIZATION_REQUEST = "POST_AUTHORIZATION_REQUEST";
export const POST_AUTHORIZATION_SUCCESS = "POST_AUTHORIZATION_SUCCESS";
export const POST_AUTHORIZATION_FAILED = "POST_AUTHORIZATION_FAILED";

export const postAuthorization = (email, password) => {
  return function (dispatch) {
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
        dispatch(setUser(res.user))
      })
      .catch((err) => {
        dispatch({
          type: POST_AUTHORIZATION_FAILED,
          dataAuthorization: err,
        });
      });
  };
};
