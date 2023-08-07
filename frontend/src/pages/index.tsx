import Head from "next/head";
import Image from "next/image";
import LoginButton from "../../components/atoms/button/LoginButton";
import { useAuth0 } from "@auth0/auth0-react";

// 何もなければNextだとデフォルトですでにSSGで生成されてる
export default function Home() {
  const { loginWithRedirect } = useAuth0();
  return (
    <>
      <Head>
        <title>CostMen</title>
        <meta name="description" content="原価計算ができるアプリ" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="w-full mx-auto bg-white">
        <div className="mx-auto items-center mt-20 px-6 py-10 sm:py-40 lg:px-8">
          <div className="mx-auto lg:mx-0 lg:grid lg:max-w-none grid-cols-12">
            <div className="flex flex-col justify-center items-center lg:col-span-6 col-span-1">
              <h1 className="text-5xl xl:text-7xl font-bold tracking-tight text-gray-700">
                Cost Men
              </h1>
              <div className="mt-6 max-w-xl lg:mt-10 xl:col-end-1 xl:row-start-1">
                <p className="text-2xl xl:text-4xl leading-8 flex justify-center text-gray-600 animate-pulse">
                  誰でも簡単に原価計算アプリ！
                </p>
                <div className="mt-10 flex items-center justify-center gap-x-6">
                  <LoginButton loginWithRedirect={loginWithRedirect}>
                    早速始めてみよう！
                  </LoginButton>
                </div>
              </div>
            </div>
            <div className="col-span-1 lg:col-span-6">
              <Image
                src="/CalculationAtLeisure.png"
                alt="image"
                width={600}
                height={700}
                className="aspect-[11/8] rounded-3xl object-cover lg:flex justify-center sm:mt-16 lg:mt-0 lg:max-w-none xl:row-span-2 xl:row-end-2 xl:mt-10 xl:ml-20"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
