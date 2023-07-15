import React, { ChangeEvent, useState } from "react";
import { calculateSubTotalCost } from "../../utils/calculateCost";

// 型定義
type recipeIngredients = [
  {
    id: number;
    name: string;
    ingredients: [
      {
        ingredient_id: number;
        quantity: number;
      },
    ];
  },
];

export const RecipesTable = () => {
  // 架空のデータ
  const ingredients = [
    {
      id: 1,
      name: "にんじん",
      supplier_id: 1,
      buy_cost: 400,
      buy_quantity: 500,
      unit: "g",
    },
    {
      id: 2,
      name: "じゃがいも",
      supplier_id: 1,
      buy_cost: 700,
      buy_quantity: 1000,
      unit: "g",
    },
  ];

  const suppliers = [
    {
      id: 1,
      user_id: 1,
      name: "上野商店",
      contact_info: "03-1234-5678",
    },
  ];

  // フォームのデータ管理
  const [recipe, setRecipe] = useState({
    ingredients: ingredients.map((ingredient) => ({
      ...ingredient,
      quantity: 0,
    })),
  });

  // テキストフィールドやセレクトボックスの変更時に呼ばれる関数
  const handleChange = (i: number, e: ChangeEvent<HTMLInputElement>) => {
    const values = [...recipe.ingredients];
    if (e.target.name === "quantity") {
      values[i].quantity = e.target.value;
    } else if (e.target.name === "name") {
      values[i].name = e.target.value;
    }
    setRecipe({ ingredients: values });
  };

  // 原材料追加ボタンを押した時に呼ばれる関数
  const handleAddIngredient = () => {
    setRecipe({
      ingredients: [...recipe.ingredients, { name: "", quantity: 0 }],
    });
  };

  const totalCost = Math.round(
    recipe.ingredients.reduce(
      (sum, ingredient) =>
        sum +
        (ingredient.buy_quantity / ingredient.buy_cost) * ingredient.quantity,
      0
    )
  );

  return (
    <div className="px-4 mt-10 w-full sm:px-6 lg:px-8">
      <button
        type="button"
        onClick={handleAddIngredient}
        className="block rounded-md bg-blue-500 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-blue-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ease-in transition-all"
      >
        原材料追加
      </button>
      <div className="-mx-4 mt-8 flow-root sm:mx-0">
        <table className="min-w-full">
          <colgroup>
            <col className="w-full sm:w-1/2" />
            <col className="sm:w-1/6" />
            <col className="sm:w-1/6" />
            <col className="sm:w-1/6" />
          </colgroup>
          <thead className="border-b border-gray-300 text-gray-900">
            <tr>
              <th
                scope="col"
                className="py-3.5 pl-4 pr-3 text-left text-ms lg:text-xl font-semibold text-gray-900 sm:pl-0"
              >
                原材料名
              </th>
              <th
                scope="col"
                className="px-3 py-3.5 text-right text-sm lg:text-lg font-semibold text-gray-900 sm:table-cell"
              >
                仕入れ先
              </th>
              <th
                scope="col"
                className="px-3 py-3.5 text-right text-sm lg:text-lg font-semibold text-gray-900 sm:table-cell"
              >
                数量
              </th>
              <th
                scope="col"
                className="py-3.5 pl-3 pr-4 text-right text-sm lg:text-lg font-semibold text-gray-900 sm:pr-0"
              >
                計算結果
              </th>
            </tr>
          </thead>
          <tbody>
            {recipe.ingredients.map((ingredient, i) => (
              <tr key={i} className="border-b border-gray-200">
                <td className="max-w-0 py-5 pl-4 pr-3 text-sm lg:text-xl text-left sm:pl-0">
                  <input
                    type="text"
                    name="name"
                    id="name"
                    value={ingredient.name}
                    onChange={(e) => handleChange(i, e)}
                    className="border rounded py-2 text-gray-900 shadow-lg ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-500 sm:text-sm sm:leading-6"
                  />
                </td>
                <td className="px-3 py-5 text-right text-sm text-gray-500 sm:table-cell">
                  <select
                    name="supplier"
                    className="form-select block w-full py-2 px-3 border border-gray-300 bg-white text-sm leading-5 font-medium rounded-md text-gray-700 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 focus:z-10 sm:text-sm sm:leading-5"
                  >
                    {suppliers.map((supplier) => (
                      <option key={supplier.id} value={supplier.id}>
                        {supplier.name}
                      </option>
                    ))}
                  </select>
                </td>
                <td className="px-3 py-5 text-right text-sm lg:text-2xl text-gray-500 sm:table-cell">
                  <input
                    type="number"
                    name="quantity"
                    id="quantity"
                    value={ingredient.quantity}
                    onChange={(e) => handleChange(i, e)}
                    className="border rounded py-2 w-20 text-gray-900 shadow-lg ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-500 sm:text-sm sm:leading-6"
                  />{" "}
                  {ingredient.unit}
                </td>
                <td className="py-5 pl-3 pr-4 text-right text-sm lg:text-xl text-gray-500 sm:pr-0">
                  {calculateSubTotalCost(ingredient)} 円
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <th
                scope="row"
                colSpan={3}
                className="pl-4 pr-3 pt-4 text-right text-xl font-semibold text-gray-900 sm:pl-0"
              >
                合計原価
              </th>
              <td className="pl-3 pr-4 pt-4 text-right text-md font-semibold text-gray-900 sm:pr-0">
                {totalCost} 円
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
};
