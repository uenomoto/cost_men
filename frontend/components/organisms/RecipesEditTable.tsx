import React, { ChangeEvent, useEffect, useState } from "react";
import { XCircleIcon } from "@heroicons/react/24/solid";
import { Ingredient, SelectedIngredient } from "@/types";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { suppliersState } from "@/recoil/atoms/suppliersState";
import { warningMessageState } from "@/recoil/atoms/warningMessageState";
import { recipeShowState } from "@/recoil/atoms/recipeShowState";
import { Modal } from "../modal/Modal";
import { PrimaryButton } from "../atoms/button/PrimaryButton";

type Props = {
  setUpdatedIngredients: (ingredients: SelectedIngredient[]) => void;
};

export const RecipesEditTable = ({ setUpdatedIngredients }: Props) => {
  // 選択されていない原材料の初期値を設定
  const initialIngredient: SelectedIngredient = {
    ingredient: {
      id: 0,
      name: "",
      unit: "",
      buy_cost: 0,
      buy_quantity: 0,
      supplier_id: 0,
      supplier: {
        id: 0,
        user_id: "",
        name: "",
        contact_info: "",
        ingredients: [],
      },
    },
    quantity: "0",
  };

  // レシピ詳細をRecoilから取得
  const recipeShow = useRecoilValue(recipeShowState);

  // 警告メッセージの更新関数
  const setWarningMessage = useSetRecoilState(warningMessageState);

  // 原材料と仕入れ先を選択するモーダル
  const [open, setOpen] = useState(false);
  // 仕入れ先と原材料をRecoilから取得
  const suppliers = useRecoilValue(suppliersState);

  // 編集専用の原材料をstateに状態保存(親に渡す必要あり)
  const [editedIngredients, setEditedIngredients] = useState<
    SelectedIngredient[]
  >([]);

  // 編集専用の原材料を親コンポーネントに渡す
  useEffect(() => {
    setUpdatedIngredients(editedIngredients);
  }, [editedIngredients, setUpdatedIngredients]);

  // 原材料の選択時のイベントハンドラ
  const selectIngredientHandler = (
    ingredient: Ingredient,
    quantity: string
  ) => {
    setEditedIngredients((prev) => {
      // 選択した原材料が元の配列に存在するかどうかを確認
      const existingIngredientIndex = prev.findIndex(
        (i) => i.ingredient.id === ingredient.id
      );

      // 選択した原材料が元の配列に存在しない場合
      if (existingIngredientIndex === -1) {
        // 新しい原材料を配列に追加
        const newIngredients = [...prev, { ingredient, quantity }];

        // 元の配列から初期値を削除(id: 0)
        return newIngredients.filter((ingr) => ingr.ingredient.id !== 0);
      } else {
        // 選択した原材料が元の配列に存在する場合は、元の配列を返す
        const newIngredients = [...prev];

        return newIngredients;
      }
    });

    setOpen(false);
  };

  // 原材料追加ボタンが押された時のイベントハンドラ
  const handleAddIngredient = () => {
    // id === 0の要素が存在しないときに初期値を追加
    if (!editedIngredients.some((i) => i.ingredient.id === 0)) {
      setEditedIngredients((prev) => [...prev, initialIngredient]);
    } else {
      setWarningMessage("原材料を選択してから追加してください");
    }
  };

  // 初期値も含め作成した原材料を削除する
  const handleRemoveIngredient = (id: number) => {
    setEditedIngredients((prev) => prev.filter((i) => i.ingredient.id !== id));
  };

  // 小数点第一位で四捨五入(原材料の単価)(1/円))
  const costCalculation = (ingredient: Ingredient) => {
    return (
      Math.round((ingredient.buy_cost / ingredient.buy_quantity) * 10) / 10
    );
  };

  // 1つの原材料を計算する関数
  const calculateIngredientCost = (ingredient: Ingredient) => {
    // 数量がselectedIngredients配列内に結びついているので、それを取得
    const selectedIngredient = editedIngredients.find(
      (i) => i.ingredient.id === ingredient.id
    );
    // 選択された原材料のIDと一致する原材料を取得し計算
    if (selectedIngredient) {
      const quantity = Number(selectedIngredient.quantity);
      const cost = costCalculation(ingredient);
      return Math.round((quantity * cost * 10) / 10);
    } else {
      return 0;
    }
  };

  // 合計金額を計算する関数
  const calculateTotalCost = () => {
    return editedIngredients.reduce((totalCost, selectedIngredient) => {
      const costPerUnit = costCalculation(selectedIngredient.ingredient);
      const quantity = Number(selectedIngredient.quantity);
      if (isNaN(costPerUnit) || isNaN(quantity)) {
        return totalCost;
      }
      return totalCost + Math.round((quantity * costPerUnit * 10) / 10);
    }, 0);
  };

  // 数量を更新すると発火するイベントハンドラ
  const handleChange = (id: number, e: ChangeEvent<HTMLInputElement>) => {
    setEditedIngredients((prev) =>
      prev.map((ingredient) =>
        ingredient.ingredient.id === id
          ? { ...ingredient, quantity: e.target.value }
          : ingredient
      )
    );
  };

  // ここで既存のレシピ全体のデータをsetEditedIngredientsに格納する
  useEffect(() => {
    const ingredients = recipeShow.recipe_ingredients.map((ingredient) => ({
      ...ingredient,
      quantity: ingredient.quantity.toString(),
    }));

    setEditedIngredients(ingredients);
  }, [recipeShow.recipe_ingredients]);

  return (
    <>
      <div className="px-4 mt-10 lg:w-5/6 max-w-2xl sm:w-full  sm:px-6 lg:px-8">
        <button
          type="button"
          onClick={() => handleAddIngredient()}
          className="block rounded-md bg-blue-500 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-blue-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ease-in transition-all"
        >
          原材料追加
        </button>
        <div className="mx-auto mt-8 flow-root lg:max-w-7xl max-w-2xl sm:mx-0">
          <table className="w-full">
            <thead className="border-b border-gray-300 text-gray-900">
              <tr>
                <th
                  scope="col"
                  className="px-3 py-3.5 text-left text-sm lg:text-lg font-semibold text-gray-900 sm:table-cell"
                >
                  原材料
                </th>
                <th
                  scope="col"
                  className="px-3 py-3.5 text-center text-sm lg:text-lg font-semibold text-gray-900 sm:table-cell"
                >
                  数量
                </th>
                <th
                  scope="col"
                  className="py-3.5 pl-3 pr-4 text-right text-sm lg:text-lg font-semibold text-gray-900 sm:pr-0"
                >
                  計算結果
                </th>
                <th
                  scope="col"
                  className="py-3.5 pl-3 pr-4 text-right text-sm lg:text-lg font-semibold text-gray-900 sm:pr-0"
                >
                  <span className="sr-only">Delete</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {editedIngredients.map((selectedIngredient) => (
                <tr
                  className="border-b border-gray-200"
                  key={selectedIngredient.ingredient.id}
                >
                  {selectedIngredient.ingredient.id === 0 ? (
                    <>
                      <td
                        className="px-3 py-5 text-left lg:text-xl sm:table-cell"
                        colSpan={3}
                      >
                        <PrimaryButton>
                          <div onClick={() => setOpen(true)}>原材料選択</div>
                        </PrimaryButton>
                      </td>
                      <td colSpan={2}>
                        <XCircleIcon
                          className="h-10 cursor-pointer text-red-400 hover:text-red-500
                          transition-all ease-in-out duration-200 inline-flex"
                          onClick={() =>
                            handleRemoveIngredient(
                              selectedIngredient.ingredient.id
                            )
                          }
                        />
                      </td>
                    </>
                  ) : (
                    <>
                      <td className="px-3 py-5 font-bold text-left text-md lg:text-2xl text-gray-900 sm:table-cell">
                        {selectedIngredient.ingredient.name} 1/円:
                        {costCalculation(selectedIngredient.ingredient)} 円
                      </td>
                      <td className="py-5 pl-3 pr-4 text-center text-sm lg:text-xl text-gray-500 sm:pr-0">
                        <input
                          type="number"
                          name="quantity"
                          id="quantity"
                          min="0"
                          value={selectedIngredient.quantity}
                          onChange={(e) =>
                            handleChange(selectedIngredient.ingredient.id, e)
                          }
                          className="border rounded py-2 w-20 text-gray-900 shadow-lg ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-500 sm:text-sm sm:leading-6"
                        />{" "}
                        {selectedIngredient.ingredient.unit}
                      </td>
                      <td className="py-5 pl-3 pr-4 text-right text-sm lg:text-xl text-gray-500 sm:pr-0">
                        {calculateIngredientCost(
                          selectedIngredient.ingredient
                        ) + " 円"}
                      </td>
                      <td>
                        <XCircleIcon
                          className="h-10 cursor-pointer text-red-400 hover:text-red-500
                          transition-all ease-in-out duration-200 inline-flex"
                          onClick={() =>
                            handleRemoveIngredient(
                              selectedIngredient.ingredient.id
                            )
                          }
                        />
                      </td>
                    </>
                  )}
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <th
                  scope="row"
                  colSpan={2}
                  className="pl-4 pr-3 pt-4 text-right text-xl font-semibold text-gray-900 sm:pl-0"
                >
                  合計原価
                </th>
                <td className="pl-3 pr-4 pt-4 text-right text-md font-semibold text-gray-900 sm:pr-0">
                  {calculateTotalCost()} 円
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
                    <li
                      key={ingredeint.id}
                      className="flex gap-x-4 px-3 py-5 cursor-pointer hover:bg-gray-300"
                      onClick={() => selectIngredientHandler(ingredeint, "0")}
                    >
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