type TTypeIngredient = "bun" | "main" | "sauce";

export type TIngredient = {
  calories: number;
  carbohydrates: number;
  fat: number;
  image: string;
  image_large: string;
  image_mobile: string;
  name: string;
  price: number;
  proteins: number;
  type: TTypeIngredient;
  __v: number;
  _id: string;
};

export type TOrder = {
  createdAt: string;
  ingredients: string[];
  name: string;
  number: number;
  status: string;
  updatedAt: string;
  _id: string;
};

export type TUser = {
  email: string;
  name: string;
};

export type TProfile = {
  success: boolean;
  user: TUser;
};

export type TAuthorization = {
  success: boolean;
  accessToken: string;
  refreshToken: string;
  user: TUser;
};

export type TRegistration = {
  success: boolean;
  user: TUser;
  accessToken: string;
  refreshToken: string;
};

export type TForgotPass = {
  success: boolean;
  message: string;
};

export type TResetPass = {
  success: boolean;
  message: string;
};

export type TLogout = {
  success: boolean;
  message: string;
};
