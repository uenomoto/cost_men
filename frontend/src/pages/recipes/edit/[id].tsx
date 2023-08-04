import React, { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Input } from "../../../../components/atoms/form/Input";
import { TagCheckBox } from "../../../../components/molecules/checkbox/TagCheckBox";
import { RecipesTable } from "../../../../components/organisms/RecipesTable";
import { RecipeImage } from "../../../../components/molecules/recipe-image/RecipeImage";
import { EditSubmit } from "../../../../components/atoms/form/EditSubmit";
import axios, { AxiosError, AxiosResponse } from "axios";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { recipeShowState } from "@/recoil/atoms/recipeShowState";
import { tokenState } from "@/recoil/atoms/tokenState";
import { successMessageState } from "@/recoil/atoms/successMessageState";
import { errorMessageState } from "@/recoil/atoms/errorMessageState";
import { uploadImageToS3 } from "../../../../utils/s3Upload";
import { recipeIngredientState } from "@/recoil/atoms/recipeIngredeintState";
import { Tag, TagResponse } from "@/types";
import { tagState } from "@/recoil/atoms/tagState";
import { editTagState } from "@/recoil/atoms/editTagState";

const RecipesEdit = () => {
  const recipeShow = useRecoilValue(recipeShowState);
  console.log(recipeShow);
  const token = useRecoilValue(tokenState);
  const setTags = useSetRecoilState<Tag[]>(tagState); // 全てのタグ一覧
  const [editTags, setEditTag] = useRecoilState(editTagState); // 登録されているタグ

  const setSuccessMessage = useSetRecoilState(successMessageState);
  const setErrorMessage = useSetRecoilState(errorMessageState);

  const router = useRouter();
  const { id } = router.query;

  // タグの名前登録とレシピの名前登録
  const [recipeEditName, setRecipeEditName] = useState(recipeShow.name);

  // 子コンポーネント達の状態を管理する
  const [recipeEditImageUrl, setRecipeEditImageUrl] = useState<string | null>(
    null
  );

  // レシピの原材料の状態管理
  const recipeIngredientsEditState = useRecoilValue(recipeIngredientState);
  const setRecipeIngredientsEdit = useSetRecoilState(recipeIngredientState);

  // railsに送るリクエストボディresipeIngredientsのデータ整形する
  const recipeIngredientsEdit = recipeIngredientsEditState.map(
    (ingredientData) => {
      return {
        id: ingredientData.ingredient.id,
        quantity: parseInt(ingredientData.quantity),
      };
    }
  );

  // 全てのタグ一覧取得
  useEffect(() => {
    const getTags = async () => {
      try {
        const res: AxiosResponse<TagResponse> = await axios.get(
          `${process.env.NEXT_PUBLIC_IP_ENDPOINT}/tags`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setTags(res.data.tags);
      } catch (error: AxiosError | any) {
        console.log(error.response.data.data);
      }
    };
    getTags();
  }, [token, setTags]);

  // 現在登録されているタグの状態を取得しオブジェクト化してeditTagStateにセットする
  useEffect(() => {
    const tagsCheck = recipeShow.tags.reduce(
      (acc, tag) => {
        return {
          ...acc, // accは初期値{}を引き継ぐ
          [tag.id]: true,
        };
      },
      {} as Record<number, boolean>
    );

    setEditTag(tagsCheck);
  }, [recipeShow.tags, setEditTag]);

  // 画像アップロード状況を追跡する
  const [uploadStatus, setUploadStates] = useState<{
    status: "idle" | "uploading" | "error";
    error?: Error | null;
  }>({ status: "idle", error: null });

  // S3に画像をアップロードしurlを取得する
  const handleFileChange = async (file: File | null) => {
    if (!file) return;
    setUploadStates({ status: "uploading" });

    try {
      const url = await uploadImageToS3(file);
      // s3のurlをrecipeImageにセット
      setRecipeEditImageUrl(url);
    } catch (error) {
      // しっかりとエラーをキャッチする(unknownではなくerrorとして)
      if (error instanceof Error) {
        setUploadStates({ status: "error", error });
      } else {
        setUploadStates({
          status: "error",
          error: new Error("アップロードに失敗しました"),
        });
      }
    }
  };

  // recipe編集のリクエストボディを作成する
  const handleEditSubmissions = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const requestBody = {
        recipe: {
          recipe_name: recipeEditName,
          recipe_image_url: recipeEditImageUrl, // ここでs3のurlをrailsに送る
          checked_tags: editTags,
          recipe_ingredients: recipeIngredientsEdit,
        },
      };
      console.log(requestBody);

      const res: AxiosResponse = await axios.patch(
        `${process.env.NEXT_PUBLIC_IP_ENDPOINT}/recipes/${id}`,
        requestBody,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (res.status === 201) {
        setSuccessMessage("レシピを編集しました");
        router.push(`recipes/${res.data.recipe.id}`);
        setRecipeEditName("");
        setRecipeEditImageUrl(null);
        setEditTag({});
        setRecipeIngredientsEdit([]);
      }
    } catch (error: AxiosError | any) {
      console.log(error.response.data.data);
      setErrorMessage(error.response.data.data);
    }
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
            value={recipeEditName}
            onChange={setRecipeEditName}
          />
        </div>
      </div>
      <div className="grid grid-cols-1 place-items-center md:grid-cols-2 lg:grid-cols-3">
        <RecipeImage onImageChange={handleFileChange} />
        {uploadStatus.status === "error" && (
          <p>エラーが発生しました: {uploadStatus.error?.message}</p>
        )}
        <div className="lg:col-span-1 md:col-span-2">
          <TagCheckBox />
        </div>
      </div>
      <RecipesTable />
      <EditSubmit text="レシピ編集" onClick={handleEditSubmissions} />
    </>
  );
};

export default RecipesEdit;
