// 型定義ファイル

import { AxiosRequestConfig } from "axios";

export interface AxiosResponse<T = any> {
  data: T;
  status: number;
  statusText: string;
  headers: any;
  config: AxiosRequestConfig;
  request?: any;
}

export interface SupplierSelect {
  id: number;
  name: string;
}

export type SupplierSelectProps = {
  selected: SupplierSelect | null;
  setSelected: (supplier: SupplierSelect | null) => void;
  suppliers: SupplierSelect[];
};

// レシピの型定義
export interface Recipe {
  id: number;
  name: string;
  total_cost: number;
  image_aws_url: string;
  recipe_ingredients: RecipeIngredient[];
  tags: Tag[];
}

// 原材料の型定義
export interface Ingredient {
  id: number;
  supplier_id: number;
  buy_cost: number;
  buy_quantity: number;
  unit: string;
  name: string;
  supplier: Supplier;
}

// レシピの原材料の型定義
export interface RecipeIngredient {
  id: number;
  recipe_id: number;
  ingredient_id: number;
  quantity: number;
  ingredient: Ingredient;
}

// 仕入れ先の型定義
export interface Supplier {
  id: number;
  user_id: string;
  name: string;
  contact_info: string;
  ingredients: Ingredient[];
}

export interface SupplierResponse {
  suppliers: Supplier[];
  supplier: Supplier;
}

export interface IngredientResponse {
  ingredient: Ingredient;
}

export interface RecipeResponse {
  recipe: Recipe;
}

// レシピ登録時に選択する原材料の型定義
export interface SelectedIngredient {
  ingredient: Ingredient;
  quantity: string;
}

// タグの型定義
export interface Tag {
  id: number;
  user_id: string;
  name: string;
}

export interface TagResponse {
  tags: Tag[];
  tag: Tag;
}

export interface SearchResult {
  suppliers: Supplier[];
}

export interface SellingPrice {
  id: number;
  recipe_id: number;
  selling_price: number;
  price: number;
}

export interface SellingPriceResponse {
  selling_price: SellingPrice;
}

// 登録後のレシピの手順
export interface ExistingRecipeProcedure {
  id: number;
  recipe_id: number;
  procedure: string;
}
