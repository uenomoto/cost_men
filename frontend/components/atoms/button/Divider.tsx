import React, { useState, useCallback } from "react";
import { PlusIcon } from "@heroicons/react/20/solid";
import { TextArea } from "../form/TextArea";
import ReactMarkdown from "react-markdown";

export const Divider = () => {
  const [texts, setTexts] = useState<string[]>([""]);
  // 手順追加押すと編集できなくする
  const [isEdit, setIsEdit] = useState<boolean[]>([true]);

  // 手順を追加
  const handleAddStep = useCallback(() => {
    setTexts([...texts, ""]);
    setIsEdit((prev) => prev.map(() => false).concat(true));
  }, [texts]);

  // 手順を新しく追加したときに編集できるようにする、他は編集できないようにする
  const handleChenge = useCallback(
    (index: number, newText: string) => {
      const newItems = [...texts];
      newItems[index] = newText;
      setTexts(newItems);
    },
    [texts]
  );

  return (
    <>
      {texts.map((text, index) => (
        <div key={index}>
          {isEdit[index] ? (
            <TextArea
              text={text}
              setText={(newText) => handleChenge(index, newText)}
            />
          ) : (
            <ReactMarkdown className="text-left font-bold text-2xl">
              {text}
            </ReactMarkdown>
          )}
          <div className="relative mt-4">
            <div
              className="absolute inset-0 flex items-center"
              aria-hidden="true"
            >
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center">
              {/* 追加したらただのborderにする */}
              {isEdit[index] ? (
                <button
                  type="button"
                  onClick={handleAddStep}
                  className="inline-flex items-center gap-x-1.5 rounded-full bg-white px-3 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                >
                  <PlusIcon
                    className="-ml-1 -mr-0.5 h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                  <span>手順を追加</span>
                </button>
              ) : (
                <div className="mb-5"></div>
              )}
            </div>
          </div>
        </div>
      ))}
    </>
  );
};
