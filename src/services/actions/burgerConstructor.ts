import { v4 as uuidv4 } from "uuid";
import { TIngredient } from "../../types/types";

export const ADD_INGREDIENTS: "ADD_INGREDIENTS" = "ADD_INGREDIENTS";
export const DELETE_INGREDIENT: "DELETE_INGREDIENT" = "DELETE_INGREDIENT";

type AddIngredientAction = {
  type: typeof ADD_INGREDIENTS;
  selectIngredient: TIngredient & { key: string };
};

type DeleteIngredientAction = {
  type: typeof DELETE_INGREDIENT;
  key: string;
};

export type TIngredientsAction = AddIngredientAction | DeleteIngredientAction;

export const addIngredient = (
  selectIngredient: TIngredient
): AddIngredientAction => {
  return {
    type: ADD_INGREDIENTS,
    selectIngredient: {
      ...selectIngredient,
      key: uuidv4(),
    },
  };
};

export const deleteIngredient = (key: string): DeleteIngredientAction => {
  return {
    type: DELETE_INGREDIENT,
    key: key,
  };
};
