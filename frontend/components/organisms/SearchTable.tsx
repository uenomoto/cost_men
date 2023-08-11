import React from "react";
import { SearchResult } from "@/types";
import { searchResultState } from "@/recoil/atoms/searchResultState";
import { isSearchingState } from "@/recoil/atoms/isSearchingState";
import { useRecoilValue, useSetRecoilState } from "recoil";

export const SearchTable = () => {
  // グローバルに検索結果を読み取り専用で取得
  const searchResults = useRecoilValue<SearchResult>(searchResultState);

  const setIsSearching = useSetRecoilState(isSearchingState);

  return (
    <div className="my-10">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h1 className="text-md lg:text-2xl font-semibold leading-6 text-gray-900">
              仕入れ先 検索結果
            </h1>
          </div>
        </div>
        <div className="mt-8">
          <div
            className="hover:text-red-900 text-red-600 font-bold py-2 px-4 rounded ease-in transition-all cursor-pointer inline-block"
            onClick={() => setIsSearching(false)}
          >
            検索結果を閉じる
          </div>
          <div className="-mx-4 -my-2 sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle">
              <table className="min-w-full border-separate border-spacing-0">
                <thead>
                  <tr>
                    <th
                      scope="col"
                      className="border-b border-gray-300 bg-white bg-opacity-75 py-3.5 pl-4 pr-3 text-left text-md lg:text-2xl font-semibold text-gray-900 backdrop-blur backdrop-filter sm:pl-6 lg:pl-8"
                    >
                      仕入れ先
                    </th>
                    <th
                      scope="col"
                      className="border-b border-gray-300 bg-white bg-opacity-75 py-3.5 pl-4 pr-3 text-center text-md lg:text-2xl font-semibold text-gray-900 backdrop-blur backdrop-filter sm:pl-6 lg:pl-8"
                    >
                      連絡先
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {searchResults.suppliers.length > 0 ? (
                    searchResults.suppliers.map((supplier) => (
                      <tr key={supplier.id}>
                        <td className="border-b border-gray-300 bg-white bg-opacity-75 px-3 py-3.5 text-left text-md lg:text-2xl font-semibold text-gray-900 backdrop-blur backdrop-filter">
                          {supplier.name}
                        </td>
                        <td className="border-b border-gray-300 bg-white bg-opacity-75 px-3 py-3.5 text-center text-md lg:text-2xl font-semibold text-gray-900 backdrop-blur backdrop-filter">
                          {supplier.contact_info}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <div className="mt-5 font-bold">
                      検索された仕入れ先は登録されていません
                    </div>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
