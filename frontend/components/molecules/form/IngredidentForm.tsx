import React, { FormEvent, useEffect, useState } from "react";
import { SupplierSelect } from "@/types";
import axios from "axios";
import { useRecoilValue } from "recoil";
import { tokenState } from "@/recoil/atoms/tokenState";
import { loadedState } from "@/recoil/atoms/loadedState";
import { Input } from "../../atoms/form/Input";
import { SaveButton } from "../../atoms/form/SaveSubmit";
import { AlertBadge } from "../../atoms/badge/AlertBadge";
import { SuppliersSelectBox } from "../selectbox/SuppliersSelectBox";
import { Submit } from "../../atoms/form/Submit";

export const IngredidentForm = () => {
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

  // 仕入れ先のセレクトボックスのためのデータを取得する
  useEffect(() => {
    if (!token || !loaded) return;
    const getSuppiersSelect = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_IP_ENDPOINT}/suppliers/select_index`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setSuppliersList(res.data.suppliers); // suppliersのリストをステートに設定
        setSelectedSupplier(res.data.suppliers[0]); // 最初の仕入れ先を選択状態に設定
      } catch (error) {
        console.log(error);
      }
    };
    if (loaded) {
      getSuppiersSelect();
    }
  }, [token, loaded]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const params = {
      ingredient: {
        name: ingredientName,
        buy_cost: Number(buyCost),
        buy_quantity: Number(buyQuantity),
        unit: unit,
        supplier_id: selectedSupplier ? selectedSupplier.id : null,
      },
    };
    console.log(params);

    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_IP_ENDPOINT}/ingredients`,
        params,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setName("");
      setBuyCost("");
      setBuyQuantity("");
      setUnit("");
    } catch (error) {
      console.log(error);
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
            <AlertBadge />
            <Input
              htmlfor="name"
              text="原材料名"
              type="text"
              placeholder="原材料名を入力してください"
              id="name"
              name="name"
              value={ingredientName}
              onChange={setName}
            />
            <AlertBadge />
            <Input
              htmlfor="buy_quantity"
              text="購入時の数量"
              type="number"
              placeholder="購入時の数量を入力"
              id="buy_quantity"
              name="buy_quantity"
              value={buyQuantity}
              onChange={setBuyQuantity}
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
              value={buyCost}
              onChange={setBuyCost}
            />
            <AlertBadge />
            <Input
              htmlfor="unit"
              text="単位"
              type="text"
              placeholder="単位を入力してください"
              id="unit"
              name="unit"
              value={unit}
              onChange={setUnit}
            />
          </div>
        </div>
        <Submit text="登録する" onClick={handleSubmit} />
      </div>
    </div>
  );
};
