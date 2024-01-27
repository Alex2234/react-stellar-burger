import { fetchPostResetPassRequest } from "../../utils/postResetPass";
import { TResetPass } from "../../types/types";
import { Dispatch } from "redux";
import { RootState } from "../reducers";
import { ThunkAction } from "redux-thunk";

export const POST_RESET_PASS_REQUEST: "POST_RESET_PASS_REQUEST" =
  "POST_RESET_PASS_REQUEST";
export const POST_RESET_PASS_SUCCESS: "POST_RESET_PASS_SUCCESS" =
  "POST_RESET_PASS_SUCCESS";
export const POST_RESET_PASS_FAILED: "POST_RESET_PASS_FAILED" =
  "POST_RESET_PASS_FAILED";

type PostResetPassRequest = {
  type: typeof POST_RESET_PASS_REQUEST;
};

type PostResetPassSuccess = {
  type: typeof POST_RESET_PASS_SUCCESS;
  dataResetPass: TResetPass | null;
};

type PostResetPassFailed = {
  type: typeof POST_RESET_PASS_FAILED;
};

export type TResetPassActions =
  | PostResetPassRequest
  | PostResetPassSuccess
  | PostResetPassFailed;

type ThunkResult<R = void> = ThunkAction<
  R,
  RootState,
  undefined,
  TResetPassActions
>;

export const postResetPass = (pass: string, token: string): ThunkResult => {
  return function (dispatch: Dispatch<TResetPassActions>) {
    dispatch({
      type: POST_RESET_PASS_REQUEST,
    });
    fetchPostResetPassRequest(pass, token)
      .then((res) => {
        dispatch({
          type: POST_RESET_PASS_SUCCESS,
          dataResetPass: res,
        });
        localStorage.removeItem("Success");
      })
      .catch((err) => {
        dispatch({
          type: POST_RESET_PASS_FAILED,
          dataResetPass: err,
        });
      });
  };
};
