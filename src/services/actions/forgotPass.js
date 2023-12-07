import { fetchPostForgotPassRequest } from "../../utils/postForgotPass";

export const POST_FORGOT_PASS_REQUEST = "POST_FORGOT_PASS_REQUEST";
export const POST_FORGOT_PASS_SUCCESS = "POST_FORGOT_PASS_SUCCESS";
export const POST_FORGOT_PASS_FAILED = "POST_FORGOT_PASS_FAILED";

export const postForgotPass = (email) => {
  return function (dispatch) {
    dispatch({
      type: POST_FORGOT_PASS_REQUEST,
    });
    fetchPostForgotPassRequest(email)
      .then((res) =>
        dispatch({
          type: POST_FORGOT_PASS_SUCCESS,
          dataForgotPass: res,
        })
      )
      .catch((err) => {
        dispatch({
          type: POST_FORGOT_PASS_FAILED,
          dataForgotPass: err,
        });
      });
  };
};
