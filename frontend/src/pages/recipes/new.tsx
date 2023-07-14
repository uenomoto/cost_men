import React, { useState } from "react";
import { PrimaryButton } from "../../../components/atoms/button/PrimaryButton";
import { Input } from "../../../components/atoms/form/Input";
import { TagCheckBox } from "../../../components/molecules/checkbox/TagCheckBox";
import { Modal } from "../../../components/modal/Modal";

const RecipesNew = () => {
  const [open, setOpen] = useState(false);

  const [recipeName, setRecipeName] = useState("");
  return (
    <>
      <h1 className="text-2xl lg:text-3xl">レシピ新規登録</h1>
      <div className="flex items-center mt-5 w-96">
        <div className="w-full">
          <Input
            htmlfor="recipeName"
            text="レシピ名"
            type="text"
            placeholder="レシピ名を入力してください"
            name="recipeName"
            id="recipeName"
            value={recipeName}
            onChange={setRecipeName}
          />
        </div>
      </div>
      <div className="flex items-center justify-start mt-5 w-full">
        <p className="text-xl font-bold mr-7 ml-10 lg:ml-0">タグ</p>
        <PrimaryButton>
          <div onClick={() => setOpen(true)}>タグを追加</div>
        </PrimaryButton>
        <Modal open={open} setModalOpen={setOpen}>
          <div className="grid grid-cols-2 font-bold text-center">
            <div className="col-span-1">タグ登録</div>
            <div className="col-span-1">タグ一覧</div>
          </div>
        </Modal>
        <div className="flex ml-auto">
          <TagCheckBox />
        </div>
      </div>
    </>
  );
};

export default RecipesNew;
