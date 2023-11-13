import { combineReducers } from "redux";
import { ingredientsReducer } from "./ingredients";
import { burgerConstructorReducer } from "./burgerConstructor";
import { ingredientDetailReducer } from "./ingredientDetail";
import { orderReducer } from "./order";

export const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  burgerConstructor: burgerConstructorReducer,
  ingredientDetail: ingredientDetailReducer,
  order: orderReducer,
});
