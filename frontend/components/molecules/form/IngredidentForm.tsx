import React, { FormEvent, useState } from "react";
import { Input } from "../../atoms/form/Input";
import { SaveButton } from "../../atoms/form/SaveSubmit";
import { AlertBadge } from "../../atoms/badge/AlertBadge";
import { SuppliersSelectBox } from "../selectbox/SuppliersSelectBox";
import { SupplierSelect } from "@/types";

const suppliers: SupplierSelect[] = [
  { id: 1, name: "上野商店(直接)" },
  { id: 2, name: "あいうえお商店" },
  { id: 3, name: "ダミー仕入れ先3" },
  { id: 4, name: "ダミー仕入れ先4" },
  { id: 5, name: "ダミー仕入れ先5" },
  { id: 6, name: "ダミー仕入れ先6" },
  { id: 7, name: "ダミー仕入れ先7" },
  { id: 8, name: "ダミー仕入れ先8" },
  { id: 9, name: "ダミー仕入れ先9" },
  { id: 10, name: "ダミー仕入れ先10" },
];

export const IngredidentForm = () => {
  const [valueName, setValueName] = useState("");
  const [valueBuyCost, setValueBuyCost] = useState("");
  const [valueBuyQuantity, setValueBuyQuantity] = useState("");
  const [valueUnit, setValueUnit] = useState("");
  const [selectedSupplier, setSelectedSupplier] = useState(suppliers[0]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(
      `原材料名:${valueName}, 購入時の値段:${valueBuyCost}, 購入時の数量:${valueBuyQuantity}, 単位:${valueUnit}, 仕入れ先: ${selectedSupplier.name}`
    );
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
            suppliers={suppliers}
          />
        </div>
        <form onSubmit={handleSubmit} className="mt-5">
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
                value={valueName}
                onChange={setValueName}
              />
              <AlertBadge />
              <Input
                htmlfor="buy_quantity"
                text="購入時の数量"
                type="number"
                placeholder="購入時の数量を入力"
                id="buy_quantity"
                name="buy_quantity"
                value={valueBuyQuantity}
                onChange={setValueBuyQuantity}
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
                value={valueBuyCost}
                onChange={setValueBuyCost}
              />
              <AlertBadge />
              <Input
                htmlfor="unit"
                text="単位"
                type="text"
                placeholder="単位を入力してください"
                id="unit"
                name="unit"
                value={valueUnit}
                onChange={setValueUnit}
              />
            </div>
          </div>
          <SaveButton>登録する</SaveButton>
        </form>
      </div>
    </div>
  );
};
