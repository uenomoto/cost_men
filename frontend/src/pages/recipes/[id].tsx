import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import Image from "next/image";
import { Recipe, RecipeResponse, SellingPriceResponse, Tag } from "@/types";
import axios, { AxiosError, AxiosResponse } from "axios";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { tokenState } from "@/recoil/atoms/tokenState";
import { recipeShowState } from "@/recoil/atoms/recipeShowState";
import { successMessageState } from "@/recoil/atoms/successMessageState";
import { errorMessageState } from "@/recoil/atoms/errorMessageState";
import { warningMessageState } from "@/recoil/atoms/warningMessageState";
import { Modal } from "../../../components/modal/Modal";
import { Tab } from "../../../components/molecules/tab/Tab";
import { EditButton } from "../../../components/atoms/button/EditButton";
import { Input } from "../../../components/atoms/form/Input";
import { AlertBadge } from "../../../components/atoms/badge/AlertBadge";
import { Submit } from "../../../components/atoms/form/Submit";
import { EditSubmit } from "../../../components/atoms/form/EditSubmit";
import { Loading } from "../../../components/molecules/loading/Loading";
import { ErrorMessage } from "../../../components/atoms/messeage/ErrorMessage";
import { SuccessMessage } from "../../../components/atoms/messeage/SuccessMessage";
import { SuccessButton } from "../../../components/atoms/button/SuccessButton";
import { WarningMessage } from "../../../components/atoms/messeage/WarningMessage";
import { DeleteModal } from "../../../components/modal/DeleteModal";

type SellingPriceValidationErrorsState = {
  price?: string;
};

const RecipeShow = () => {
  const token = useRecoilValue(tokenState);
  const [sellingPriceOpen, setSellingPriceOpen] = useState(false);
  const [editSellingPriceOpen, setEditSellingPriceOpen] = useState(false);
  const [dbOperationLoading, setDbOperationLoading] = useState<boolean>(false);
  const [dbEditOperationLoading, setDbEditOperationLoading] =
    useState<boolean>(false);
  // 販売価格を格納し表示する
  const [sellingPrice, setSellingPrice] = useState<number>(0);

  // 販売価格のテキストフィールドのstate
  const [price, setPrice] = useState<number>(0);
  // 販売価格の編集用のテキストフィールドのstate
  const [editPrice, setEditPrice] = useState<number>(sellingPrice);

  // レシピの販売価格のバリデーションを格納するステート
  const [sellingValidationErrors, setSellingValidationErrors] =
    useState<SellingPriceValidationErrorsState>({});

  const [recipeShow, setRecipeShow] = useRecoilState<Recipe>(recipeShowState);
  const setErrorMessage = useSetRecoilState(errorMessageState);
  const setSuccessMessage = useSetRecoilState(successMessageState);
  const setWarningMessage = useSetRecoilState(warningMessageState);

  const router = useRouter();
  const { id } = router.query; // パスのパラメータを取得
  const [loading, setLoading] = useState(true);
  // stateは関数も格納できる優れもの！
  const [confirmDelete, setConfirmDelete] = useState<
    (() => Promise<void>) | null
  >(null);
  // delete用のモーダル
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  // レシピの詳細を取得する
  useEffect(() => {
    const getRecipeShow = async () => {
      // アニメーション追加と動的ルーティングが原因でIDがundefinedになるのでAPIを叩かないようにする
      if (!id) return;

      try {
        const res: AxiosResponse<RecipeResponse> = await axios.get(
          `${process.env.NEXT_PUBLIC_IP_ENDPOINT}/recipes/${id}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        if (res.status === 200) {
          setRecipeShow(res.data.recipe);
        }
      } catch (error: AxiosError | any) {
        setErrorMessage(error.response.data.errors);
        setWarningMessage("3秒後にレシピ一覧ページに戻ります");
        setTimeout(() => {
          router.push("/recipes");
        }, 3000);
      } finally {
        setLoading(false);
      }
    };
    getRecipeShow();
  }, [setRecipeShow, token, id, setWarningMessage, setErrorMessage, router]);

  // 販売価格の詳細を取得する
  useEffect(() => {
    const getSellingPrice = async () => {
      if (!id) return;

      try {
        const res: AxiosResponse<SellingPriceResponse> = await axios.get(
          `${process.env.NEXT_PUBLIC_IP_ENDPOINT}/recipes/${id}/selling_prices`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        if (res.status === 200 && res.data.selling_price) {
          setSellingPrice(res.data.selling_price.price);
        }
      } catch (error: AxiosError | any) {
        console.log(error.response);
      }
    };
    getSellingPrice();
  }, [setSellingPrice, token, id]);

  // 販売価格の登録用
  const handlePriceSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setDbOperationLoading(true);

    const params = {
      selling_price: {
        price: price,
      },
    };
    try {
      const res: AxiosResponse<SellingPriceResponse> = await axios.post(
        `${process.env.NEXT_PUBLIC_IP_ENDPOINT}/recipes/${id}/selling_prices`,
        params,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (res.status === 201) {
        setSellingPrice(res.data.selling_price.price);
        setPrice(0);
        setSellingPriceOpen(false);
        setSuccessMessage("販売価格を登録しました");
      }
    } catch (error: AxiosError | any) {
      setSellingValidationErrors(error.response.data.errors);
    } finally {
      setDbOperationLoading(false);
    }
  };

  // 販売価格の編集用
  const handleEditPriceSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setDbEditOperationLoading(true);

    const params = {
      selling_price: {
        price: editPrice,
      },
    };
    try {
      const res: AxiosResponse<SellingPriceResponse> = await axios.patch(
        `${process.env.NEXT_PUBLIC_IP_ENDPOINT}/recipes/${id}/selling_prices`,
        params,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (res.status === 200) {
        setSellingPrice(res.data.selling_price.price);
        setEditPrice(0);
        setEditSellingPriceOpen(false);
        setSuccessMessage("販売価格を編集しました");
      }
    } catch (error: AxiosError | any) {
      setSellingValidationErrors(error.response.data.errors);
    } finally {
      setDbEditOperationLoading(false);
    }
  };

  // レシピ削除
  const handleDelete = async (id: number) => {
    // 削除する関数を定義しモーダルから呼び出す
    const confirmDeleteFunc = async () => {
      try {
        await axios.delete(
          `${process.env.NEXT_PUBLIC_IP_ENDPOINT}/recipes/${id}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setSuccessMessage("レシピを削除しました");
        router.push("/recipes");
      } catch (error: AxiosError | any) {
        console.log(error.response.data.errors);
        setErrorMessage(error.response.data.errors);
      } finally {
        // finallyは成功でも失敗でも最後に実行される
        setDeleteModalOpen(false);
      }
    };

    // 削除する関数をconrirmDeletestateに格納
    setConfirmDelete(() => confirmDeleteFunc);
    setDeleteModalOpen(true);
  };

  // sellingPriceを監視し編集する際にテキストフィールドに販売価格を表示する
  useEffect(() => {
    setEditPrice(sellingPrice);
  }, [sellingPrice]);

  // 原価率の計算(売上原価 / 売上高)
  const costRatio = () => {
    // 販売価格がないことはないのですが念のためと0円(未設定)の場合は-(横線)を返す
    if (!sellingPrice || sellingPrice === 0) return "-";

    const costRatioCalc = Math.round(
      (recipeShow.total_cost / sellingPrice) * 100
    );

    return costRatioCalc;
  };
  const costRatioresult = costRatio();

  // レシピの販売価格のフロント側のバリデーション
  const handleSellingPriceChenge = (e: ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    setPrice(value);

    if (value < 1) {
      setSellingValidationErrors((prev) => ({
        ...prev,
        price: "販売価格は1以上で入力してください",
      }));
    } else {
      setSellingValidationErrors((prev) => ({ ...prev, price: undefined }));
    }
  };
  const editHandleSellingPriceChenge = (e: ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    setEditPrice(value);

    if (value < 1) {
      setSellingValidationErrors((prev) => ({
        ...prev,
        price: "販売価格は1以上で入力してください",
      }));
    } else {
      setSellingValidationErrors((prev) => ({ ...prev, price: undefined }));
    }
  };

  return (
    <>
      <Head>
        <title>{recipeShow.name}</title>
      </Head>
      <ErrorMessage />
      <WarningMessage />
      {loading ? (
        <Loading />
      ) : (
        <>
          <div className="flex items-center mb-7">
            <p className="font-bold mr-1 lg:mr-10">タグ:</p>
            <div className="space-x-1">
              {recipeShow?.tags.map((tag: Tag) => (
                <span
                  key={tag.id}
                  className="inline-flex items-center rounded-full bg-blue-100 px-2 py-1 text-xs font-medium text-blue-700"
                >
                  #{tag.name}
                </span>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-1 gap-6 mt-3 sm:grid-cols-1 lg:grid-cols-2">
            <div className="col-span-1 h-96 space-y-16">
              <h3 className="lg:text-4xl text-5xl font-bold mb-1 text-gray-900">
                {recipeShow.name}
              </h3>
              <SuccessMessage />
              {/* 販売価格データがなかったら設定ボタンのみであったら編集ボタンのみにする */}
              {sellingPrice === 0 ? (
                <div className="grid grid-cols-2">
                  <div className="col-span-1">
                    <SuccessButton
                      text="販売価格を設定する"
                      onClick={() => setSellingPriceOpen(true)}
                    />
                    <p className="text-xs mt-2 text-gray-500">
                      ※販売価格設定後に価格が表示されます
                    </p>
                  </div>
                  <div className="col-span-1">
                    <button
                      className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition-all duration-300 hover:scale-110"
                      onClick={() => handleDelete(recipeShow.id)}
                    >
                      レシピを削除する
                    </button>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-2">
                  <div className="col-span-1">
                    <EditButton
                      text="販売価格を編集する"
                      onClick={() => setEditSellingPriceOpen(true)}
                    />
                    <p className="text-xs mt-2 text-gray-500">
                      ※販売価格はこちらで変更できます
                    </p>
                  </div>
                  <div className="col-span-1">
                    <button
                      className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition-all duration-300 hover:scale-110"
                      onClick={() => handleDelete(recipeShow.id)}
                    >
                      レシピを削除する
                    </button>
                  </div>
                </div>
              )}
              <div className="flex justify-between items-center">
                {sellingPrice === 0 ? (
                  <span className="font-bold mt-3 mr-5 text-xl">
                    <span>販売価格: - 円</span>
                  </span>
                ) : (
                  <span className="font-bold mt-3 mr-5 text-xl">
                    <span>販売価格: {sellingPrice} 円</span>
                  </span>
                )}
                <span className="font-bold mt-3 text-xl text-right lg:text-2xl">
                  原価率: {costRatioresult} %
                </span>
              </div>
            </div>
            <div className="col-span-1 h-96 relative mb-16 mt-1 max-w-lg lg:mt-0 xl:mt-1 xl:ml-1">
              <Image
                src={recipeShow.image_aws_url}
                alt="recipeImage"
                width={450}
                height={300}
                className="rounded-3xl w-[400px] h-[350px] aspect-[11/8] transition-transform duration-500 hover:scale-105 lg:mt-0 xl:mt-1 xl:ml-1"
              />
            </div>
          </div>
        </>
      )}
      <Modal open={sellingPriceOpen} setModalOpen={setSellingPriceOpen}>
        <div className="p-3">
          <ErrorMessage />
          <h3 className="text-xl lg:text-3xl font-bold mb-5">
            販売価格を登録する
          </h3>
          <div className="flex flex-col items-center">
            <div className="w-full">
              <AlertBadge text="必須" />
              <p className="text-xs text-red-500 mb-3">
                ※半角数字でお願いします
              </p>
              <Input
                htmlfor="price"
                text="販売価格"
                type="number"
                id="price"
                name="price"
                placeholder="販売価格を0以上で入力してください"
                value={price}
                onChange={handleSellingPriceChenge}
                validationErrors={
                  sellingValidationErrors.price
                    ? sellingValidationErrors.price
                    : null
                }
              />
              <Submit
                text="価格登録する"
                onClick={handlePriceSubmit}
                disabled={dbOperationLoading}
              />
            </div>
          </div>
        </div>
      </Modal>
      <Modal open={editSellingPriceOpen} setModalOpen={setEditSellingPriceOpen}>
        <div className="p-3">
          <ErrorMessage />
          <h3 className="text-xl lg:text-3xl font-bold mb-5">
            販売価格を編集する
          </h3>
          <div className="flex flex-col items-center">
            <div className="w-full">
              <AlertBadge text="必須" />
              <p className="text-xs text-red-500 mb-3">
                ※半角数字でお願いします
              </p>
              <Input
                htmlfor="price"
                text="販売価格"
                type="number"
                id="price"
                name="price"
                placeholder="販売価格を0以上で入力してください"
                value={editPrice}
                onChange={editHandleSellingPriceChenge}
                validationErrors={
                  sellingValidationErrors.price
                    ? sellingValidationErrors.price
                    : null
                }
              />
              <EditSubmit
                text="価格編集する"
                onClick={handleEditPriceSubmit}
                disabled={dbEditOperationLoading}
              />
            </div>
          </div>
        </div>
      </Modal>
      <DeleteModal
        text="レシピ全体を削除しますか？"
        open={deleteModalOpen}
        setDeleteModalOpen={setDeleteModalOpen}
        onConfirm={() => confirmDelete && confirmDelete()}
      />
      <section>
        <h3 className="text-2xl font-bold my-7 text-gray-900">
          こちらから原材料名か手順かを選択してください
        </h3>
        <Tab />
      </section>
    </>
  );
};

export default RecipeShow;
