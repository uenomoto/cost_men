import { Dispatch, Fragment, useEffect, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import { Tag, TagResponse } from "@/types";
import { useRecoilValue } from "recoil";
import axios, { AxiosError, AxiosResponse } from "axios";
import { tokenState } from "@/recoil/atoms/tokenState";
import { loadedState } from "@/recoil/atoms/loadedState";

const classNames = (...classes: (string | false)[]): string => {
  return classes.filter(Boolean).join(" ");
};

type Props = {
  setTagSelectde: Dispatch<React.SetStateAction<Tag | null>>;
};

export const SelectBox = ({ setTagSelectde }: Props) => {
  const token = useRecoilValue(tokenState);
  const loaded = useRecoilValue(loadedState);
  const [tags, setTags] = useState<Tag[]>([]);
  const [selected, setSelected] = useState<Tag | null>(null);

  // 親コンポーネントに選択したタグを渡す
  useEffect(() => {
    setTagSelectde(selected);
  }, [selected, setTagSelectde]);

  // tag一覧を取得
  useEffect(() => {
    const getTags = async () => {
      try {
        const res: AxiosResponse<TagResponse> = await axios.get(
          `${process.env.NEXT_PUBLIC_IP_ENDPOINT}/tags`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setTags(res.data.tags);
      } catch (error: AxiosError | any) {
        console.log(error.response);
      }
    };
    if (loaded) {
      getTags();
    }
  }, [token, loaded]);

  return (
    <Listbox
      value={selected}
      onChange={(val) => setSelected(val === selected ? null : val)}
    >
      {({ open }) => (
        <>
          <div className="flex items-baseline">
            <div className="text-lg font-bold mr-5 text-gray-700">タグ検索</div>
            <div className="relative mt-2">
              <Listbox.Button className="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-sky-600 sm:text-sm sm:leading-6">
                <span className="block truncate px-32">
                  {selected ? `${selected.name}` : "タグを選択してください"}
                </span>
                <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                  <ChevronUpDownIcon
                    className="h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                </span>
              </Listbox.Button>

              <Transition
                show={open}
                as={Fragment}
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                  {tags?.map((tag: Tag) => (
                    <Listbox.Option
                      key={tag.id}
                      value={tag}
                      className={({ active }) =>
                        classNames(
                          active ? "bg-sky-400 text-white" : "text-gray-900",
                          "relative cursor-default select-none py-2 pl-8 pr-4"
                        )
                      }
                    >
                      {({ selected, active }) => (
                        <>
                          <span
                            className={classNames(
                              selected ? "font-semibold" : "font-normal",
                              "block truncate"
                            )}
                          >
                            {tag.name}
                          </span>

                          {selected ? (
                            <span
                              className={classNames(
                                active ? "text-white" : "text-sky-400",
                                "absolute inset-y-0 left-0 flex items-center pl-1.5"
                              )}
                            >
                              <CheckIcon
                                className="h-5 w-5"
                                aria-hidden="true"
                              />
                            </span>
                          ) : null}
                        </>
                      )}
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </Transition>
            </div>
          </div>
          <span className="text-xs mt-3 text-gray-500">
            ※再度タグ検索を<span className="text-red-500">解除したい</span>
            場合同じタグをもう一度選択してください
          </span>
        </>
      )}
    </Listbox>
  );
};
