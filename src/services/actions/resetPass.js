import { fetchPostResetPassRequest } from "../../utils/postResetPass";

export const POST_RESET_PASS_REQUEST = "POST_RESET_PASS_REQUEST";
export const POST_RESET_PASS_SUCCESS = "POST_RESET_PASS_SUCCESS";
export const POST_RESET_PASS_FAILED = "POST_RESET_PASS_FAILED";

export const postResetPass = (pass, token) => {
  return function (dispatch) {
    dispatch({
      type: POST_RESET_PASS_REQUEST,
    });
    fetchPostResetPassRequest(pass, token)
      .then((res) =>
        dispatch({
          type: POST_RESET_PASS_SUCCESS,
          dataResetPass: res,
        })
      )
      .catch((err) => {
        dispatch({
          type: POST_RESET_PASS_FAILED,
          dataResetPass: err,
        });
      });
  };
};
