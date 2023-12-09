import { combineReducers } from "redux";
import { ingredientsReducer } from "./ingredients";
import { burgerConstructorReducer } from "./burgerConstructor";
import { ingredientDetailReducer } from "./ingredientDetail";
import { orderReducer } from "./order";
import { authorizationReducer } from "./authorization";
import { registrationReducer } from "./registration";
import { forgotPassReducer } from "./forgotPass";
import { resetPassReducer } from "./resetPass";
import { profileReducer } from "./profile";
import { logoutReducer } from "./logout";

export const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  burgerConstructor: burgerConstructorReducer,
  ingredientDetail: ingredientDetailReducer,
  order: orderReducer,
  authorization: authorizationReducer,
  registration: registrationReducer,
  forgotPass: forgotPassReducer,
  resetPass: resetPassReducer,
  profile: profileReducer,
  logout: logoutReducer
});
