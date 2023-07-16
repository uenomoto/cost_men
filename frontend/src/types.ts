// 型定義ファイル

export interface SupplierSelect {
  id: number;
  name: string;
}

export type SupplierSelectProps = {
  selected: SupplierSelect;
  setSelected: (supplier: SupplierSelect) => void;
  suppliers: SupplierSelect[];
};

// レシピの型定義
export interface Recipe {
  id: number;
  name: string;
  total_cost: number;
  imageUrl: string;
  ingredients: RecipeIngredient[];
}

// 原材料の型定義
export interface Ingredient {
  id: number;
  supplier_id: number;
  buy_cost: number;
  buy_quantity: number;
  unit: string;
  name: string;
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
  user_id: number;
  name: string;
  contact_info: string;
}

// タグの型定義
export interface Tag {
  id: number;
  name: string;
}