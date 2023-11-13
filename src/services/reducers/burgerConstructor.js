import {
  ADD_INGREDIENTS,
  DELETE_INGREDIENT,
} from "../actions/burgerConstructor";

const initialState = {
  bun: null,
  selectIngredients: [],
};

export const burgerConstructorReducer = (state = initialState, action) => {
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
