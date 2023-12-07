import { fetchPostRegistrationRequest } from "../../utils/postRegistration";

export const POST_REGISTRATION_REQUEST = "POST_REGISTRATION_REQUEST";
export const POST_REGISTRATION_SUCCESS = "POST_REGISTRATION_SUCCESS";
export const POST_REGISTRATION_FAILED = "POST_REGISTRATION_FAILED";

export const postRegistration = (name, email, password) => {
  return function (dispatch) {
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
