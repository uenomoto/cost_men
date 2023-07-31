import { FormEvent, Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { searchResultState } from "@/recoil/atoms/searchResultState";
import { tokenState } from "@/recoil/atoms/tokenState";
import { isSearchingState } from "@/recoil/atoms/isSearchingState";
import { Input } from "../../atoms/form/Input";
import { Submit } from "../../atoms/form/Submit";
import axios, { AxiosError } from "axios";

type Props = {
  slideOpen: boolean;
  setSlideOpen: (value: boolean) => void;
};

export const SlideOver = ({ slideOpen, setSlideOpen }: Props) => {
  // グローバルで検索結果を管理する
  const setSearchResult = useSetRecoilState(searchResultState);

  // グローバルで検索中かどうかを管理する
  const setIsSearching = useSetRecoilState(isSearchingState);

  // 仕入れ先検索フォーム(textfield)
  const [searchSupplier, setSearchSupplier] = useState("");

  const token = useRecoilValue(tokenState);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const params = {
      supplier_q: searchSupplier,
    };

    // getリクエストは第二引数までなので検索クエリと認証ヘッダー同時に渡す必要がある
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_IP_ENDPOINT}/search`,
        {
          params: params,
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setSearchResult(res.data);
      setSearchSupplier("");
      setIsSearching(true);
      setSlideOpen(false);
    } catch (error: AxiosError | any) {
      console.log(error.response.data);
    }
  };

  return (
    <Transition.Root show={slideOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={setSlideOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-in-out duration-500"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in-out duration-500"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-500 sm:duration-700"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500 sm:duration-700"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                  <div className="flex h-full flex-col overflow-y-scroll bg-white py-6 shadow-xl">
                    <div className="px-4 sm:px-6">
                      <div className="ml-3 flex h-7 justify-end">
                        <button
                          type="button"
                          className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2"
                          onClick={() => setSlideOpen(false)}
                        >
                          <span className="sr-only">閉じる</span>
                          <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                        </button>
                      </div>
                      <div className="mt-5 text-center space-y-1">
                        <Dialog.Title className="text-xl font-semibold leading-6 text-gray-900">
                          仕入れ先と連絡先検索ができます！
                        </Dialog.Title>
                        <p className="text-xs text-gray-500">
                          空欄で検索すると全ての仕入れ先が検索できます
                        </p>
                      </div>
                    </div>
                    <div className="relative mt-6 flex-1 px-4 sm:px-6 space-y-12">
                      <Input
                        htmlfor="searchSupplier"
                        text="仕入れ先検索"
                        type="text"
                        placeholder="仕入れ先を検索"
                        value={searchSupplier}
                        name="searchSupplier"
                        id="searchSupplier"
                        onChange={setSearchSupplier}
                      />
                      <Submit text="検索" onClick={handleSubmit} />
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};
