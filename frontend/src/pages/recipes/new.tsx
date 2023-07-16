import React, { FormEvent, useState, useEffect } from "react";
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
import { Ingredient } from "@/types";
import { useRouter } from "next/router";

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

// 架空のデータ
const ingredients = [
  {
    id: 1,
    name: "にんじん",
    supplier_id: 1,
    buy_cost: 400,
    buy_quantity: 500,
    unit: "g",
  },
  {
    id: 2,
    name: "じゃがいも",
    supplier_id: 1,
    buy_cost: 700,
    buy_quantity: 1000,
    unit: "g",
  },
];

const suppliers = [
  {
    id: 1,
    user_id: 1,
    name: "上野商店",
    contact_info: "03-1234-5678",
  },
];

const RecipesNew = () => {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  // タグの名前登録とレシピの名前登録
  const [recipeName, setRecipeName] = useState("");
  const [tagName, setTagName] = useState("");

  // 子コンポーネント達の状態を管理する
  const [recipeImage, setRecipeImage] = useState<File | null>(null);
  const [checkedTags, setCheckedTags] = useState<Record<number, boolean>>({});
  const [recipes, setRecipes] = useState<Ingredient[]>([]);

  // タグ名送信
  const tagHendleSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log(tagName);
    setTagName("");
  };

  // 子コンポーネント(recipeTableForm)から渡されたレシピで状態を更新
  const handleRecipeChange = (recipe: Ingredient[]) => {
    setRecipes(recipe);
  };

  // recipeの送信(レシピ登録に対して必要な情報が全て詰まってる)
  const handleSubmissions = () => {
    const data = {
      recipeName,
      recipeImage,
      checkedTags,
      recipes,
    };
    // 送信処理本来はここでAPIを叩く
    console.log(data);

    // router.push("/recipes");
    setRecipeName("");
    setRecipeImage(null);
    setCheckedTags({});
    setRecipes([]);
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
      <div className="grid grid-cols-1 place-items-center md:grid-cols-2 lg:grid-cols-5">
        <RecipeImage onImageChange={setRecipeImage} />
        <PrimaryButton>
          <div onClick={() => setOpen(true)}>タグを追加</div>
        </PrimaryButton>
        <div className="lg:col-span-2">
          <TagCheckBox onTagCheckChange={setCheckedTags} />
        </div>
      </div>
      <RecipesTable
        ingredients={ingredients}
        suppliers={suppliers}
        onRecipeChange={handleRecipeChange}
      />
      <Submit text="登録" onClick={handleSubmissions} />

      <Modal open={open} setModalOpen={setOpen}>
        <div className="grid grid-cols-2 font-bold text-center w-full max-w-6xl m-auto p-3 lg:p-5">
          <div className="grid col-span-1 px-16">
            <h3 className="mb-16">タグ登録</h3>
            <div className="mb-11">
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
              <Submit text="タグ登録" onClick={tagHendleSubmit} />
            </div>
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
    </>
  );
};

export default RecipesNew;
