import React, { useState } from "react";
import { calculateSubTotalCost } from "../../utils/calculateCost";
import { PrimaryButton } from "../atoms/button/PrimaryButton";
import { Modal } from "../modal/Modal";
import { Ingredient } from "@/types";
import { useRecoilValue } from "recoil";
import { suppliersState } from "@/recoil/atoms/suppliersState";

export const RecipesTable = () => {
  // 原材料と仕入れ先を選択するモーダル
  const [open, setOpen] = useState(false);

  // 仕入れ先と原材料をRecoilから取得
  const suppliers = useRecoilValue(suppliersState);

  // // 原材料追加ボタンを押した時に呼ばれる関数
  // const handleAddIngredient = () => {
  //   setRecipe({
  //     ingredients: [
  //       ...recipe.ingredients,
  //       {
  //         id: 1,
  //         name: "",
  //         quantity: 0,
  //         supplier_id: suppliers[0].id,
  //         buy_cost: 10,
  //         buy_quantity: 10,
  //         unit: "g",
  //         supplier: suppliers[0],
  //       },
  //     ],
  //   });
  // };

  // 小数点第一位で四捨五入(原材料の単価)(1/円))
  const costCalculation = (ingredient: Ingredient) => {
    return (
      // 文字列を数値に変換して計算
      Math.round((ingredient.buy_cost / ingredient.buy_quantity) * 10) / 10
    );
  };

  return (
    <>
      <div className="px-4 mt-10 w-full sm:px-6 lg:px-8">
        <button
          type="button"
          // onClick={}
          className="block rounded-md bg-blue-500 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-blue-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ease-in transition-all"
        >
          原材料追加
        </button>
        <div className="-mx-4 mt-8 flow-root sm:mx-0">
          <table className="w-full">
            <colgroup>
              <col className="sm:w-1/6" />
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
              <tr className="border-b border-gray-200">
                <td className="px-3 py-5 text-right text-sm lg:text-2xl text-gray-500 sm:table-cell">
                  <PrimaryButton>
                    <div onClick={() => setOpen(true)}>
                      原材料と仕入れ先選択
                    </div>
                  </PrimaryButton>
                </td>
                <td className="px-3 py-5 text-right text-sm lg:text-2xl text-gray-500 sm:table-cell">
                  仕入れ先(最初は空欄)
                </td>
                <td className="py-5 pl-3 pr-4 text-right text-sm lg:text-xl text-gray-500 sm:pr-0">
                  <input
                    type="number"
                    name="quantity"
                    id="quantity"
                    // value={ingredient.quantity}
                    // onChange={(e) => handleChange(i, e)}
                    className="border rounded py-2 w-20 text-gray-900 shadow-lg ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-500 sm:text-sm sm:leading-6"
                  />{" "}
                  g
                </td>
              </tr>
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
                  100 円
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
      <Modal open={open} setModalOpen={setOpen}>
        <div className="mb-5 p-5 font-bold text-lg lg:p-0">
          レシピで使用する原材料と仕入れ先を選択してください！
        </div>
        <nav
          className="h-96 overflow-y-auto p-2 lg:p-0"
          aria-label="ingredients"
        >
          {suppliers
            .filter((supplier) => supplier.ingredients.length > 0)
            .map((supplier) => (
              <div key={supplier.id} className="relative">
                <div className="sticky top-0 z-10 border-y border-b-gray-200 border-t-gray-100 bg-gray-50 px-10 py-1.5 text-xl text-center lg:text-3xl font-semibold leading-6 text-gray-900">
                  <h3>{supplier.name}</h3>
                </div>
                <ul role="list" className="divide-y divide-gray-100">
                  {supplier.ingredients.map((ingredeint) => (
                    <li key={ingredeint.id} className="flex gap-x-4 px-3 py-5">
                      <div className="min-w-0">
                        <p className="text-sm font-bold leading-6 text-gray-900 lg:text-2xl">
                          {ingredeint.name}
                          <span className="text-sm lg:text-xl lg:ml-2 text-gray-500">
                            {ingredeint.unit}
                          </span>
                        </p>
                        <p className="mt-1 truncate text-ms lg:text-xl leading-5 text-gray-500">
                          1/円 {costCalculation(ingredeint)}円
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
        </nav>
      </Modal>
    </>
  );
};
