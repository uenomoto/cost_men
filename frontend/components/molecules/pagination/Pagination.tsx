import React from "react";
import {
  ArrowLongLeftIcon,
  ArrowLongRightIcon,
} from "@heroicons/react/20/solid";
import { useRouter } from "next/router";

type Props = {
  currentPage: number;
  totalPages: number;
};

export const Pagination = ({ totalPages, currentPage }: Props) => {
  const route = useRouter();

  const DISPLAY_NUM_PAGES = 3; // 現在のページの前後に表示するページ数

  const gotoPage = (page: number) => {
    route.push({
      pathname: route.pathname,
      query: { ...route.query, page: page },
    });
  };

  // ページネーションの表示数
  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === totalPages;

  const generatePages = (): (string | number)[] => {
    let pages: (string | number)[] = [];

    // ページ数がDISPLAY_NUM_PAGES * 2 + 4以下の場合(今回は10page)は、ページ数を全て表示する
    if (totalPages <= DISPLAY_NUM_PAGES * 2 + 4) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);
      // 現在のページがDISPLAY_NUM_PAGES + 2より大きい場合は、...1(前の方の...)を表示する
      if (currentPage > DISPLAY_NUM_PAGES + 2) {
        pages.push("...1"); //Reactは各ボタンコンポーネントのIDを一意に保持できるように
      }

      // 現在のページの前後に表示するページ数を計算する
      // currentPage - DISPLAY_NUM_PAGESが2より小さい場合は、2を開始ページとする
      let start = Math.max(2, currentPage - DISPLAY_NUM_PAGES);
      let end = Math.min(totalPages - 1, currentPage + DISPLAY_NUM_PAGES);

      // startからendまでのページを生成する
      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      // 現在のページがtotalPages - DISPLAY_NUM_PAGES - 1より小さい場合は、...2(後の方の...)を表示する
      if (currentPage < totalPages - DISPLAY_NUM_PAGES - 1) {
        pages.push("...2"); //Reactは各ボタンコンポーネントのIDを一意に保持できるように
      } else if (end !== totalPages - 1) {
        pages.push(totalPages - 1);
      }

      pages.push(totalPages); // 最後のページを追加
    }
    return pages; // ここで生成したページを返す
  };

  return (
    <nav className="flex items-center justify-between border-t mt-10 pb-8 w-full border-gray-200 px-4 sm:px-0">
      <div className="-mt-px flex w-0 flex-1">
        <button
          disabled={isFirstPage}
          onClick={() => gotoPage(currentPage - 1)}
          className="inline-flex items-center border-t-2 border-transparent pr-1 pt-4 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700 disabled:cursor-not-allowed disabled:text-gray-300"
        >
          <ArrowLongLeftIcon
            className={`mr-3 h-5 w-5 ${
              isFirstPage ? "text-gray-300" : "text-gray-500"
            }`}
            aria-hidden="true"
          />
          前へ
        </button>
      </div>
      <div className="md:-mt-px md:flex">
        {generatePages().map((pageNumber) => (
          <button
            key={pageNumber}
            onClick={() => {
              // typeofとは、変数の型を返す演算子であり、数値をクリックすると、そのページに遷移する。"..."は反応しない
              if (typeof pageNumber === "number") {
                gotoPage(pageNumber);
              }
            }}
            className={`inline-flex items-center border-t-2 ${
              currentPage === pageNumber
                ? "border-sky-500"
                : "border-transparent"
            } px-4 pt-4 text-sm font-medium ${
              currentPage === pageNumber
                ? "text-sky-400"
                : "text-gray-500 hover:border-gray-300 hover:text-gray-700"
            }`}
            aria-current={currentPage === pageNumber ? "page" : undefined}
          >
            {/* 型が文字列の...1や...2を...として表示 */}
            {typeof pageNumber === "string" && pageNumber.includes("...")
              ? "..."
              : pageNumber}
          </button>
        ))}
      </div>
      <div className="-mt-px flex w-0 flex-1 justify-end">
        <button
          disabled={isLastPage}
          onClick={() => gotoPage(currentPage + 1)}
          className="inline-flex items-center border-t-2 border-transparent pl-1 pt-4 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700 disabled:cursor-not-allowed disabled:text-gray-300"
        >
          次へ
          <ArrowLongRightIcon
            className={`ml-3 h-5 w-5 ${
              isLastPage ? "text-gray-300" : "text-gray-500"
            }`}
            aria-hidden="true"
          />
        </button>
      </div>
    </nav>
  );
};
