import { fetchPostForgotPassRequest } from "../../utils/postForgotPass";
import { Dispatch } from "redux";
import { TForgotPass } from "../../types/types";

export const POST_FORGOT_PASS_REQUEST: "POST_FORGOT_PASS_REQUEST" =
  "POST_FORGOT_PASS_REQUEST";
export const POST_FORGOT_PASS_SUCCESS: "POST_FORGOT_PASS_SUCCESS" =
  "POST_FORGOT_PASS_SUCCESS";
export const POST_FORGOT_PASS_FAILED: "POST_FORGOT_PASS_FAILED" =
  "POST_FORGOT_PASS_FAILED";

type PostForgotPassRequest = {
  type: typeof POST_FORGOT_PASS_REQUEST;
};

type PostForgotPassSuccess = {
  type: typeof POST_FORGOT_PASS_SUCCESS;
  dataForgotPass: TForgotPass | null;
};

type PostForgotPassFailed = {
  type: typeof POST_FORGOT_PASS_FAILED;
};

export type TForgotPassActions =
  | PostForgotPassRequest
  | PostForgotPassSuccess
  | PostForgotPassFailed;

export const postForgotPass = (email: string) => {
  return function (dispatch: Dispatch<TForgotPassActions>) {
    dispatch({
      type: POST_FORGOT_PASS_REQUEST,
    });
    fetchPostForgotPassRequest(email)
      .then((res) => {
        localStorage.setItem("Success", res.success);
        dispatch({
          type: POST_FORGOT_PASS_SUCCESS,
          dataForgotPass: res,
        });
      })
      .catch((err) => {
        dispatch({
          type: POST_FORGOT_PASS_FAILED,
          dataForgotPass: err,
        });
      });
  };
};
