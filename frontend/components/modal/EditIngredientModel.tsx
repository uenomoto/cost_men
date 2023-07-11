import React, { useState } from "react";
import { Modal } from "./Modal";
import { Input } from "../atoms/form/Input";
import { Label } from "../atoms/form/Label";
import { EditSubmit } from "../atoms/form/EditSubmit";

export const EditIngredientModel = () => {
  // 原価を編集するモーダルとinputのstate
  const [ingredientOpen, setIngredientOpen] = useState(false);
  const [ingredientName, setIngredientName] = useState("");
  const [buyCost, setBuyCost] = useState("");
  const [buyQuantity, setBuyQuantity] = useState("");
  const [unit, setUnit] = useState("");

  const ingredientHandleSubmit = () => {
    console.log(ingredientName, buyCost, buyQuantity, unit);

    setIngredientName("");
    setBuyCost("");
    setBuyQuantity("");
    setUnit("");
  };
  return (
    <>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={() => setIngredientOpen(true)}
      >
        原価を編集する
      </button>
      <Modal open={ingredientOpen} setModalOpen={setIngredientOpen}>
        <div className="text-center">
          <h3 className="text-3xl leading-6 font-medium text-gray-900">
            原価を編集する
          </h3>
        </div>
        <div className="p-7">
          <div className="">
            <Label text="name" />
            <Input
              type="text"
              placeholder="原材料名"
              value={ingredientName}
              onChange={setIngredientName}
            />
          </div>
          <Label text="値段" />
          <Input
            type="text"
            placeholder="買ったときの値段"
            value={buyCost}
            onChange={setBuyCost}
          />
          <Label text="数量" />
          <Input
            type="number"
            placeholder="買ったときの数量"
            value={buyQuantity}
            onChange={setBuyQuantity}
          />
          <Label text="単位" />
          <Input
            type="text"
            placeholder="単位"
            value={unit}
            onChange={setUnit}
          />
        </div>
        <EditSubmit
          text="編集する"
          onClick={() => {
            ingredientHandleSubmit();
            setIngredientOpen(false);
          }}
        />
      </Modal>
    </>
  );
};
