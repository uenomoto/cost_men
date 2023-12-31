import React, { FormEvent, useState, useEffect, ChangeEvent } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import { TagResponse } from "@/types";
import axios, { AxiosError, AxiosResponse } from "axios";
import { tokenState } from "@/recoil/atoms/tokenState";
import { tagState } from "@/recoil/atoms/tagState";
import { successMessageState } from "@/recoil/atoms/successMessageState";
import { errorMessageState } from "@/recoil/atoms/errorMessageState";
import { recipeIngredientState } from "@/recoil/atoms/recipeIngredeintState";
import { warningMessageState } from "@/recoil/atoms/warningMessageState";
import { XCircleIcon } from "@heroicons/react/20/solid";
import { PrimaryButton } from "../../../components/atoms/button/PrimaryButton";
import { Input } from "../../../components/atoms/form/Input";
import { TagCheckBox } from "../../../components/molecules/checkbox/TagCheckBox";
import { Modal } from "../../../components/modal/Modal";
import { Submit } from "../../../components/atoms/form/Submit";
import { DeleteButton } from "../../../components/atoms/button/DeleteButton";
import { RecipesTable } from "../../../components/organisms/RecipesTable";
import { RecipeImage } from "../../../components/molecules/recipe-image/RecipeImage";
import { uploadImageToS3 } from "../../../utils/s3Upload";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { SuccessMessage } from "../../../components/atoms/messeage/SuccessMessage";
import { ErrorMessage } from "../../../components/atoms/messeage/ErrorMessage";
import { Loading } from "../../../components/molecules/loading/Loading";
import { WarningMessage } from "../../../components/atoms/messeage/WarningMessage";
import { DeleteModal } from "../../../components/modal/DeleteModal";
import { AlertBadge } from "../../../components/atoms/badge/AlertBadge";
import { LoadingSpinner } from "../../../components/molecules/loading/LoadingSpinner";

type TagValidationErrorState = {
  name?: string;
};

const RecipesNew = () => {
  // タグ追加のモーダルを開く
  const [open, setOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true); // tag一覧取得のロード
  const [tagDbOperationLoading, setTagDbOperationLoading] =
    useState<boolean>(false);
  const [tagDbEditOperationLoading, setTagDbEditOperationLoading] =
    useState<boolean>(false);

  // レシピ登録のローディング
  const [recipeDbOperationLoading, setRecipeDbOperationLoading] =
    useState<boolean>(false);

  const router = useRouter();

  // タグの名前登録とレシピの名前登録
  const [recipeName, setRecipeName] = useState("");
  const [tagName, setTagName] = useState("");
  // タグ編集
  const [editTagId, setEditTagId] = useState<number | null>(null);
  const [editTagName, setEditTagName] = useState("");
  // タグ削除
  const [confirmDelete, setConfirmDelete] = useState<
    (() => Promise<void>) | null
  >(null);
  // delete用のモーダル
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  // トークンを取得
  const token = useRecoilValue(tokenState);
  // タグの一覧を管理
  const [tags, setTags] = useRecoilState(tagState);
  const setSuccessMessage = useSetRecoilState(successMessageState);
  const setErrorMessage = useSetRecoilState(errorMessageState);
  const setWarningMessage = useSetRecoilState(warningMessageState);

  // タグのバリデーション
  const [tagValidationError, setTagValidationError] =
    useState<TagValidationErrorState>({ name: "" });

  // 画像アップロード状況を追跡する
  const [uploadStatus, setUploadStates] = useState<{
    status: "idle" | "uploading" | "error";
    error?: Error | null;
  }>({ status: "idle", error: null });

  const s3Url = process.env.NEXT_PUBLIC_S3_URL;
  // 子コンポーネント達の状態を管理する,TypeScriptからだと.envがあるのかわからないためどうしてもnull使ってしまいました。。
  const [recipeImageUrl, setRecipeImageUrl] = useState<string | null>(
    s3Url || ""
  );

  const [checkedTags, setCheckedTags] = useState<Record<number, boolean>>({});

  // レシピの原材料の状態管理
  const recipeIngredientsState = useRecoilValue(recipeIngredientState);
  const setRecipeIngredients = useSetRecoilState(recipeIngredientState);

  // railsに送るリクエストボディresipeIngredientsのデータ整形する
  const recipeIngredients = recipeIngredientsState.map((ingredientData) => {
    return {
      id: ingredientData.ingredient.id,
      quantity: parseInt(ingredientData.quantity),
    };
  });

  // タグフロント側のバリデーション
  const handleTagChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setTagName(value);

    if (value.length > 20) {
      setTagValidationError((prev) => ({
        ...prev,
        name: "20文字以内で入力してください",
      }));
    } else if (!value) {
      setTagValidationError((prev) => ({
        ...prev,
        name: "タグ名を入力してください",
      }));
    } else if (value.match(/\s+/)) {
      setTagValidationError((prev) => ({
        ...prev,
        name: "空白は入力できません",
      }));
    } else {
      setTagValidationError((prev) => ({ ...prev, name: undefined }));
    }
  };

  // タグのバリデーションエラーがあれば登録ボタンを押せないようにする
  const isTagSubmitDisabled = Object.values(tagValidationError).some(
    (error) => error !== undefined
  );

  // タグ登録
  const tagHendleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setTagDbOperationLoading(true);

    const params = {
      tag: {
        name: tagName,
      },
    };

    try {
      const res: AxiosResponse<TagResponse> = await axios.post(
        `${process.env.NEXT_PUBLIC_IP_ENDPOINT}/tags`,
        params,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (res.status === 201) {
        const updatedTags = [...tags, res.data.tag];
        setTags(updatedTags);
        setTagName("");
        setSuccessMessage("タグを登録しました");
        setTagValidationError({ name: "" });
      }
    } catch (error: AxiosError | any) {
      setTagValidationError(error.response.data.errors);
    } finally {
      setTagDbOperationLoading(false);
    }
  };

  // タグ一覧取得
  useEffect(() => {
    const getTags = async () => {
      try {
        const res: AxiosResponse<TagResponse> = await axios.get(
          `${process.env.NEXT_PUBLIC_IP_ENDPOINT}/tags`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setTags(res.data.tags);
        setLoading(false);
      } catch (error: AxiosError | any) {
        setErrorMessage(error.response.data.errors);
        setLoading(false);
        setWarningMessage("3秒後にレシピ一覧ページに戻ります");
        setTimeout(() => {
          router.push("/recipes");
        }, 3000);
      }
    };
    getTags();
  }, [token, router, setTags, setErrorMessage, setWarningMessage]);

  // タグ削除
  const handleDelete = (id: number) => {
    const deleteTag = async () => {
      const tagFind = tags.find((tag) => tag.id === id);
      try {
        await axios.delete(
          `${process.env.NEXT_PUBLIC_IP_ENDPOINT}/tags/${id}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setTags(tags.filter((tag) => tag.id !== id));
        if (tagFind) {
          setSuccessMessage(`${tagFind.name}を削除しました`);
        }
      } catch (error: AxiosError | any) {
        setErrorMessage(error.response.data.errors);
      } finally {
        setDeleteModalOpen(false);
      }
    };

    setConfirmDelete(() => deleteTag);
    setDeleteModalOpen(true);
  };

  // タグを編集
  const editHandleSubmitTagName = async (e: FormEvent, id: number) => {
    e.preventDefault();
    setTagDbEditOperationLoading(true);

    try {
      const params = {
        tag: {
          name: editTagName,
        },
      };
      const res: AxiosResponse<TagResponse> = await axios.patch(
        `${process.env.NEXT_PUBLIC_IP_ENDPOINT}/tags/${id}`,
        params,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (res.status === 200) {
        const updatedTags = tags.map((tag) =>
          tag.id === id ? res.data.tag : tag
        );
        setTags(updatedTags);
        setSuccessMessage("タグを編集しました");
        setEditTagId(null);
      }
    } catch (error: AxiosError | any) {
      setErrorMessage(error.response.data.errors);
    } finally {
      setTagDbEditOperationLoading(false);
    }
  };

  // S3に画像をアップロードしurlを取得する
  const handleFileChange = async (file: File | null) => {
    if (!file) return;
    setUploadStates({ status: "uploading" });

    try {
      const url = await uploadImageToS3(file);
      // s3のurlをrecipeImageにセット
      setRecipeImageUrl(url);
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

  // recipeの送信(レシピ登録に対して必要な情報が全て詰まってる)
  const handleSubmissions = async (e: FormEvent) => {
    e.preventDefault();
    setRecipeDbOperationLoading(true);
    try {
      const requestBody = {
        recipe: {
          recipe_name: recipeName,
          recipe_image_url: recipeImageUrl, // ここでs3のurlをrailsに送る
          checked_tags: checkedTags,
          recipe_ingredients: recipeIngredients,
        },
      };
      // console.log(requestBody);

      const res: AxiosResponse = await axios.post(
        `${process.env.NEXT_PUBLIC_IP_ENDPOINT}/recipes`,
        requestBody,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (res.status === 201) {
        setSuccessMessage("レシピを登録しました");
        router.push("/recipes");
        setRecipeName("");
        setRecipeImageUrl(s3Url || "");
        setCheckedTags({});
        setRecipeIngredients([]);
      }
    } catch (error: AxiosError | any) {
      setErrorMessage(error.response.data.data);
    } finally {
      setRecipeDbOperationLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>レシピ新規登録</title>
        <meta name="description" content="レシピ作成" />
      </Head>
      <SuccessMessage />
      <ErrorMessage />
      <WarningMessage />
      <h1 className="text-2xl font-bold  lg:text-3xl">レシピ新規登録</h1>
      <div className="flex items-center mt-5 w-96">
        <div className="w-full">
          <AlertBadge text="入力必須" />
          <Input
            htmlfor="recipeName"
            text="レシピ名"
            type="text"
            placeholder="レシピ名を入力してください"
            name="recipeName"
            id="recipeName"
            value={recipeName}
            onChange={(e) => setRecipeName(e.target.value)}
          />
        </div>
      </div>
      <div className="mr-0 lg:mr-96">
        <p className="text-xs text-gray-500 font-bold mb-1 mt-5">
          ※保存すると画像size
          <span className="text-red-500">横400px縦350pxにリサイズ</span>します。
        </p>
      </div>
      <div className="grid grid-cols-1 place-items-center md:grid-cols-2 lg:grid-cols-5">
        <RecipeImage onImageChange={handleFileChange} />
        {uploadStatus.status === "error" && (
          <p>エラーが発生しました: {uploadStatus.error?.message}</p>
        )}
        <PrimaryButton text="タグを追加" onClick={() => setOpen(true)} />
        <div className="lg:col-span-2">
          <TagCheckBox onTagCheckChange={setCheckedTags} />
        </div>
      </div>
      <RecipesTable />
      <div className="mt-5 pb-5">
        <Submit
          text="登録"
          onClick={handleSubmissions}
          disabled={recipeDbOperationLoading}
          dbOperationLoading={recipeDbOperationLoading}
        />
      </div>
      <Modal open={open} setModalOpen={setOpen}>
        <SuccessMessage />
        <ErrorMessage />
        <div className="grid grid-cols-2 font-bold text-center w-full md:max-w-6xl p-3 lg:p-5">
          <div className="grid col-span-1 px-1 place-content-start justify-center">
            <h3 className="h-28">タグ登録</h3>
            <div className="flex items-center space-x-5">
              <Input
                htmlfor="tagName"
                text="タグ名"
                type="text"
                placeholder="タグ名を入力してください"
                name="tagName"
                id="tagName"
                value={tagName}
                onChange={handleTagChange}
                onBlur={handleTagChange}
                validationErrors={
                  tagValidationError.name ? tagValidationError.name : null
                }
              />
              <button
                type="submit"
                onClick={tagHendleSubmit}
                disabled={tagDbOperationLoading || isTagSubmitDisabled}
                className={`bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-5 rounded disabled:hover:bg-green-500 disabled:cursor-not-allowed
                ${isTagSubmitDisabled && "opacity-50"}
                ${tagDbOperationLoading && "disabled:opacity-100"}`}
              >
                {tagDbOperationLoading ? <LoadingSpinner /> : "タグ登録"}
              </button>
            </div>
          </div>
          <div className="col-span-1 overflow-auto px-1 h-72">
            <h3 className="mb-5">タグ一覧</h3>
            {loading ? (
              <Loading />
            ) : (
              <ul className="space-y-3">
                {tags.map((tag) => (
                  <li
                    className="grid grid-cols-3 items-center gap-1"
                    key={tag.id}
                  >
                    <span className="text-xl text-left col-span-1 lg:w-56 md:w-40">
                      {editTagId === tag.id ? (
                        <>
                          <div className="flex">
                            <XCircleIcon
                              className="text-red-500 hover:text-red-700 cursor-pointer"
                              onClick={() => setEditTagId(null)}
                            />
                            <input
                              type="text"
                              placeholder="タグ名を入力してください"
                              name="editTagName"
                              id="editTagName"
                              className="border-0 focus:ring-0 focus:border-transparent"
                              value={editTagName}
                              onChange={(e) => setEditTagName(e.target.value)}
                            />
                          </div>
                        </>
                      ) : (
                        tag.name
                      )}
                    </span>
                    <div className="grid grid-cols-2 col-span-2">
                      <div className="text-xs col-span-1">
                        {editTagId === tag.id ? (
                          <>
                            <button
                              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded ease-in transition-all disabled:hover:bg-green-500 disabled:cursor-not-allowed"
                              onClick={(e) =>
                                editHandleSubmitTagName(e, tag.id)
                              }
                              disabled={tagDbEditOperationLoading}
                            >
                              {tagDbEditOperationLoading ? (
                                <LoadingSpinner />
                              ) : (
                                "保存"
                              )}
                            </button>
                          </>
                        ) : (
                          <button
                            className="bg-sky-500 hover:bg-sky-700 text-white font-bold py-2 px-4 rounded ease-in transition-all"
                            onClick={() => {
                              setEditTagId(tag.id);
                              setEditTagName(tag.name);
                            }}
                          >
                            編集
                          </button>
                        )}
                      </div>
                      <div className="text-xs text-left col-span-1">
                        <DeleteButton onClick={() => handleDelete(tag.id)} />
                        <DeleteModal
                          text="タグを削除しますか？"
                          open={deleteModalOpen}
                          setDeleteModalOpen={setDeleteModalOpen}
                          onConfirm={() => confirmDelete && confirmDelete()}
                        />
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </Modal>
    </>
  );
};

export default RecipesNew;
