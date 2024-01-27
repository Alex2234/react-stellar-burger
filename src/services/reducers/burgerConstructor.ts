import {
  ADD_INGREDIENTS,
  DELETE_INGREDIENT,
} from "../actions/burgerConstructor";
import { TIngredientsAction } from "../actions/burgerConstructor";
import { TIngredient } from "../../types/types";

type TIngredientsState = {
  bun: (TIngredient & { key: string }) | null;
  selectIngredients: (TIngredient & { key: string })[];
};

const initialState: TIngredientsState = {
  bun: null,
  selectIngredients: [],
};

export const burgerConstructorReducer = (
  state = initialState,
  action: TIngredientsAction
) => {
  switch (action.type) {
    case ADD_INGREDIENTS: {
      if (action.selectIngredient.type === "bun") {
        return {
          ...state,
          bun: action.selectIngredient,
        };
      } else {
        return {
          ...state,
          selectIngredients: [
            ...state.selectIngredients,
            action.selectIngredient,
          ],
        };
      }
    }
    case DELETE_INGREDIENT:
      return {
        ...state,
        selectIngredients: [...state.selectIngredients].filter(
          (item) => item.key !== action.key
        ),
      };
    default:
      return state;
  }
};
