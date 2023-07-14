import React, { useState } from "react";
import { EditButton } from "../atoms/button/EditButton";
import { DeleteButton } from "../atoms/button/DeleteButton";
import { Modal } from "../modal/Modal";
import { PrimaryButton } from "../atoms/button/PrimaryButton";

type Ingredient = {
  id: number;
  supplier_id: number;
  buy_cost: number;
  buy_quantity: number;
  unit: string;
  name: string;
};

type Supplier = {
  id: number;
  user_id: number;
  name: string;
  contact_info: string;
  ingredients: Ingredient[];
};

// 仕入れ先が配列であることを明示
type Suppliers = Supplier[];

const suppliers: Suppliers = [
  {
    id: 1,
    user_id: 1,
    name: "上野商店",
    contact_info: "(555) 555-6789",
    ingredients: [
      {
        id: 1,
        supplier_id: 1,
        buy_cost: 120.0,
        buy_quantity: 100.0,
        unit: "g",
        name: "トマト",
      },
      {
        id: 2,
        supplier_id: 1,
        buy_cost: 1000.0,
        buy_quantity: 2000.0,
        unit: "g",
        name: "りんご",
      },
      {
        id: 3,
        supplier_id: 1,
        buy_cost: 500.0,
        buy_quantity: 500.0,
        unit: "g",
        name: "オレンジ",
      },
      {
        id: 4,
        supplier_id: 1,
        buy_cost: 180.0,
        buy_quantity: 120.0,
        unit: "g",
        name: "ブルーベリ",
      },
      {
        id: 5,
        supplier_id: 1,
        buy_cost: 300.0,
        buy_quantity: 300.0,
        unit: "g",
        name: "バナナ",
      },
    ],
  },
  {
    id: 2,
    user_id: 2,
    name: "あいうえお商店",
    contact_info: "(555) 666-1234",
    ingredients: [
      {
        id: 6,
        supplier_id: 2,
        buy_cost: 210.0,
        buy_quantity: 150.0,
        unit: "g",
        name: "にんじん",
      },
      {
        id: 7,
        supplier_id: 2,
        buy_cost: 200.0,
        buy_quantity: 250.0,
        unit: "g",
        name: "ポテト",
      },
      {
        id: 8,
        supplier_id: 2,
        buy_cost: 340.0,
        buy_quantity: 300.0,
        unit: "g",
        name: "たまねぎ",
      },
      {
        id: 9,
        supplier_id: 2,
        buy_cost: 1200.0,
        buy_quantity: 1000.0,
        unit: "ml",
        name: "鶏白湯スープ",
      },
      {
        id: 10,
        supplier_id: 2,
        buy_cost: 700.0,
        buy_quantity: 1000.0,
        unit: "g",
        name: "鶏肉",
      },
      {
        id: 11,
        supplier_id: 2,
        buy_cost: 700.0,
        buy_quantity: 1000.0,
        unit: "g",
        name: "鶏肉",
      },
      {
        id: 12,
        supplier_id: 2,
        buy_cost: 700.0,
        buy_quantity: 1000.0,
        unit: "g",
        name: "鶏肉",
      },
      {
        id: 13,
        supplier_id: 2,
        buy_cost: 700.0,
        buy_quantity: 1000.0,
        unit: "g",
        name: "鶏肉",
      },
      {
        id: 15,
        supplier_id: 2,
        buy_cost: 700.0,
        buy_quantity: 1000.0,
        unit: "g",
        name: "鶏肉",
      },
      {
        id: 16,
        supplier_id: 2,
        buy_cost: 700.0,
        buy_quantity: 1000.0,
        unit: "g",
        name: "鶏肉",
      },
      {
        id: 17,
        supplier_id: 2,
        buy_cost: 700.0,
        buy_quantity: 1000.0,
        unit: "g",
        name: "鶏肉",
      },
      {
        id: 18,
        supplier_id: 2,
        buy_cost: 700.0,
        buy_quantity: 1000.0,
        unit: "g",
        name: "鶏肉",
      },
      {
        id: 19,
        supplier_id: 2,
        buy_cost: 700.0,
        buy_quantity: 1000.0,
        unit: "g",
        name: "鶏肉",
      },
      {
        id: 20,
        supplier_id: 2,
        buy_cost: 700.0,
        buy_quantity: 1000.0,
        unit: "g",
        name: "鶏肉",
      },
    ],
  },
];

const classNames = (...classes: (string | false)[]): string => {
  return classes.filter(Boolean).join(" ");
};

export const SupplierIngredientTable = () => {
  const [supplierIngredienteditOpen, setSupplierIngredientEditOpen] = useState<
    number | null
  >(null);

  const costCalculation = (ingredient: Ingredient) => {
    return (
      Math.round((ingredient.buy_cost / ingredient.buy_quantity) * 10) / 10
    );
  };

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
          <PrimaryButton>検索する</PrimaryButton>
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
                      className="sticky top-0 z-10 border-b border-gray-300 bg-white bg-opacity-75 px-3 py-3.5 text-left text-md lg:text-2xl font-semibold text-gray-900 backdrop-blur backdrop-filter"
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
                <tbody>
                  {suppliers.flatMap((supplier, index) =>
                    supplier.ingredients.map((ingredient, ingredientIndex) => (
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
                              ここに編集フォーム
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
                          <DeleteButton />
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
