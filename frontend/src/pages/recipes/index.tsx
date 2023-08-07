import React, { useEffect, useState } from "react";
import { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import Head from "next/head";
import { useRouter } from "next/router";
import { useAuth0 } from "@auth0/auth0-react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { tokenState } from "../../recoil/atoms/tokenState";
import { loadedState } from "@/recoil/atoms/loadedState";
import { ChevronRightIcon } from "@heroicons/react/20/solid";
import { Ingredient, Recipe, RecipeIngredient, Tag } from "@/types";
import { SelectBox } from "../../../components/molecules/selectbox/SelectBox";
import { Pagination } from "../../../components/molecules/pagination/Pagination";
import axios, { AxiosError } from "axios";
import { Loading } from "../../../components/molecules/loading/Loading";
import { SuccessMessage } from "../../../components/atoms/messeage/SuccessMessage";
import { RecipeEnptyStates } from "../../../components/molecules/enptyStates/RecipeEnptyStates";

const RecipesIndex: NextPage = () => {
  // レシピ一覧を管理する
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);

  // トークンを取得して、RecoilのtokenStateにセットする
  const { isAuthenticated, isLoading, getAccessTokenSilently } = useAuth0();
  const setToken = useSetRecoilState(tokenState);
  const setLoaded = useSetRecoilState(loadedState);
  const token = useRecoilValue(tokenState);
  const loaded = useRecoilValue(loadedState);
  const router = useRouter();

  // ページネーション
  const [totalPages, setTotalPages] = useState(0);
  const currentPage = Number(router.query.page) || 1;

  // レシピをタグで絞り込む
  const [selected, setSelected] = useState<Tag | null>(null);

  // ログイン後にトークンを取得して、RecoilのtokenStateにセットする
  useEffect(() => {
    const getToken = async () => {
      try {
        if (!isAuthenticated && !isLoading) {
          router.push("/");
        } else {
          const accessToken = await getAccessTokenSilently({});
          setToken(accessToken);
          setLoaded(true); // ロード完了
        }
      } catch (e) {
        if (e instanceof Error) {
          console.log(e.message);
        }
      }
    };
    getToken();
  }, [
    getAccessTokenSilently,
    setToken,
    setLoaded,
    isAuthenticated,
    isLoading,
    router,
  ]);

  // レシピ一覧とページング情報を取得する
  useEffect(() => {
    const getRecipes = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_IP_ENDPOINT}/recipes?page=${currentPage}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setRecipes(res.data.recipes);
        setTotalPages(res.data.meta.total_pages); // ページネーションの総ページ数
        setLoading(false);
      } catch (e: AxiosError | any) {
        console.log(e.message);
      }
    };
    if (loaded) {
      getRecipes();
    }
  }, [token, setRecipes, currentPage, loaded]);

  // レシピ一覧をタグでフィルタリングする
  const filteredRecipes = recipes.filter((recipe: Recipe) => {
    if (selected === null) {
      return recipe;
    } else {
      // selectedが選ばれた場合tagのidと一致するレシピを返す
      return recipe.tags.some((tag: Tag) => tag.id === selected.id);
    }
  });

  // 1つの原材料の単価(1/円)を計算する
  const costCalculation = (ingredient: Ingredient) => {
    return (
      Math.round((ingredient.buy_cost / ingredient.buy_quantity) * 10) / 10
    );
  };

  // 1つの原材料の合計金額を計算する(subtotal)
  const calculateIngredientCost = (recipeIngredient: RecipeIngredient) => {
    const quantity = Number(recipeIngredient.quantity);
    // 1つの原材料の単価(1/円)をcost定数に代入
    const cost = costCalculation(recipeIngredient.ingredient);
    return Math.round((quantity * cost * 10) / 10); // 小数点第一位で四捨五入で計算
  };

  return (
    <>
      <Head>
        <title>CostMen</title>
        <meta name="description" content="一覧画面" />
      </Head>
      <SelectBox setTagSelectde={setSelected} />
      <SuccessMessage />
      {recipes.length === 0 && !loading && <RecipeEnptyStates />}
      {loading ? (
        <Loading />
      ) : (
        <div className="grid grid-cols-1 gap-10 xl:gap-64 sm:grid-cols-1 lg:grid-cols-2 mt-7">
          <ul className="grid-cols-1">
            {(selected === null ? recipes : filteredRecipes).map(
              (recipe: Recipe, index) => (
                <li key={recipe.id}>
                  <Link href={`/recipes/${recipe.id}`}>
                    <div className={`${index !== 0 ? "mt-24" : ""}`}>
                      <div className="text-left mt-10">
                        <div className="flex items-center mb-3">
                          <h2 className="xl:text-2xl md:text-xl font-bold">
                            {recipe.name}
                          </h2>
                        </div>
                        <span className="lg:hidden sm:inline-block px-3 py-1 mb-3 rounded-full text-md font-bold bg-sky-100 text-sky-800">
                          画像をタップして詳細画面へ
                        </span>
                        <Image
                          className="rounded-3xl transition-transform duration-500 hover:scale-105 hover:opacity-90"
                          src={recipe.image_aws_url}
                          alt="recipe-image"
                          width={400}
                          height={300}
                        />
                      </div>
                    </div>
                  </Link>
                </li>
              )
            )}
          </ul>
          <div className="hidden lg:block">
            {(selected === null ? recipes : filteredRecipes).map(
              (recipe: Recipe, index) => (
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
                      {recipe.recipe_ingredients.map(
                        (recipe_ingredient: RecipeIngredient) => (
                          <li
                            key={recipe_ingredient.id}
                            className="relative flex justify-between py-5 px-6 hover:bg-gray-100"
                          >
                            <div className="flex items-center min-w-0">
                              <p className="text-lg font-semibold pr-3 leading-6 text-gray-900">
                                {recipe_ingredient.ingredient.name}
                              </p>
                            </div>
                            <div className="flex items-center gap-x-4">
                              <p className="text-lg text-gray-700">
                                {recipe_ingredient.quantity}
                                {recipe_ingredient.ingredient.unit}
                              </p>
                              <div className="text-lg">
                                {calculateIngredientCost(recipe_ingredient)} 円
                              </div>
                              <div className="flex items-center">
                                <ChevronRightIcon
                                  className="h-5 w-5 text-gray-400"
                                  aria-hidden="true"
                                />
                              </div>
                            </div>
                          </li>
                        )
                      )}
                      <div className="font-bold text-xl text-right mr-10">
                        原価合計金額: {recipe.total_cost}円
                      </div>
                    </ul>
                  </div>
                </div>
              )
            )}
          </div>
        </div>
      )}

      <Pagination currentPage={currentPage} totalPages={totalPages} />
    </>
  );
};

export default RecipesIndex;
