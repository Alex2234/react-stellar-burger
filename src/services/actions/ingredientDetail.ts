import { TIngredient } from "../../types/types";

export const GET_INGREDIENT_DETAIL: "GET_INGREDIENT_DETAIL" =
  "GET_INGREDIENT_DETAIL";
export const DELETE_INGREDIENT_DETAIL: "DELETE_INGREDIENT_DETAIL" =
  "DELETE_INGREDIENT_DETAIL";

type GetIngredientDetail = {
  type: typeof GET_INGREDIENT_DETAIL;
  ingredientDetail: TIngredient;
};

type DeleteIngredientDetail = {
  type: typeof DELETE_INGREDIENT_DETAIL;
  ingredientDetail: null;
};

export type TDetailIngredientActions =
  | GetIngredientDetail
  | DeleteIngredientDetail;

export const getIngredientDetail = (ingredientDetail: TIngredient) => {
  return {
    type: GET_INGREDIENT_DETAIL,
    ingredientDetail: {
      ...ingredientDetail,
    },
  };
};

export const deleteIngredientDetail = (ingredientDetail: TIngredient) => {
  return {
    type: DELETE_INGREDIENT_DETAIL,
    ingredientDetail: null,
  };
};
