import React, { FormEvent, useEffect, useState } from "react";
import { Ingredient } from "@/types";
import axios, { AxiosError, AxiosResponse } from "axios";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { tokenState } from "@/recoil/atoms/tokenState";
import { loadedState } from "@/recoil/atoms/loadedState";
import { errorMessageState } from "@/recoil/atoms/errorMessageState";
import { EditButton } from "../atoms/button/EditButton";
import { DeleteButton } from "../atoms/button/DeleteButton";
import { Modal } from "../modal/Modal";
import { PrimaryButton } from "../atoms/button/PrimaryButton";
import { SlideOver } from "../molecules/slide-overs/SlideOver";
import { AlertBadge } from "../atoms/badge/AlertBadge";
import { Input } from "../atoms/form/Input";
import { EditSubmit } from "../atoms/form/EditSubmit";

// 仕入れ先が配列であることを明示
type Suppliers = Supplier[];

type Supplier = {
  id: number;
  user_id: number;
  name: string;
  contact_info: string;
  ingredients: Ingredient[];
};

const classNames = (...classes: (string | false)[]): string => {
  return classes.filter(Boolean).join(" ");
};

export const SupplierIngredientTable = () => {
  const [loading, setLoading] = useState(true);

  const [supplierIngredienteditOpen, setSupplierIngredientEditOpen] = useState<
    number | null
  >(null);

  // 検索フォームのスライドオーバー
  const [slideOpen, setSlideOpen] = useState(false);

  // 編集フォームのステート
  const [editName, setEditName] = useState("");
  const [editBuyCost, setEditBuyCost] = useState("");
  const [editBuyQuantity, setEditBuyQuantity] = useState("");
  const [editUnit, setEditUnit] = useState("");

  // 一覧表示のステート, 仕入れ先一覧
  const [suppliers, setSuppliers] = useState<Suppliers>([]);

  // RecoilのTokenを取得する
  const token = useRecoilValue(tokenState);
  const loaded = useRecoilValue(loadedState); // tokenのロード状態を取得
  const setErrorMessage = useSetRecoilState(errorMessageState);

  const editHandleSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log(
      `原材料名:${editName}, 購入時の値段:${editBuyCost}, 購入時の数量:${editBuyQuantity}, 単位:${editUnit}`
    );
  };

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(
        `${process.env.NEXT_PUBLIC_IP_ENDPOINT}/ingredients/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setSuppliers(
        suppliers.map((supplier) => ({
          ...supplier, // 仕入れ先情報をコピーして新しい配列(ボタンを押したidを削除)を作成
          ingredients: supplier.ingredients.filter(
            (ingredient) => ingredient.id !== id
          ),
        }))
      );
      setErrorMessage(null);
    } catch (error: AxiosError | any) {
      console.log(error);
      if (error.response) {
        setErrorMessage(error.response.data); // railsから返されたエラーメッセージをステートに格納
      }
    }
  };

  // 原材料の単価を計算する
  const costCalculation = (ingredient: Ingredient) => {
    return (
      Math.round((ingredient.buy_cost / ingredient.buy_quantity) * 10) / 10
    );
  };

  // 仕入れ先情報一覧を取得する
  useEffect(() => {
    if (!token || !loaded) return;
    setLoading(true);
    const getSuppliers = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_IP_ENDPOINT}/suppliers`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setSuppliers(res.data.suppliers); // APIから取得した仕入れ先情報をステートに格納
        setLoading(false);
        setErrorMessage(null);
      } catch (error: AxiosError | any) {
        console.log(error);
        setLoading(false);
        setErrorMessage("仕入れ先情報の取得に失敗しました");
      }
    };
    if (loaded) {
      getSuppliers();
    }
  }, [token, loaded, setErrorMessage]);

  return (
    <div className="mt-20">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h1 className="text-md lg:text-2xl font-semibold leading-6 text-gray-900">
              仕入れ先 原材料一覧
            </h1>
            <p className="mt-2 mb-3 text-sm text-gray-700 md:mb-0">
              仕入れ先と原材料の一覧です。編集・削除を行うことができます。
            </p>
          </div>
          <PrimaryButton>
            <div onClick={() => setSlideOpen(true)}>検索する</div>
          </PrimaryButton>
          <SlideOver slideOpen={slideOpen} setSlideOpen={setSlideOpen} />
        </div>
        <div className="mt-8 flow-root">
          <div className="-mx-4 -my-2 sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle">
              <table className="min-w-full border-separate border-spacing-0">
                <thead>
                  <tr>
                    <th
                      scope="col"
                      className="sticky top-0 z-10 border-b border-gray-300 bg-white bg-opacity-75 py-3.5 pl-4 pr-3 text-left text-md lg:text-2xl font-semibold text-gray-900 backdrop-blur backdrop-filter sm:pl-6 lg:pl-8"
                    >
                      仕入れ先
                    </th>
                    <th
                      scope="col"
                      className="sticky top-0 z-10 hidden border-b border-gray-300 bg-white bg-opacity-75 px-3 py-3.5 text-left text-md lg:text-2xl font-semibold text-gray-900 backdrop-blur backdrop-filter sm:table-cell"
                    >
                      連絡先
                    </th>
                    <th
                      scope="col"
                      className="sticky top-0 z-10 hidden border-b border-gray-300 bg-white bg-opacity-75 px-3 py-3.5 text-left text-md lg:text-2xl font-semibold text-gray-900 backdrop-blur backdrop-filter lg:table-cell"
                    >
                      購入価格
                    </th>
                    <th
                      scope="col"
                      className="sticky top-0 z-10 hidden border-b border-gray-300 bg-white bg-opacity-75 px-3 py-3.5 text-left text-md lg:text-2xl font-semibold text-gray-900 backdrop-blur backdrop-filter lg:table-cell"
                    >
                      購入数量
                    </th>
                    <th
                      scope="col"
                      className="sticky top-0 z-10 border-b border-gray-300 bg-white bg-opacity-75 px-3 py-3.5 text-center text-md lg:text-2xl font-semibold text-gray-900 backdrop-blur backdrop-filter"
                    >
                      原材料名
                    </th>
                    <th
                      scope="col"
                      className="sticky top-0 z-10 border-b border-gray-300 bg-white bg-opacity-75 px-3 py-3.5 text-left text-md lg:text-2xl font-semibold text-gray-900 backdrop-blur backdrop-filter"
                    >
                      1/g円
                    </th>
                    <th
                      scope="col"
                      className="sticky top-0 z-10 border-b border-gray-300 bg-white bg-opacity-75 py-3.5 pl-3 pr-4 backdrop-blur backdrop-filter sm:pr-6 lg:pr-8"
                    >
                      <span className="sr-only">Edit</span>
                    </th>
                    <th
                      scope="col"
                      className="sticky top-0 z-10 border-b border-gray-300 bg-white bg-opacity-75 py-3.5 pl-3 pr-4 backdrop-blur backdrop-filter sm:pr-6 lg:pr-8"
                    >
                      <span className="sr-only">Delete</span>
                    </th>
                  </tr>
                </thead>
                {loading ? (
                  <div
                    className="flex items-center text-center"
                    aria-label="読み込み中"
                  >
                    <span className="font-bold mr-3">ロード中です........</span>
                    <div className="animate-spin h-10 w-10 border-4 border-blue-500 rounded-full border-t-transparent"></div>
                  </div>
                ) : (
                  <tbody>
                    {suppliers.flatMap((supplier, index) =>
                      supplier.ingredients.map(
                        (ingredient, ingredientIndex) => (
                          <tr key={`${supplier.id}-${ingredient.id}`}>
                            {ingredientIndex === 0 && (
                              <>
                                <td
                                  rowSpan={supplier.ingredients.length}
                                  className={classNames(
                                    index !== suppliers.length - 1
                                      ? "border-b border-gray-200"
                                      : "",
                                    "whitespace-nowrap py-4 pl-4 pr-3 font-medium text-gray-900 sm:pl-6 lg:pl-8"
                                  )}
                                >
                                  <div className="flex items-center space-x-2">
                                    <div className="flex-shrink-0 w-2.5 h-2.5 rounded-full bg-sky-600" />
                                    <span className="text-md lg:text-2xl">
                                      {supplier.name}
                                    </span>
                                  </div>
                                </td>
                                <td
                                  rowSpan={supplier.ingredients.length}
                                  className={classNames(
                                    index !== suppliers.length - 1
                                      ? "border-b border-gray-200"
                                      : "",
                                    "whitespace-nowrap hidden px-3 py-4 text-md lg:text-2xl text-gray-900 sm:table-cell"
                                  )}
                                >
                                  <span>{supplier.contact_info}</span>
                                </td>
                              </>
                            )}
                            <td
                              className={classNames(
                                index !== suppliers.length - 1
                                  ? "border-b border-gray-200"
                                  : "",
                                "whitespace-nowrap hidden px-3 py-4 text-md lg:text-2xl text-gray-900 lg:table-cell"
                              )}
                            >
                              <span>{ingredient.buy_cost}円</span>
                            </td>
                            <td
                              className={classNames(
                                index !== suppliers.length - 1
                                  ? "border-b border-gray-200"
                                  : "",
                                "whitespace-nowrap hidden px-3 py-4 text-md lg:text-2xl text-gray-900 lg:table-cell"
                              )}
                            >
                              <span>
                                {ingredient.buy_quantity} {ingredient.unit}
                              </span>
                            </td>
                            <td
                              className={classNames(
                                index !== suppliers.length - 1
                                  ? "border-b border-gray-200"
                                  : "",
                                "whitespace-nowrap px-3 py-4 text-md lg:text-2xl text-gray-900"
                              )}
                            >
                              <span>{ingredient.name}</span>
                            </td>
                            <td
                              className={classNames(
                                index !== suppliers.length - 1
                                  ? "border-b border-gray-200"
                                  : "",
                                "whitespace-nowrap px-3 py-4 text-md lg:text-2xl text-gray-900"
                              )}
                            >
                              <span>{costCalculation(ingredient)}円</span>
                            </td>
                            <td
                              className={classNames(
                                index !== suppliers.length - 1
                                  ? "border-b border-gray-200"
                                  : "",
                                "relative whitespace-nowrap py-4 pr-4 pl-3 text-right text-xs font-medium sm:pr-8 lg:pr-1"
                              )}
                            >
                              <EditButton>
                                <div
                                  onClick={() =>
                                    setSupplierIngredientEditOpen(ingredient.id)
                                  }
                                >
                                  編集
                                </div>
                              </EditButton>
                              {supplierIngredienteditOpen === ingredient.id && (
                                <Modal
                                  open={
                                    supplierIngredienteditOpen === ingredient.id
                                  }
                                  setModalOpen={() =>
                                    setSupplierIngredientEditOpen(null)
                                  }
                                >
                                  <div className="md:p-5">
                                    <h3 className="text-xl lg:text-3xl text-center font-semibold leading-6 text-gray-900">
                                      原材料編集
                                    </h3>
                                    <div className="mt-5">
                                      <div className="grid gap-1 grid-cols-2">
                                        <div className="col-span-1">
                                          <AlertBadge />
                                          <Input
                                            htmlfor="name"
                                            text="原材料名"
                                            type="text"
                                            placeholder="原材料名を入力してください"
                                            id="name"
                                            name="name"
                                            value={editName}
                                            onChange={setEditName}
                                          />
                                          <AlertBadge />
                                          <Input
                                            htmlfor="buy_quantity"
                                            text="購入時の数量"
                                            type="number"
                                            placeholder="購入時の数量を入力"
                                            id="buy_quantity"
                                            name="buy_quantity"
                                            value={editBuyQuantity}
                                            onChange={setEditBuyQuantity}
                                          />
                                        </div>
                                        <div className="col-span-1">
                                          <AlertBadge />
                                          <Input
                                            htmlfor="buy_cost"
                                            text="購入時の値段"
                                            type="number"
                                            placeholder="購入時の値段を入力"
                                            id="buy_cost"
                                            name="buy_cost"
                                            value={editBuyCost}
                                            onChange={setEditBuyCost}
                                          />
                                          <AlertBadge />
                                          <Input
                                            htmlfor="unit"
                                            text="単位"
                                            type="text"
                                            placeholder="単位を入力してください"
                                            id="unit"
                                            name="unit"
                                            value={editUnit}
                                            onChange={setEditUnit}
                                          />
                                        </div>
                                      </div>
                                      <EditSubmit
                                        text="編集する"
                                        onClick={editHandleSubmit}
                                      />
                                    </div>
                                  </div>
                                </Modal>
                              )}
                            </td>
                            <td
                              className={classNames(
                                index !== suppliers.length - 1
                                  ? "border-b border-gray-200"
                                  : "",
                                "relative whitespace-nowrap py-4 pr-4 pl-3 text-right text-xs font-medium sm:pr-8 lg:pr-1"
                              )}
                            >
                              <DeleteButton
                                onClick={() => handleDelete(ingredient.id)}
                              />
                            </td>
                          </tr>
                        )
                      )
                    )}
                  </tbody>
                )}
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
