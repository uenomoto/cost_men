import React from "react";
import Image from "next/image";
import Link from "next/link";
import Head from "next/head";
import { useRouter } from "next/router";
import { SelectBox } from "../../../components/molecules/selectbox/SelectBox";
import { Pagination } from "../../../components/molecules/pagination/Pagination";
import { ChevronRightIcon } from "@heroicons/react/20/solid";

type Recipe = {
  id: number;
  name: string;
  total_cost: number;
  imageUrl: string;
  ingredients: RecipeIngredient[];
};

type Ingredient = {
  id: number;
  supplier_id: number;
  buy_cost: number;
  buy_quantity: number;
  unit: string;
  name: string;
};

type RecipeIngredient = {
  id: number;
  recipe_id: number;
  ingredient_id: number;
  quantity: number;
  ingredient: Ingredient;
};

const recipes: Recipe[] = [
  {
    id: 1,
    name: "レシピ1",
    total_cost: 1000,
    imageUrl: "/ramen.png",
    ingredients: [
      {
        id: 1,
        recipe_id: 1,
        ingredient_id: 1,
        quantity: 100.0,
        ingredient: {
          id: 1,
          supplier_id: 1,
          buy_cost: 300.0,
          buy_quantity: 100.0,
          unit: "g",
          name: "玉ねぎ",
        },
      },
      {
        id: 3,
        recipe_id: 1,
        ingredient_id: 2,
        quantity: 1000.0,
        ingredient: {
          id: 2,
          supplier_id: 2,
          buy_cost: 2000.0,
          buy_quantity: 1000.0,
          unit: "ml",
          name: "スープ",
        },
      },
      {
        id: 6,
        recipe_id: 1,
        ingredient_id: 2,
        quantity: 1000.0,
        ingredient: {
          id: 2,
          supplier_id: 2,
          buy_cost: 2000.0,
          buy_quantity: 1000.0,
          unit: "ml",
          name: "スープ",
        },
      },
      {
        id: 8,
        recipe_id: 1,
        ingredient_id: 2,
        quantity: 1000.0,
        ingredient: {
          id: 2,
          supplier_id: 2,
          buy_cost: 2000.0,
          buy_quantity: 1000.0,
          unit: "ml",
          name: "スープ",
        },
      },
      {
        id: 10,
        recipe_id: 1,
        ingredient_id: 2,
        quantity: 1000.0,
        ingredient: {
          id: 2,
          supplier_id: 2,
          buy_cost: 2000.0,
          buy_quantity: 1000.0,
          unit: "ml",
          name: "スープ",
        },
      },
      {
        id: 11,
        recipe_id: 1,
        ingredient_id: 2,
        quantity: 1000.0,
        ingredient: {
          id: 2,
          supplier_id: 2,
          buy_cost: 2000.0,
          buy_quantity: 1000.0,
          unit: "ml",
          name: "スープ",
        },
      },
      {
        id: 14,
        recipe_id: 1,
        ingredient_id: 2,
        quantity: 1000.0,
        ingredient: {
          id: 2,
          supplier_id: 2,
          buy_cost: 2000.0,
          buy_quantity: 1000.0,
          unit: "ml",
          name: "スープ",
        },
      },
      {
        id: 16,
        recipe_id: 1,
        ingredient_id: 2,
        quantity: 1000.0,
        ingredient: {
          id: 2,
          supplier_id: 2,
          buy_cost: 2000.0,
          buy_quantity: 1000.0,
          unit: "ml",
          name: "スープ",
        },
      },
      {
        id: 17,
        recipe_id: 1,
        ingredient_id: 2,
        quantity: 1000.0,
        ingredient: {
          id: 2,
          supplier_id: 2,
          buy_cost: 2000.0,
          buy_quantity: 1000.0,
          unit: "ml",
          name: "スープ",
        },
      },
    ],
  },
  {
    id: 2,
    name: "レシピ2",
    total_cost: 2000,
    imageUrl: "/docker_logo.png",
    ingredients: [
      {
        id: 2,
        recipe_id: 2,
        ingredient_id: 3,
        quantity: 3000,
        ingredient: {
          id: 3,
          supplier_id: 3,
          buy_cost: 5000.0,
          buy_quantity: 3000.0,
          unit: "g",
          name: "鯨",
        },
      },
    ],
  },
  {
    id: 3,
    name: "レシピ3",
    total_cost: 3000,
    imageUrl: "/ramen.png",
    ingredients: [
      {
        id: 3,
        recipe_id: 3,
        ingredient_id: 3,
        quantity: 3000,
        ingredient: {
          id: 4,
          supplier_id: 3,
          buy_cost: 1000.0,
          buy_quantity: 3000.0,
          unit: "g",
          name: "麺",
        },
      },
    ],
  },
];

const RecipesIndex = () => {
  const router = useRouter;

  const recipeCost: (recipe: Recipe) => number = (recipe) => {
    return recipe.ingredients.reduce(
      (total, ingredient) => total + ingredient.ingredient.buy_cost,
      0
    );
  };

  return (
    <>
      <Head>
        <title>CostMen</title>
        <meta name="description" content="一覧画面" />
      </Head>
      <SelectBox />
      <div className="grid grid-cols-1 lg:gap-10 xl:gap-64 sm:grid-cols-1 lg:grid-cols-2 mt-7">
        <ul className="grid-cols-1">
          {recipes.map((recipe: Recipe, index) => (
            <li key={recipe.id}>
              <Link href={`/recipes/${recipe.id}`}>
                <div className={`${index !== 0 ? "mt-24" : ""}`}>
                  <div className="text-left mt-10">
                    <div className="flex items-center mb-3">
                      <h2 className="xl:text-4xl md:text-2xl">{recipe.name}</h2>
                      <div className="ml-5">
                        <span className="inline-flex px-3 py-1 mr-2 rounded-full text-sm font-medium bg-red-100 text-red-800">
                          販売価格未定義
                        </span>
                        <span className="inline-flex px-3 py-1 rounded-full text-sm font-medium bg-red-100 text-red-800">
                          手順未定義
                        </span>
                      </div>
                    </div>
                    <span className="lg:hidden sm:inline-block px-3 py-1 mb-3 rounded-full text-md font-bold bg-sky-100 text-sky-800">
                      画像をタップして詳細画面へ
                    </span>
                    <Image
                      className="h-72 w-96 rounded-3xl object-cover"
                      src={recipe.imageUrl}
                      alt="めん"
                      width={500}
                      height={300}
                      priority
                    />
                  </div>
                </div>
              </Link>
            </li>
          ))}
        </ul>
        <div className="hidden lg:block">
          {recipes.map((recipe: Recipe, index) => (
            <div key={recipe.id}>
              <div className={`${index !== 0 ? "mt-24" : ""}`}>
                <ul className="divide-y divide-gray-100 overflow-auto bg-white h-96 mt-10 shadow-lg ring-1 ring-gray-900/5 rounded-xl">
                  <h2 className="border border-blue-100 text-lg">
                    <Link href={`/recipes/${recipe.id}`}>
                      {recipe.name}の材料一覧
                      <small className="text-xs text-gray-400 ml-1">
                        クリックして詳細へ
                      </small>
                    </Link>
                  </h2>
                  {recipe.ingredients.map((ingredient: RecipeIngredient) => (
                    <li
                      key={ingredient.id}
                      className="relative flex justify-between py-5 px-6 hover:bg-gray-100"
                    >
                      <div className="flex items-center min-w-0">
                        <p className="text-lg font-semibold leading-6 text-gray-900">
                          {ingredient.ingredient.name}
                        </p>
                      </div>
                      <div className="flex items-center gap-x-4">
                        <p className="text-lg text-gray-700">
                          {ingredient.quantity}
                          {ingredient.ingredient.unit}
                        </p>
                        {/* ↓本当は計算した数字が入る今回は買ったもの全部使った考えでいく */}
                        <div className="text-lg">
                          {ingredient.ingredient.buy_cost} 円
                        </div>
                        <div className="flex items-center">
                          <ChevronRightIcon
                            className="h-5 w-5 text-gray-400"
                            aria-hidden="true"
                          />
                        </div>
                      </div>
                    </li>
                  ))}
                  <div className="font-bold text-xl text-right mr-10">
                    原価合計金額: {recipeCost(recipe)}円
                  </div>
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Pagination />
    </>
  );
};

export default RecipesIndex;
