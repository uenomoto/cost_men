// 全てのコンポーネントで使用する関数を定義
import { RecipeIngredient } from "@/types";
import { Recipe } from "@/types";

type Ingredient = {
  buy_cost: number;
  buy_quantity: number;
  quantity: number;
};

// 1個あたりの原材料の原価を計算する関数
export const calculateSubTotalCost = (ingredient: Ingredient) => {
  return Math.round(
    (ingredient.buy_quantity / ingredient.buy_cost) * ingredient.quantity
  );
};

// 1つのレシピに対しての合計の原価を「四捨五入」して計算する関数
export const calculateTotalCost = (recipe: Recipe) => {
  return Math.round(
    recipe.ingredients.reduce(
      (sum: number, recipeIngredient: RecipeIngredient) =>
        sum +
        (recipeIngredient.ingredient.buy_cost /
          recipeIngredient.ingredient.buy_quantity) *
          recipeIngredient.quantity,
      0
    )
  );
};
