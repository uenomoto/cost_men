import React, { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { SupplierResponse } from "@/types";
import { IngredientResponse } from "@/types";
import { Ingredient } from "@/types";
import { Supplier } from "@/types";
import axios, { AxiosError, AxiosResponse } from "axios";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { tokenState } from "@/recoil/atoms/tokenState";
import { loadedState } from "@/recoil/atoms/loadedState";
import { errorMessageState } from "@/recoil/atoms/errorMessageState";
import { successMessageState } from "@/recoil/atoms/successMessageState";
import { suppliersState } from "@/recoil/atoms/suppliersState";
import { isSearchingState } from "@/recoil/atoms/isSearchingState";
import { warningMessageState } from "@/recoil/atoms/warningMessageState";
import { EditButton } from "../atoms/button/EditButton";
import { DeleteButton } from "../atoms/button/DeleteButton";
import { Modal } from "../modal/Modal";
import { PrimaryButton } from "../atoms/button/PrimaryButton";
import { SlideOver } from "../molecules/slide-overs/SlideOver";
import { AlertBadge } from "../atoms/badge/AlertBadge";
import { Input } from "../atoms/form/Input";
import { EditSubmit } from "../atoms/form/EditSubmit";
import { EnptyStates } from "../molecules/enptyStates/EnptyStates";
import { SearchTable } from "./SearchTable";
import { Loading } from "../molecules/loading/Loading";
import { WarningMessage } from "../atoms/messeage/WarningMessage";

const classNames = (...classes: (string | false)[]): string => {
  return classes.filter(Boolean).join(" ");
};

export const SupplierIngredientTable = () => {
  const [loading, setLoading] = useState(true);
  const setWarningMessage = useSetRecoilState(warningMessageState);
  const router = useRouter();

  // Recoilで仕入れ先と原材料の一覧を管理
  const [suppliers, setSuppliers] = useRecoilState(suppliersState);

  // 仕入れ先の原材料の編集フォームmodal
  const [supplierIngredienteditOpen, setSupplierIngredientEditOpen] = useState<
    number | null
  >(null);

  // 仕入れ先の編集フォームmodal
  const [supplierEditOpen, setSupplierEditOpen] = useState<number | null>(null);

  // 検索フォームのスライドオーバー
  const [slideOpen, setSlideOpen] = useState(false);

  // 仕入れ先の編集フォームイベントハンドラ
  const [editSupplierName, setEditSupplierName] = useState("");
  const [editSupplierContactInfo, setEditSupplierContactInfo] = useState("");

  // 原材料の編集フォームイベントハンドラ
  const [editName, setEditName] = useState("");
  const [editBuyCost, setEditBuyCost] = useState("");
  const [editBuyQuantity, setEditBuyQuantity] = useState("");
  const [editUnit, setEditUnit] = useState("");

  // RecoilのTokenを取得する
  const token = useRecoilValue(tokenState);
  const loaded = useRecoilValue(loadedState); // tokenのロード状態を取得
  const setErrorMessage = useSetRecoilState(errorMessageState);
  const setSuccessMessage = useSetRecoilState(successMessageState);
  const isSearching = useRecoilValue(isSearchingState); // 検索中かどうかを取得

  // 原材料の編集
  const editHandleSubmitIngredient = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const params = {
        ingredient: {
          name: editName,
          buy_cost: Number(editBuyCost),
          buy_quantity: Number(editBuyQuantity),
          unit: editUnit,
        },
      };
      const res: AxiosResponse<IngredientResponse> = await axios.patch(
        `${process.env.NEXT_PUBLIC_IP_ENDPOINT}/ingredients/${supplierIngredienteditOpen}`,
        params,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (res.status === 200) {
        setSuccessMessage("原材料の編集に成功しました");
        setErrorMessage(null);
        setSupplierIngredientEditOpen(null);

        // 原材料の編集に成功したら、仕入れ先情報を更新する
        const updatedSuppliers: Supplier[] = suppliers.map((suppliers) =>
          suppliers.id === res.data.ingredient.supplier_id
            ? {
                ...suppliers,
                ingredients: suppliers.ingredients.map((ingredient) =>
                  ingredient.id === res.data.ingredient.id
                    ? res.data.ingredient
                    : ingredient
                ),
              }
            : suppliers
        );
        setSuppliers(updatedSuppliers);
      }
    } catch (error: AxiosError | any) {
      setErrorMessage(error.response.data.errors);
      setSuccessMessage(null);
      setSupplierIngredientEditOpen(null);
    }
  };

  // 仕入れ先の編集
  const editHandleSubmitSupplier = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const params = {
        supplier: {
          name: editSupplierName,
          contact_info: editSupplierContactInfo,
        },
      };
      const res: AxiosResponse<SupplierResponse> = await axios.patch(
        `${process.env.NEXT_PUBLIC_IP_ENDPOINT}/suppliers/${supplierEditOpen}`,
        params,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (res.status === 200) {
        setSuccessMessage("仕入れ先の編集に成功しました");
        setErrorMessage(null);
        setSupplierEditOpen(null);

        const updatedSuppliers: Supplier[] = suppliers.map((supplier) =>
          supplier.id === res.data.supplier.id ? res.data.supplier : supplier
        );
        setSuppliers(updatedSuppliers);
      }
    } catch (error: AxiosError | any) {
      setErrorMessage(error.response.data.errors);
      setSuccessMessage(null);
      setSupplierEditOpen(null);
    }
  };

  // 仕入れ先の編集フォームに仕入れ先情報の値をセットする
  useEffect(() => {
    if (supplierEditOpen !== null) {
      const supplierToEdit = suppliers.find(
        (supplier) => supplier.id === supplierEditOpen
      );
      if (supplierToEdit) {
        setEditSupplierName(supplierToEdit.name);
        setEditSupplierContactInfo(supplierToEdit.contact_info);
      }
    } else {
      setEditSupplierName("");
      setEditSupplierContactInfo("");
    }
  }, [supplierEditOpen, suppliers]);

  // 原材料の編集フォームに原材料情報の値をセットする
  useEffect(() => {
    if (supplierIngredienteditOpen !== null) {
      const ingredientToEdit = suppliers
        .flatMap((supplier) => supplier.ingredients)
        .find((ingredient) => ingredient.id === supplierIngredienteditOpen);
      if (ingredientToEdit) {
        setEditName(ingredientToEdit.name);
        setEditBuyCost(String(ingredientToEdit.buy_cost));
        setEditBuyQuantity(String(ingredientToEdit.buy_quantity));
        setEditUnit(ingredientToEdit.unit);
      }
    } else {
      setEditName("");
      setEditBuyCost("");
      setEditBuyQuantity("");
      setEditUnit("");
    }
  }, [supplierIngredienteditOpen, suppliers]);

  const handleDelete = async (id: number) => {
    if (confirm("本当に削除しますか？") === false) return;
    try {
      // 仕入れ先の原材料のid取得
      const ingredientToDelete = suppliers
        .flatMap((supplier) => supplier.ingredients)
        .find((ingredient) => ingredient.id === id);

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

      if (ingredientToDelete) {
        setSuccessMessage(`${ingredientToDelete.name}の削除に成功しました`);
      } else {
        setSuccessMessage("原材料の削除に成功しました");
      }

      setErrorMessage(null);
    } catch (error: AxiosError | any) {
      setErrorMessage(error.response.data); // railsから返されたエラーメッセージをステートに格納
      setSuccessMessage(null);
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
    // if (!token || !loaded) return;
    setLoading(true);
    const getSuppliers = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_IP_ENDPOINT}/suppliers`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setSuppliers(res.data.suppliers); // APIから取得した仕入れ先情報をステートに格納
        setLoading(false);
        setErrorMessage(null);
      } catch (error: AxiosError | any) {
        setLoading(false);
        setErrorMessage(error.response.data.errors);
        setWarningMessage("3秒後にレシピ一覧ページに戻ります");
        setTimeout(() => {
          router.push("/recipes");
        }, 3000);
      }
    };
    getSuppliers();
  }, [token, loaded, router, setErrorMessage, setSuppliers, setWarningMessage]);

  return (
    <>
      <WarningMessage />
      <div className="mt-20">
        {loading ? (
          <Loading />
        ) : isSearching ? (
          <SearchTable />
        ) : suppliers.reduce(
            (total, supplier) => total + supplier.ingredients.length,
            0
          ) === 0 ? (
          <EnptyStates />
        ) : (
          ""
        )}

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
                        1/円
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
                                    <span
                                      className="text-md font-bold cursor-pointer lg:text-2xl"
                                      onClick={() =>
                                        setSupplierEditOpen(supplier.id)
                                      }
                                    >
                                      {supplier.name}
                                    </span>
                                  </div>
                                  {supplierEditOpen === supplier.id && (
                                    <Modal
                                      open={supplierEditOpen === supplier.id}
                                      setModalOpen={() =>
                                        setSupplierEditOpen(null)
                                      }
                                    >
                                      <div className="md:p-5">
                                        <h3 className="text-xl lg:text-3xl text-center font-semibold leading-6 text-gray-900">
                                          仕入れ先編集
                                        </h3>
                                        <div className="mt-5">
                                          <AlertBadge />
                                          <Input
                                            htmlfor="name"
                                            text="仕入れ先名"
                                            type="text"
                                            placeholder="仕入れ先名を入力してください"
                                            id="name"
                                            name="name"
                                            value={editSupplierName}
                                            onChange={setEditSupplierName}
                                          />
                                          <div className="text-left">
                                            <span className="inline-flex items-start rounded-full mb-3 bg-green-50 px-1.5 py-0.5 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                                              連絡先は後から登録できます
                                            </span>
                                          </div>
                                          <Input
                                            htmlfor="contact_info"
                                            text="連絡先"
                                            type="text"
                                            placeholder="連絡先を入力してください"
                                            id="contact_info"
                                            name="contact_info"
                                            value={editSupplierContactInfo}
                                            onChange={
                                              setEditSupplierContactInfo
                                            }
                                          />
                                        </div>
                                        <EditSubmit
                                          text="仕入れ先を編集する"
                                          onClick={editHandleSubmitSupplier}
                                        />
                                      </div>
                                    </Modal>
                                  )}
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
                                        text="原材料を編集する"
                                        onClick={editHandleSubmitIngredient}
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
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
