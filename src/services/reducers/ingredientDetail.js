import {
  GET_INGREDIENT_DETAIL,
  DELETE_INGREDIENT_DETAIL,
} from "../actions/ingredientDetail";

const initialState = {
  ingredientDetail: null,
};

export const ingredientDetailReducer = (state = initialState, action) => {
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
