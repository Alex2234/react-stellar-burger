import { fetchPostLogoutRequest } from "../../utils/postLogout";

export const POST_LOGOUT_REQUEST = "POST_LOGOUT_REQUEST";
export const POST_LOGOUT_SUCCESS = "POST_LOGOUT_SUCCESS";
export const POST_LOGOUT_FAILED = "POST_LOGOUT_FAILED";


export const postLogout = () => {
    return function (dispatch) {
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
          })
        }
        )
        .catch((err) => {
          dispatch({
            type: POST_LOGOUT_FAILED,
            logout: err,
          });
        });
    };
  };