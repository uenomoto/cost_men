import React from "react";
import Head from "next/head";
import Image from "next/image";
import { useState } from "react";
import { PrimaryButton } from "../../../components/atoms/button/PrimaryButton";
import { Modal } from "../../../components/modal/Modal";

type Tag = {
  id: number;
  name: string;
};

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
            <Modal open={sellingPriceOpen} setModalOpen={setSellingPriceOpen}>
              販売価格設定する
            </Modal>
            <PrimaryButton>
              <div onClick={() => setEditSellingPriceOpen(true)}>
                販売価格を編集する
              </div>
            </PrimaryButton>
            <Modal
              open={editSellingPriceOpen}
              setModalOpen={setEditSellingPriceOpen}
            >
              販売価格編集する
            </Modal>
          </div>
          <small>※販売価格後に価格が表示されます</small>
          <div className="flex justify-between items-center">
            <span className="font-bold mt-3 text-3xl lg:text-4xl">1200 円</span>
            <span className="font-bold mt-3 text-xl text-right lg:text-2xl">
              原価率: oo%
            </span>
          </div>
        </div>
        <div className="col-span-1 h-96">
          <Image
            src="/ramen.png"
            alt="recipe"
            width={450}
            height={500}
            priority
            className="mt-10 max-w-lg rounded-full lg:mt-0 xl:mt-1 xl:ml-1"
          />
        </div>
      </div>
    </>
  );
};

export default RecipeShow;
