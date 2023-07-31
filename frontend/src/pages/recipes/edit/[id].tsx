import React, { FormEvent, useState } from "react";
import { useRouter } from "next/router";
import { Supplier, Tag } from "@/types";
import { Ingredient } from "@/types";
import { Input } from "../../../../components/atoms/form/Input";
import { TagCheckBox } from "../../../../components/molecules/checkbox/TagCheckBox";
import { RecipesTable } from "../../../../components/organisms/RecipesTable";
import { RecipeImage } from "../../../../components/molecules/recipe-image/RecipeImage";
import { EditSubmit } from "../../../../components/atoms/form/EditSubmit";

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

// 仮のデータ
let suppliers: Supplier[] = [
  {
    id: 1,
    user_id: 1,
    name: "上野商店",
    contact_info: "03-1234-5678",
    ingredients: [],
  },
];

const findSupplierById = (id: number) =>
  suppliers.find((supplier) => supplier.id === id);

// 仮のデータ
let ingredients: Ingredient[] = [
  {
    id: 1,
    name: "にんじん",
    supplier_id: 1,
    buy_cost: 400,
    buy_quantity: 500,
    unit: "g",
    supplier: findSupplierById(1) || suppliers[0],
  },
  {
    id: 2,
    name: "じゃがいも",
    supplier_id: 1,
    buy_cost: 700,
    buy_quantity: 1000,
    unit: "g",
    supplier: findSupplierById(1) || suppliers[0],
  },
];
// 仮のデータ
suppliers = suppliers.map((supplier) => ({
  ...supplier, // スプレット構文で展開することで、元のオブジェクトのプロパティをそのまま引き継ぐ
  ingredients: ingredients.filter(
    (ingredient) => ingredient.supplier_id === supplier.id
  ),
}));

const RecipesEdit = () => {
  const router = useRouter();

  // タグの名前登録とレシピの名前登録
  const [recipeName, setRecipeName] =
    useState("本来は登録されているレシピ名が入る");

  // 子コンポーネント達の状態を管理する
  const [recipeImage, setRecipeImage] = useState<File | null>(null);
  const [checkedTags, setCheckedTags] = useState<Record<number, boolean>>({});
  const [recipes, setRecipes] = useState<Ingredient[]>([]);

  // 子コンポーネント(recipeTableForm)から渡されたレシピで状態を更新
  const handleRecipeChange = (recipe: Ingredient[]) => {
    setRecipes(recipe);
  };

  // recipeの送信(レシピ登録に対して必要な情報が全て詰まってる)
  const handleEditSubmissions = (e: FormEvent) => {
    e.preventDefault();
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
      <h1 className="text-2xl font-bold  lg:text-3xl">レシピ編集画面</h1>
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
      <div className="grid grid-cols-1 place-items-center md:grid-cols-2 lg:grid-cols-3">
        <RecipeImage onImageChange={setRecipeImage} />

        <div className="lg:col-span-1 md:col-span-2">
          <TagCheckBox onTagCheckChange={setCheckedTags} />
        </div>
      </div>
      <RecipesTable
        ingredients={ingredients}
        suppliers={suppliers}
        onRecipeChange={handleRecipeChange}
      />
      <EditSubmit text="レシピ編集" onClick={handleEditSubmissions} />
    </>
  );
};

export default RecipesEdit;
