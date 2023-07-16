import React, { useState, useCallback, FormEvent } from "react";
import ReactMarkdown from "react-markdown";
import { PlusIcon } from "@heroicons/react/20/solid";
import { TextArea } from "../form/TextArea";
import { SaveButton } from "../form/SaveSubmit";
import { Submit } from "../form/Submit";

export const Divider = () => {
  const [texts, setTexts] = useState<string[]>([""]);
  const [isEdit, setIsEdit] = useState<boolean[]>([true]);

  const handleAddStep = useCallback(
    (index: number) => {
      const newIsEdit = [...isEdit];
      newIsEdit[index] = false;
      setIsEdit(newIsEdit);
      setTexts([...texts, ""]);
      setIsEdit([...newIsEdit, true]);
    },
    [texts, isEdit]
  );

  const handleChenge = useCallback(
    (index: number, newText: string) => {
      const newItems = [...texts];
      newItems[index] = newText;
      setTexts(newItems);
    },
    [texts]
  );

  const handleSubmit = useCallback(
    (e: FormEvent) => {
      e.preventDefault();
      const validTexts =
        texts[texts.length - 1] === "" ? texts.slice(0, -1) : texts;
      console.log(validTexts);
      setIsEdit(validTexts.map(() => false).concat(true));
      setTexts([...validTexts, ""]);
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
                  onClick={() => handleAddStep(index)}
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
      <div className="my-7 flex justify-end">
        <Submit text="手順を保存する" onClick={handleSubmit} />
      </div>
    </>
  );
};
