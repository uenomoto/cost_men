import React from "react";
import { useState } from "react";
import { Modal } from "../modal/Modal";
import { EditButton } from "../atoms/button/EditButton";
import { Input } from "../atoms/form/Input";

// 架空データ
const ingredients = [
  {
    id: 1,
    recipe_id: 1,
    ingredient_id: 1,
    quantity: 100.0,
    ingredient: {
      id: 1,
      supplier_id: 1,
      buy_cost: 300.0,
      buy_quantity: 100.0,
      unit: "g",
      name: "玉ねぎ",
    },
  },
  {
    id: 2,
    recipe_id: 1,
    ingredient_id: 2,
    quantity: 200.0,
    ingredient: {
      id: 2,
      supplier_id: 1,
      buy_cost: 500.0,
      buy_quantity: 50.0,
      unit: "g",
      name: "のり",
    },
  },
  {
    id: 3,
    recipe_id: 1,
    ingredient_id: 3,
    quantity: 150.0,
    ingredient: {
      id: 3,
      supplier_id: 2,
      buy_cost: 600.0,
      buy_quantity: 200.0,
      unit: "g",
      name: "煮卵",
    },
  },
  {
    id: 4,
    recipe_id: 1,
    ingredient_id: 4,
    quantity: 50.0,
    ingredient: {
      id: 4,
      supplier_id: 2,
      buy_cost: 400.0,
      buy_quantity: 100.0,
      unit: "g",
      name: "ネギ",
    },
  },
  {
    id: 5,
    recipe_id: 1,
    ingredient_id: 5,
    quantity: 100.0,
    ingredient: {
      id: 5,
      supplier_id: 3,
      buy_cost: 700.0,
      buy_quantity: 250.0,
      unit: "g",
      name: "チャーシュー",
    },
  },
];

export const IngredientIndex = () => {
  // map関数で回しているので、idをkeyにしているこれをやらないと全てのモーダルが開いてしまう
  const [openIngredientId, setOpenIngredientId] = useState<number | null>(null);

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
              <div>レシピ編集</div>
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
                  {ingredients.map((ingredient) => (
                    <tr key={ingredient.id} className="even:bg-gray-50">
                      <td className="whitespace-nowrap py-4 px-0 text-lg text-left font-bold text-gray-900">
                        {ingredient.ingredient.name}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-lg font-bold text-left text-gray-900">
                        {ingredient.quantity}
                        {ingredient.ingredient.unit}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-lg font-bold text-center text-gray-900">
                        {ingredient.ingredient.buy_cost} 円
                      </td>
                      <td>
                        <button
                          onClick={() => setOpenIngredientId(ingredient.id)}
                          className="font-bold text-sky-500 hover:text-sky-700 transition-all ease-in"
                        >
                          編集
                        </button>
                        {openIngredientId === ingredient.id && (
                          <Modal
                            open={openIngredientId === ingredient.id}
                            setModalOpen={() => setOpenIngredientId(null)}
                          >
                            <ul>
                              <li>できたら実装する</li>
                              <li>レシピ登録からの編集する部分</li>
                              <li>原材料</li>
                              <li>仕入れ先</li>
                              <li>数量</li>
                              <li>
                                これらピンポイントだから実装は難しそう。。。
                              </li>
                            </ul>
                          </Modal>
                        )}
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
        原価合計金額: 2500円
      </div>
    </>
  );
};
