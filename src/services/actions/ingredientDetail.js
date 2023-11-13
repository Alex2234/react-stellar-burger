export const GET_INGREDIENT_DETAIL = "GET_INGREDIENT_DETAIL";
export const DELETE_INGREDIENT_DETAIL = "DELETE_INGREDIENT_DETAIL";

export const getIngredientDetail = (ingredientDetail) => {
  return {
    type: GET_INGREDIENT_DETAIL,
    ingredientDetail: {
      ...ingredientDetail,
    },
  };
};

export const deleteIngredientDetail = (ingredientDetail) => {
  return {
    type: DELETE_INGREDIENT_DETAIL,
    ingredientDetail: null,
  };
};
