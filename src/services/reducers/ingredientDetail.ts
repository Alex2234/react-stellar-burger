import { TDetailIngredientActions } from "./../actions/ingredientDetail";
import {
  GET_INGREDIENT_DETAIL,
  DELETE_INGREDIENT_DETAIL,
} from "../actions/ingredientDetail";
import { TIngredient } from "../../types/types";

type TDetailIngredientState = {
  ingredientDetail: TIngredient | null;
};

const initialState: TDetailIngredientState = {
  ingredientDetail: null,
};

export const ingredientDetailReducer = (
  state = initialState,
  action: TDetailIngredientActions
): TDetailIngredientState => {
  switch (action.type) {
    case GET_INGREDIENT_DETAIL:
      return {
        ...state,
        ingredientDetail: action.ingredientDetail,
      };
    case DELETE_INGREDIENT_DETAIL:
      return {
        ingredientDetail: null,
      };
    default:
      return state;
  }
};
