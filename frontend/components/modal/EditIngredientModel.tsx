import React, { useState } from "react";
import { Modal } from "./Modal";
import { Input } from "../atoms/form/Input";
import { EditSubmit } from "../atoms/form/EditSubmit";

export const EditIngredientModel = () => {
  // 原価を編集するモーダルとinputのstate
  const [ingredientOpen, setIngredientOpen] = useState(false);
  const [ingredientName, setIngredientName] = useState("");
  const [buyCost, setBuyCost] = useState("");
  const [buyQuantity, setBuyQuantity] = useState("");
  const [unit, setUnit] = useState("");

  const ingredientHandleSubmit = () => {
    console.log(
      `原材料名: ${ingredientName}, 買ったときの値段: ${buyCost}, 買ったときの数量: ${buyQuantity}, 単位: ${unit}`
    );

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
            <Input
              text="材料名"
              htmlfor="ingredientName"
              type="text"
              name="ingredientName"
              id="ingredientName"
              placeholder="原材料名"
              value={ingredientName}
              onChange={setIngredientName}
            />
          </div>
          <Input
            text="購入時価格"
            htmlfor="buyCost"
            type="text"
            name="buyCost"
            id="buyCost"
            placeholder="買ったときの値段"
            value={buyCost}
            onChange={setBuyCost}
          />
          <Input
            text="購入時数量"
            htmlfor="buyQuantity"
            type="number"
            name="buyQuantity"
            id="buyQuantity"
            placeholder="買ったときの数量"
            value={buyQuantity}
            onChange={setBuyQuantity}
          />
          <Input
            text="単位"
            htmlfor="unit"
            type="text"
            name="unit"
            id="unit"
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
