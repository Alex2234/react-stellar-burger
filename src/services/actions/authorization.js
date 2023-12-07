import { fetchPostAuthorizationRequest } from "../../utils/postAuthorization";

export const POST_AUTHORIZATION_REQUEST = "POST_AUTHORIZATION_REQUEST";
export const POST_AUTHORIZATION_SUCCESS = "POST_AUTHORIZATION_SUCCESS";
export const POST_AUTHORIZATION_FAILED = "POST_AUTHORIZATION_FAILED";

export const postAuthorization = (email, password) => {
  return function (dispatch) {
    dispatch({
      type: POST_AUTHORIZATION_REQUEST,
    });
    fetchPostAuthorizationRequest(email, password)
      .then((res) =>
        dispatch({
          type: POST_AUTHORIZATION_SUCCESS,
          dataAuthorization: res,
        })
      )
      .catch((err) => {
        dispatch({
          type: POST_AUTHORIZATION_FAILED,
          dataAuthorization: err,
        });
      });
  };
};
