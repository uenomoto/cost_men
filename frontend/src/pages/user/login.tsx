import React from "react";
import { FormEvent } from "react";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useAuth0 } from "@auth0/auth0-react";
import LoginButton from "../../../components/atoms/button/LoginButton";
import LineLoginButton from "../../../components/atoms/button/LineLoginButton";
import { Input } from "../../../components/atoms/form/Input";

const Login = () => {
  // 保留でここに置いておく↓
  const { loginWithRedirect } = useAuth0();

  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  // const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  //   console.log(`お名前：${name}、パスワード：${password}`);
  // };

  return (
    <div className="grid lg:grid-cols-2 grid-cols-1 gap-7 items-center min-h-full">
      <div className="px-4 py-12 sm:px-6 lg:px-20 xl:px-24">
        <div className="mx-auto w-full max-w-sm lg:w-96">
          <div>
            <h2 className="mt-8 text-3xl font-bold leading-9 tracking-tight text-gray-900">
              ログインはこちらから！
            </h2>
            <p className="mt-2 mb-20 text-sm leading-6 text-gray-500">
              さぁ、原価計算をはじめよう！
            </p>
          </div>
          <div className="mt-10">
            <div>
              <div className="space-y-6">
                <div>
                  <div className="mt-2">
                    <Input
                      htmlfor="name"
                      text="お名前"
                      id="name"
                      name="name"
                      type="text"
                      placeholder="お名前を記入してください"
                      value={name}
                      onChange={setName}
                    />
                  </div>
                </div>
                <div>
                  <div className="mt-10">
                    <Input
                      text="password"
                      htmlfor="password"
                      id="password"
                      name="password"
                      type="password"
                      placeholder="パスワードを記入してください"
                      value={password}
                      onChange={setPassword}
                    />
                  </div>
                </div>
                {/* <Link href="/recipes"> */}
                <LoginButton loginWithRedirect={loginWithRedirect}>
                  ログインする
                </LoginButton>
                {/* </Link> */}
              </div>
              <div className="mt-5 hover:text-blue-500 transition-all ease-in animate-pulse">
                <Link href="/user/signup">新規登録がまだな方はこちら→</Link>
              </div>
            </div>

            <div className="mt-10">
              <div className="relative">
                <div
                  className="absolute inset-0 flex items-center"
                  aria-hidden="true"
                >
                  <div className="w-full border-t border-gray-200" />
                </div>
                <div className="relative flex justify-center text-sm font-medium leading-6">
                  <span className="bg-white px-6 text-gray-900">
                    またはLINEでログイン
                  </span>
                </div>
              </div>
              <div className="mt-5">
                <LineLoginButton />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <Image
          src="/docker_logo.png"
          alt="画像"
          width={600}
          height={700}
          priority
          className="mt-10 aspect-[7/5] w-full max-w-lg rounded-2xl lg:mt-0 lg:max-w-none xl:row-span-2 xl:row-end-2 xl:mt-10 xl:ml-1"
        />
      </div>
    </div>
  );
};

export default Login;
