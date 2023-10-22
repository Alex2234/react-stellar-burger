import { v4 as uuidv4 } from "uuid";

export const ADD_INGREDIENTS = "ADD_INGREDIENTS";
export const DELETE_INGREDIENT = "DELETE_INGREDIENT";

export const addIngredient = (selectIngredient) => {
  return {
    type: ADD_INGREDIENTS,
    selectIngredient: {
      ...selectIngredient,
      key: uuidv4(),
    },
  };
};

export const deleteIngredient = (key) => {
  return {
    type: DELETE_INGREDIENT,
    key: key,
  };
};
