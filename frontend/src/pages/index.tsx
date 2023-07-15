import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { SuccessButton } from "../../components/atoms/button/SuccessButton";
import { PrimaryButton } from "../../components/atoms/button/PrimaryButton";

export default function Home() {
  return (
    <>
      <Head>
        <title>CostMen</title>
        <meta name="description" content="原価計算ができるアプリ" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="container mx-auto bg-white">
        <div className="relative isolate overflow-hidden bg-gradient-to-b from-indigo-100/20 pt-14">
          <div
            className="absolute inset-y-0 right-1/2 -z-10 -mr-96 w-[200%] origin-top-right skew-x-[-30deg] bg-white shadow-xl shadow-indigo-600/10 ring-1 ring-indigo-50 sm:-mr-80 lg:-mr-96"
            aria-hidden="true"
          />
          <div className="mx-auto max-w-7xl px-6 py-32 sm:py-40 sm:w-full lg:px-8">
            <div className="mx-auto max-w-2xl lg:mx-0 lg:grid lg:max-w-none lg:grid-cols-2 lg:gap-x-16 lg:gap-y-6 xl:grid-cols-1 xl:grid-rows-1 xl:gap-x-8">
              <h1 className="max-w-1xl text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl lg:col-span-2 xl:col-auto">
                コスト麺
              </h1>
              <div className="mt-6 text-center max-w-xl sm:text-center lg:mt-10 xl:col-end-1 xl:row-start-1">
                <p className="text-3xl leading-8 flex justify-center text-gray-600">
                  誰でも簡単に原価計算アプリ！
                </p>
                <div className="mt-10 flex items-center justify-center gap-x-6">
                  <Link href="/user/signup">
                    <SuccessButton>新規会員登録はこちら！！</SuccessButton>
                  </Link>
                  <Link href="/user/login">
                    <PrimaryButton>ログインはこちら！！</PrimaryButton>
                  </Link>
                </div>
              </div>
              <Image
                src="/no_image.png"
                alt="ラーメン"
                width={600}
                height={700}
                priority
                className="mt-10 aspect-[11/7] w-45 lg:w-90 max-w-lg rounded-3xl object-cover flex justify-center sm:mt-16 lg:mt-0 lg:max-w-none xl:row-span-2 xl:row-end-2 xl:mt-10 xl:ml-20"
              />
            </div>
          </div>
          <div className="absolute inset-x-0 bottom-0 -z-10 h-24 bg-gradient-to-t from-white sm:h-32" />
        </div>
      </div>
    </>
  );
}
