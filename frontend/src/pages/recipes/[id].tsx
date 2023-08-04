import React, { FormEvent, useEffect, useState } from "react";
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

const RecipeShow = () => {
  const token = useRecoilValue(tokenState);
  const [sellingPriceOpen, setSellingPriceOpen] = useState(false);
  const [editSellingPriceOpen, setEditSellingPriceOpen] = useState(false);
  // 販売価格のテキストフィールドのstate
  const [price, setPrice] = useState<number>(0);
  // 販売価格の編集用のテキストフィールドのstate
  const [editPrice, setEditPrice] = useState<number>(0);

  // 販売価格を格納し表示する
  const [sellingPrice, setSellingPrice] = useState<number>(0);

  const [recipeShow, setRecipeShow] = useRecoilState<Recipe>(recipeShowState);
  const setErrorMessage = useSetRecoilState(errorMessageState);
  const setSuccessMessage = useSetRecoilState(successMessageState);

  const router = useRouter();
  const { id } = router.query; // パスのパラメータを取得
  const [loading, setLoading] = useState(true);

  // レシピの詳細を取得する
  useEffect(() => {
    const getRecipeShow = async () => {
      try {
        const res: AxiosResponse<RecipeResponse> = await axios.get(
          `${process.env.NEXT_PUBLIC_IP_ENDPOINT}/recipes/${id}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        if (res.status === 200) {
          setRecipeShow(res.data.recipe);
          setLoading(false);
        }
      } catch (error: AxiosError | any) {
        console.log(error.response.data.message);
      }
    };
    getRecipeShow();
  }, [setRecipeShow, token, id]);

  // 販売価格の詳細を取得する
  useEffect(() => {
    const getSellingPrice = async () => {
      try {
        const res: AxiosResponse<SellingPriceResponse> = await axios.get(
          `${process.env.NEXT_PUBLIC_IP_ENDPOINT}/recipes/${id}/selling_prices`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        if (res.status === 200) {
          setSellingPrice(res.data.selling_price.price);
        }
      } catch (error: AxiosError | any) {
        console.log(error.message);
      }
    };
    getSellingPrice();
  }, [setSellingPrice, token, id]);

  // 販売価格の登録用
  const handlePriceSubmit = async (e: FormEvent) => {
    e.preventDefault();

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
      console.log(error.response.data.errors);
      setErrorMessage(error.response.data.errors);
    }
  };

  // 販売価格の編集用
  const handleEditPriceSubmit = async (e: FormEvent) => {
    e.preventDefault();

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
      console.log(error.response.data.errors);
      setErrorMessage(error.response.data.errors);
    }
  };

  // 原価率の計算(売上原価 / 売上高)
  const costRatio = Math.round((sellingPrice / recipeShow.total_cost) * 100);

  return (
    <>
      <Head>
        <title>{recipeShow.name}</title>
      </Head>
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
                <div>
                  <SuccessButton>
                    <div onClick={() => setSellingPriceOpen(true)}>
                      販売価格を設定する
                    </div>
                  </SuccessButton>
                  <p className="text-xs mt-2 text-gray-500">
                    ※販売価格設定後に価格が表示されます
                  </p>
                </div>
              ) : (
                <div>
                  <EditButton>
                    <div onClick={() => setEditSellingPriceOpen(true)}>
                      販売価格を編集する
                    </div>
                  </EditButton>
                  <p className="text-xs mt-2 text-gray-500">
                    ※販売価格はこちらで変更できます
                  </p>
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
                  原価率: {costRatio} %
                </span>
              </div>
            </div>
            <div className="col-span-1 h-96 relative mb-16 mt-1 max-w-lg lg:mt-0 xl:mt-1 xl:ml-1">
              <Image
                src={recipeShow.image_aws_url}
                alt="recipeImage"
                width={450}
                height={300}
                priority
                className="rounded-md transition-transform overflow-hidden object-cover duration-500 hover:scale-105 lg:mt-0 xl:mt-1 xl:ml-1"
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
              <AlertBadge />
              <Input
                htmlfor="price"
                text="販売価格"
                type="number"
                id="price"
                name="price"
                min={1}
                placeholder="販売価格を0以上で入力してください"
                value={price}
                onChange={(value) => setPrice(Number(value))}
              />
              <Submit text="価格登録する" onClick={handlePriceSubmit} />
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
              <AlertBadge />
              <Input
                htmlfor="price"
                text="販売価格"
                type="number"
                id="price"
                name="price"
                min={0}
                placeholder="販売価格を0以上で入力してください"
                value={editPrice}
                onChange={(value) => setEditPrice(Number(value))}
              />
              <EditSubmit text="価格編集する" onClick={handleEditPriceSubmit} />
            </div>
          </div>
        </div>
      </Modal>
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
