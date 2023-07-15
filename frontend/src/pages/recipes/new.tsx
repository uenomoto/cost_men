import React, { FormEvent, useState } from "react";
import { Tag } from "@/types";
import { PrimaryButton } from "../../../components/atoms/button/PrimaryButton";
import { Input } from "../../../components/atoms/form/Input";
import { TagCheckBox } from "../../../components/molecules/checkbox/TagCheckBox";
import { Modal } from "../../../components/modal/Modal";
import { Submit } from "../../../components/atoms/form/Submit";
import { EditButton } from "../../../components/atoms/button/EditButton";
import { DeleteButton } from "../../../components/atoms/button/DeleteButton";
import { RecipesTable } from "../../../components/organisms/RecipesTable";
import { RecipeImage } from "../../../components/molecules/recipe-image/RecipeImage";

const tags: Tag[] = [
  {
    id: 1,
    name: "ラーメン",
  },
  {
    id: 2,
    name: "主食",
  },
  {
    id: 3,
    name: "上物",
  },
  {
    id: 4,
    name: "副菜",
  },
  {
    id: 5,
    name: "ごはんもの",
  },
  {
    id: 6,
    name: "なんか",
  },
  {
    id: 7,
    name: "なんか2",
  },
  {
    id: 8,
    name: "なんか3",
  },
  {
    id: 9,
    name: "なんか4",
  },
  {
    id: 10,
    name: "なんか5",
  },
  {
    id: 11,
    name: "なんか6",
  },
  {
    id: 12,
    name: "なんか7",
  },
];

const RecipesNew = () => {
  const [open, setOpen] = useState(false);

  const [recipeName, setRecipeName] = useState("");
  const [tagName, setTagName] = useState("");

  const tagHendleSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log(tagName);
    setTagName("");
  };

  return (
    <>
      <h1 className="text-2xl font-bold  lg:text-3xl">レシピ新規登録</h1>
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
      <RecipeImage />
      <div className="flex items-center justify-start mt-5 w-full">
        <p className="text-xl font-bold mr-7 ml-10 lg:ml-0">タグ</p>
        <PrimaryButton>
          <div onClick={() => setOpen(true)}>タグを追加</div>
        </PrimaryButton>
        <Modal open={open} setModalOpen={setOpen}>
          <div className="grid grid-cols-2 font-bold text-center w-full max-w-6xl m-auto p-3 lg:p-5">
            <div className="grid col-span-1 px-16">
              <h3>タグ登録</h3>
              <div className="mt-auto">
                <Input
                  htmlfor="tagName"
                  text="タグ名"
                  type="text"
                  placeholder="タグ名を入力してください"
                  name="tagName"
                  id="tagName"
                  value={tagName}
                  onChange={setTagName}
                />
              </div>
              <Submit text="登録" onClick={tagHendleSubmit} />
            </div>
            <div className="col-span-1 overflow-auto px-16 h-72">
              <h3 className="mb-5">タグ一覧</h3>
              <ul className="space-y-3">
                {tags.map((tag) => (
                  <li
                    className="grid grid-cols-3 items-center gap-4"
                    key={tag.id}
                  >
                    <span className="col-span-1">{tag.name}</span>
                    <EditButton>
                      <div className="col-span-1 text-xs">編集</div>
                    </EditButton>
                    <div className="text-xs">
                      <DeleteButton />
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Modal>
        <div className="flex ml-auto">
          <TagCheckBox />
        </div>
      </div>
      <RecipesTable />
    </>
  );
};

export default RecipesNew;
