import { fetchPostRegistrationRequest } from "../../utils/postRegistration";
import { TRegistration } from "../../types/types";
import { Dispatch } from "redux";
import { RootState } from "../reducers";
import { ThunkAction } from "redux-thunk";

export const POST_REGISTRATION_REQUEST: "POST_REGISTRATION_REQUEST" =
  "POST_REGISTRATION_REQUEST";
export const POST_REGISTRATION_SUCCESS: "POST_REGISTRATION_SUCCESS" =
  "POST_REGISTRATION_SUCCESS";
export const POST_REGISTRATION_FAILED: "POST_REGISTRATION_FAILED" =
  "POST_REGISTRATION_FAILED";

type PostRegistrationRequest = {
  type: typeof POST_REGISTRATION_REQUEST;
};

type PostRegistrationSuccess = {
  type: typeof POST_REGISTRATION_SUCCESS;
  dataRegistration: TRegistration | null;
};

type PostRegistrationFailed = {
  type: typeof POST_REGISTRATION_FAILED;
};

export type TRegistrationActions =
  | PostRegistrationRequest
  | PostRegistrationSuccess
  | PostRegistrationFailed;

type ThunkResult<R = void> = ThunkAction<
  R,
  RootState,
  undefined,
  TRegistrationActions
>;

export const postRegistration = (
  name: string,
  email: string,
  password: string
): ThunkResult => {
  return function (dispatch: Dispatch<TRegistrationActions>) {
    dispatch({
      type: POST_REGISTRATION_REQUEST,
    });
    fetchPostRegistrationRequest(name, email, password)
      .then((res) =>
        dispatch({
          type: POST_REGISTRATION_SUCCESS,
          dataRegistration: res,
        })
      )
      .catch((err) => {
        dispatch({
          type: POST_REGISTRATION_FAILED,
          dataRegistration: err,
        });
      });
  };
};
