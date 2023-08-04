import React, { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Input } from "../../../../components/atoms/form/Input";
import { TagCheckBox } from "../../../../components/molecules/checkbox/TagCheckBox";
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
import { SelectedIngredient, Tag, TagResponse } from "@/types";
import { tagState } from "@/recoil/atoms/tagState";
import { editTagState } from "@/recoil/atoms/editTagState";
import { RecipesEditTable } from "../../../../components/organisms/RecipesEditTable";
import { WarningMessage } from "../../../../components/atoms/messeage/WarningMessage";
import { ErrorMessage } from "../../../../components/atoms/messeage/ErrorMessage";
import { SuccessMessage } from "../../../../components/atoms/messeage/SuccessMessage";

const RecipesEdit = () => {
  const recipeShow = useRecoilValue(recipeShowState);
  const token = useRecoilValue(tokenState);
  const setTags = useSetRecoilState<Tag[]>(tagState); // 全てのタグ一覧
  const [editTags, setEditTag] = useRecoilState(editTagState); // 登録されているタグ

  const setSuccessMessage = useSetRecoilState(successMessageState);
  const setErrorMessage = useSetRecoilState(errorMessageState);

  const router = useRouter();
  const { id } = router.query;

  // タグの名前登録とレシピの名前登録
  const [recipeEditName, setRecipeEditName] = useState(recipeShow.name);

  // RecipeImageコンポーネントから情報を受け取り管理する
  const [recipeEditImageUrl, setRecipeEditImageUrl] = useState<string | null>(
    recipeShow.image_aws_url
  );

  // レシピ原材料のデータをRecipesEditTableコンポーネントから受け取り管理する
  const [updatedRecipeIngredientsState, setUpdatedRecipeIngredients] = useState<
    SelectedIngredient[]
  >([]);

  // railsに送るリクエストボディresipeIngredientsのデータ整形する
  const updatedRecipeIngredients = updatedRecipeIngredientsState.map(
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
          recipe_ingredients: updatedRecipeIngredients,
        },
      };
      console.log(requestBody);

      const res: AxiosResponse = await axios.patch(
        `${process.env.NEXT_PUBLIC_IP_ENDPOINT}/recipes/${id}`,
        requestBody,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (res.status === 200) {
        setSuccessMessage("レシピを編集しました");
        router.push(`/recipes/${id}`);
        setRecipeEditName("");
        setRecipeEditImageUrl(null);
        setEditTag({});
        setUpdatedRecipeIngredients([]);
      }
    } catch (error: AxiosError | any) {
      setErrorMessage(error.response.data.data);
    }
  };

  return (
    <>
      <SuccessMessage />
      <ErrorMessage />
      <WarningMessage />
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
        <RecipeImage
          onImageChange={handleFileChange}
          initialImageUrl={recipeShow.image_aws_url}
        />
        {uploadStatus.status === "error" && (
          <p>エラーが発生しました: {uploadStatus.error?.message}</p>
        )}
        <div className="lg:col-span-1 md:col-span-2">
          <TagCheckBox />
        </div>
      </div>
      <RecipesEditTable setUpdatedIngredients={setUpdatedRecipeIngredients} />
      <div className="mt-5">
        <EditSubmit text="レシピ全体の編集" onClick={handleEditSubmissions} />
      </div>
    </>
  );
};

export default RecipesEdit;
