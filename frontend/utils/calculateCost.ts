// 全てのコンポーネントで使用する関数を定義

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
