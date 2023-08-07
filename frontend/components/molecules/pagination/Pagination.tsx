import React, { useEffect } from "react";
import Link from "next/link";
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

  const gotoPage = (page: number) => {
    route.push({
      pathname: route.pathname,
      query: { ...route.query, page: page },
    });
  };

  // ページネーションの表示数
  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === totalPages;

  return (
    <nav className="flex items-center justify-between border-t mt-10 pb-5 w-full border-gray-200 px-4 sm:px-0">
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
        {Array.from({ length: totalPages }, (_, i) => i + 1).map(
          (pageNumber) => (
            <button
              key={pageNumber}
              onClick={() => gotoPage(pageNumber)}
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
              {pageNumber}
            </button>
          )
        )}
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
