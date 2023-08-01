import React, { FormEvent } from "react";
import Head from "next/head";
import Image from "next/image";
import { useState } from "react";
import { PrimaryButton } from "../../../components/atoms/button/PrimaryButton";
import { Modal } from "../../../components/modal/Modal";
import { Tab } from "../../../components/molecules/tab/Tab";
import { EditButton } from "../../../components/atoms/button/EditButton";
import { Tag } from "@/types";
import { Input } from "../../../components/atoms/form/Input";
import { AlertBadge } from "../../../components/atoms/badge/AlertBadge";
import { Submit } from "../../../components/atoms/form/Submit";
import { EditSubmit } from "../../../components/atoms/form/EditSubmit";

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
    name: "美味しいよ",
  },
  {
    id: 4,
    name: "美味しいよ",
  },
  {
    id: 5,
    name: "美味しいよ",
  },
  {
    id: 6,
    name: "美味しいよ",
  },
  {
    id: 7,
    name: "美味しいよ",
  },
];

const RecipeShow = () => {
  const [sellingPriceOpen, setSellingPriceOpen] = useState(false);
  const [editSellingPriceOpen, setEditSellingPriceOpen] = useState(false);

  // 販売価格のinputのstate
  const [price, setPrice] = useState("");

  // 本来は販売価格登録したデータが入るが今は仮の値です
  const [editPrice, setEditPrice] = useState("1200");

  const handlePriceSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log(`販売価格: ${price} 円`);
    setPrice("");
    setSellingPriceOpen(false);
  };

  // 編集用
  const handleEditPriceSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log(`販売価格: ${editPrice} 円`);
    setEditPrice("");
    setEditSellingPriceOpen(false);
  };

  return (
    <>
      <Head>
        <title>レシピ名</title>
      </Head>
      <div className="flex items-center mb-7">
        <p className="font-bold mr-1 lg:mr-10">タグ:</p>
        <div className="space-x-1">
          {tags.map((tag: Tag) => (
            <span
              key={tag.id}
              className="inline-flex items-center rounded-full bg-blue-100 px-2 py-1 text-xs font-medium text-blue-700"
            >
              #{tag.name}
            </span>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-1 lg:grid-cols-2">
        <div className="col-span-1 h-96 space-y-16">
          <h3 className="text-5xl font-bold mb-7 text-gray-900">
            鶏白湯ラーメン
          </h3>
          {/* 本当はどちらか一つだけのボタンになる今は両方出しておく */}
          <div className="space-x-2">
            <PrimaryButton>
              <div onClick={() => setSellingPriceOpen(true)}>
                販売価格を設定する
              </div>
            </PrimaryButton>
            <EditButton>
              <div onClick={() => setEditSellingPriceOpen(true)}>
                販売価格を編集する
              </div>
            </EditButton>
          </div>
          <small>※販売価格後に価格が表示されます</small>
          <div className="flex justify-between items-center">
            <span className="font-bold mt-3 text-3xl lg:text-4xl">1200 円</span>
            <span className="font-bold mt-3 text-xl text-right lg:text-2xl">
              原価率: oo%
            </span>
          </div>
        </div>
        <div className="col-span-1 h-96 relative mt-10 max-w-lg lg:mt-0 xl:mt-1 xl:ml-1">
          <Image
            src="/ramen.png"
            alt="recipe"
            width={450}
            height={500}
            priority
            className="mt-10 max-w-lg rounded-full transition-transform duration-500 hover:scale-105 lg:mt-0 xl:mt-1 xl:ml-1"
          />
        </div>
      </div>
      <Modal open={sellingPriceOpen} setModalOpen={setSellingPriceOpen}>
        <div className="p-3">
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
                placeholder="販売価格を入力してください"
                value={price}
                onChange={setPrice}
              />
              <Submit text="価格登録する" onClick={handlePriceSubmit} />
            </div>
          </div>
        </div>
      </Modal>
      <Modal open={editSellingPriceOpen} setModalOpen={setEditSellingPriceOpen}>
        <div className="p-3">
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
                placeholder="販売価格を入力してください"
                value={editPrice}
                onChange={setEditPrice}
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
