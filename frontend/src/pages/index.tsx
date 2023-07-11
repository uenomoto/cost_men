import Head from "next/head";
import { EditSupplierModel } from "../../components/modal/EditSupplierModel";
import { EditIngredientModel } from "../../components/modal/EditIngredientModel";

export default function Home() {
  return (
    <>
      <Head>
        <title>CostMen</title>
        <meta name="description" content="原価計算ができるアプリ" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="container mx-auto">
        <div className="grid-cols-6">
          <div className=" text-2xl">コスト麺</div>
          <span>誰でも簡単に原価計算アプリ</span>
        </div>
      </div>
      <div className="flex-row">
        <EditSupplierModel />
        <EditIngredientModel />
      </div>
    </>
  );
}
