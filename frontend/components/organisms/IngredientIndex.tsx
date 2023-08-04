import React, { useState } from "react";
import { EditButton } from "../atoms/button/EditButton";
import Link from "next/link";
import { useRecoilValue } from "recoil";
import { recipeShowState } from "@/recoil/atoms/recipeShowState";
import { Ingredient, RecipeIngredient } from "@/types";

export const IngredientIndex = () => {
  const recipeShow = useRecoilValue(recipeShowState);

  // 1つの原材料の単価(1/円)を計算する
  const costCalculation = (ingredient: Ingredient) => {
    return (
      Math.round((ingredient.buy_cost / ingredient.buy_quantity) * 10) / 10
    );
  };

  // 1つの原材料の合計金額を計算する(subtotal)
  const calculateIngredientCost = (recipeIngredient: RecipeIngredient) => {
    const quantity = Number(recipeIngredient.quantity);
    // 1つの原材料の単価(1/円)をcost定数に代入
    const cost = costCalculation(recipeIngredient.ingredient);
    return Math.round((quantity * cost * 10) / 10); // 小数点第一位で四捨五入で計算
  };

  return (
    <>
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="sm:flex sm:items-center mt-5">
          <div className="sm:flex-auto">
            <h2 className="text-2xl font-semibold leading-6 text-gray-900">
              原材料一覧
            </h2>
          </div>
          <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
            <EditButton>
              <Link href="/recipes/edit/1">
                <div className="text-xl">レシピ編集</div>
              </Link>
            </EditButton>
          </div>
        </div>
        <div className="mt-8 flow-root">
          <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block w-full py-2 align-middle sm:px-6 lg:px-8">
              <table className="w-full divide-y divide-gray-300">
                <thead>
                  <tr>
                    <th
                      scope="col"
                      className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-3"
                    >
                      原材料名
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      数量
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      1つの原材料の単価
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white">
                  {recipeShow.recipe_ingredients.map((recipeIngredient) => (
                    <tr key={recipeIngredient.id} className="even:bg-gray-50">
                      <td className="whitespace-nowrap py-4 px-0 text-lg text-left font-bold text-gray-900">
                        {recipeIngredient.ingredient.name}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-lg font-bold text-left text-gray-900">
                        {recipeIngredient.quantity}
                        {recipeIngredient.ingredient.unit}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-lg font-bold text-center text-gray-900">
                        {calculateIngredientCost(recipeIngredient)} 円
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <div className="my-10 font-bold text-right text-2xl">
        原価合計金額: {recipeShow.total_cost} 円
      </div>
    </>
  );
};
