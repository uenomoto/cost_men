import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { Ingredient, IngredientResponse, SupplierSelect } from "@/types";
import axios, { AxiosError, AxiosResponse } from "axios";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { tokenState } from "@/recoil/atoms/tokenState";
import { loadedState } from "@/recoil/atoms/loadedState";
import { errorMessageState } from "@/recoil/atoms/errorMessageState";
import { successMessageState } from "@/recoil/atoms/successMessageState";
import { suppliersState } from "@/recoil/atoms/suppliersState";
import { Input } from "../../atoms/form/Input";
import { AlertBadge } from "../../atoms/badge/AlertBadge";
import { SuppliersSelectBox } from "../selectbox/SuppliersSelectBox";
import { Submit } from "../../atoms/form/Submit";

type ValidationErrorState = {
  name?: string;
  unit?: string;
  buy_cost?: string;
  buy_quantity?: string;
};

export const IngredidentForm = () => {
  // Recoilでグローバルに管理している仕入れ先のリストを取得
  const [suppliers, setSuppliers] = useRecoilState(suppliersState);
  const [dbOperationLoading, setDbOperationLoading] = useState<boolean>(false);

  // バリデーションエラーを格納するステート
  const [validationErrors, setValidationErrors] =
    useState<ValidationErrorState>({});

  const [ingredientName, setName] = useState<string>("");
  const [buyCost, setBuyCost] = useState<string>("");
  const [buyQuantity, setBuyQuantity] = useState<string>("");
  const [unit, setUnit] = useState<string>("");

  // ユーザーが選択した仕入れ先の情報を保持する
  const [selectedSupplier, setSelectedSupplier] =
    useState<SupplierSelect | null>(null);
  // apiから取得した仕入れ先のリストを保持する
  const [suppliersList, setSuppliersList] = useState<SupplierSelect[]>([]);

  const token = useRecoilValue(tokenState);
  const loaded = useRecoilValue(loadedState);
  const setErrorMessage = useSetRecoilState(errorMessageState);
  const setSuccessMessage = useSetRecoilState(successMessageState);

  // 仕入れ先のセレクトボックスのためのデータを取得する
  useEffect(() => {
    if (!token || !loaded) return;
    const getSuppiersSelect = async () => {
      try {
        const res: AxiosResponse = await axios.get(
          `${process.env.NEXT_PUBLIC_IP_ENDPOINT}/suppliers/select_index`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setSuppliersList(res.data.suppliers); // suppliersのリストをステートに設定
        setSelectedSupplier(res.data.suppliers[0]); // 最初の仕入れ先を選択状態に設定
      } catch (error: AxiosError | any) {
        console.log(error);
        setErrorMessage("仕入れ先の取得に失敗しました");
      }
    };
    if (loaded) {
      getSuppiersSelect();
    }
  }, [token, loaded, setErrorMessage]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setDbOperationLoading(true);
    const params = {
      ingredient: {
        name: ingredientName,
        buy_cost: Number(buyCost),
        buy_quantity: Number(buyQuantity),
        unit: unit,
        supplier_id: selectedSupplier ? selectedSupplier.id : null,
      },
    };
    try {
      const res: AxiosResponse<IngredientResponse> = await axios.post(
        `${process.env.NEXT_PUBLIC_IP_ENDPOINT}/ingredients`,
        params,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (res.status === 201) {
        setName("");
        setBuyCost("");
        setBuyQuantity("");
        setUnit("");

        // 仕入れ先と原材料の一覧をグローバルステートに反映させる
        const updatedSuppliers = suppliers.map((supplier) =>
          supplier.id === res.data.ingredient.supplier_id
            ? {
                ...supplier,
                ingredients: [...supplier.ingredients, res.data.ingredient],
              }
            : supplier
        );
        setSuppliers(updatedSuppliers);
        setSuccessMessage("原材料を登録しました");
      }
    } catch (error: AxiosError | any) {
      if (error.response && error.response.data.errors) {
        setValidationErrors(error.response.data.errors);
      }
    } finally {
      setDbOperationLoading(false);
    }
  };

  // 入力したその時に値を監視し送信ボタンを押さなくても、一度フォーカスしてフォーカスが外れた場合、入力必須バリデーションを実行
  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    const nameValue = e.target.value;
    setName(nameValue);

    if (!nameValue) {
      setValidationErrors((prev) => ({ ...prev, name: "入力必須項目です" }));
    } else {
      setValidationErrors((prev) => ({ ...prev, name: undefined }));
    }
  };

  const handleUnitChange = (e: ChangeEvent<HTMLInputElement>) => {
    const unitValue = e.target.value;
    setUnit(unitValue);

    if (
      unitValue !== "g" &&
      unitValue !== "cc" &&
      unitValue !== "ml" &&
      unitValue !== "個"
    ) {
      setValidationErrors((prev) => ({
        ...prev,
        unit: "正しい単位で入力してください",
      }));
    } else {
      setValidationErrors((prev) => ({ ...prev, unit: undefined }));
    }
  };

  // 1以下の数値が入力されたらバリデーションエラーを表示
  const handleBuyCostChange = (e: ChangeEvent<HTMLInputElement>) => {
    const buyCostValue = e.target.value;
    setBuyCost(buyCostValue);

    if (Number(buyCostValue) <= 0) {
      setValidationErrors((prev) => ({
        ...prev,
        buy_cost: "1以上の数値を入力してください",
      }));
    } else {
      setValidationErrors((prev) => ({ ...prev, buy_cost: undefined }));
    }
  };

  // フロント側でバリデーションを実行
  const handleBuyQuantityChange = (e: ChangeEvent<HTMLInputElement>) => {
    const buyQuantityValue = e.target.value;
    setBuyQuantity(buyQuantityValue);

    if (Number(buyQuantityValue) <= 0) {
      setValidationErrors((prev) => ({
        ...prev,
        buy_quantity: "1以上の数値を入力してください",
      }));
    } else {
      setValidationErrors((prev) => ({ ...prev, buy_quantity: undefined }));
    }
  };

  return (
    <div className="mt-5 bg-gray-200 shadow-lg rounded-2xl">
      <div className="px-4 py-5 sm:p-6">
        <h3 className="text-base font-semibold leading-6 text-gray-900">
          原材料登録
        </h3>
        <div className="mt-2 max-w-xl text-sm text-gray-500">
          <p>こちらから原材料と購入時の値段、数量が登録できます</p>
        </div>
        <div className="mt-3">
          <SuppliersSelectBox
            selected={selectedSupplier}
            setSelected={setSelectedSupplier}
            suppliers={suppliersList}
          />
        </div>
        <div className="mt-5 grid gap-1 grid-cols-2">
          <div className="col-span-1">
            <AlertBadge text="入力必須" />
            <Input
              htmlfor="name"
              text="原材料名"
              type="text"
              placeholder="原材料名を入力してください"
              id="name"
              name="name"
              value={ingredientName}
              onChange={handleNameChange}
              onBlur={handleNameChange}
              validationErrors={
                validationErrors.name ? validationErrors.name : null
              }
            />
            <AlertBadge text="半角英数字 入力必須" />
            <Input
              htmlfor="buy_quantity"
              text="購入時の数量"
              type="number"
              placeholder="購入時の数量を入力 例: 1000"
              id="buy_quantity"
              name="buy_quantity"
              value={buyQuantity}
              onChange={handleBuyQuantityChange}
              onBlur={handleBuyQuantityChange}
              validationErrors={
                validationErrors.buy_quantity
                  ? validationErrors.buy_quantity
                  : null
              }
            />
          </div>
          <div className="col-span-1">
            <AlertBadge text="半角英数字 入力必須" />
            <Input
              htmlfor="buy_cost"
              text="購入時の値段"
              type="number"
              placeholder="購入時の値段を入力 例: 700"
              id="buy_cost"
              name="buy_cost"
              value={buyCost}
              onChange={handleBuyCostChange}
              onBlur={handleBuyCostChange}
              validationErrors={
                validationErrors.buy_cost ? validationErrors.buy_cost : null
              }
            />
            <AlertBadge text="入力必須" />
            <Input
              htmlfor="unit"
              text="単位"
              type="text"
              placeholder="単位を入力してください 例: g"
              id="unit"
              name="unit"
              value={unit}
              onChange={handleUnitChange}
              onBlur={handleUnitChange}
              validationErrors={
                validationErrors.unit ? validationErrors.unit : null
              }
            />
          </div>
        </div>
        <Submit
          text="登録する"
          onClick={handleSubmit}
          disabled={dbOperationLoading}
        />
      </div>
    </div>
  );
};
