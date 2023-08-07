import { PlusIcon } from "@heroicons/react/20/solid";
import Link from "next/link";
import React from "react";

export const RecipeEnptyStates = () => {
  return (
    <div className="flex flex-col items-center justify-center relative w-full h-full rounded-lg border-2 border-dashed my-10 border-gray-300 p-12 text-center hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
      <svg
        className="mx-auto h-12 w-12 text-gray-400"
        stroke="currentColor"
        fill="none"
        viewBox="0 0 48 48"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M8 14v20c0 4.418 7.163 8 16 8 1.381 0 2.721-.087 4-.252M8 14c0 4.418 7.163 8 16 8s16-3.582 16-8M8 14c0-4.418 7.163-8 16-8s16 3.582 16 8m0 0v14m0-4c0 4.418-7.163 8-16 8S8 28.418 8 24m32 10v6m0 0v6m0-6h6m-6 0h-6"
        />
      </svg>
      <span className="my-5 block text-xl font-semibold text-gray-900">
        レシピが登録されていません
      </span>
      <div className="space-y-3">
        <Link href="/recipes/new">
          <button
            type="button"
            className="inline-flex items-center rounded-md bg-green-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 "
          >
            <PlusIcon className="-ml-0.5 mr-1.5 h-5 w-5" aria-hidden="true" />
            レシピ登録
          </button>
        </Link>
        <div className="font-bold text-gray-500">↓どちらかお選びください↑</div>
        <Link href="/suppliers/ingredients/new">
          <button
            type="button"
            className="inline-flex items-center rounded-md mt-3 bg-green-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 "
          >
            <PlusIcon className="-ml-0.5 mr-1.5 h-5 w-5" aria-hidden="true" />
            仕入れ先と材料を登録
          </button>
        </Link>
      </div>
    </div>
  );
};
