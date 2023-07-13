import React from "react";
import { useState, useCallback } from "react";
import { PlusIcon } from "@heroicons/react/20/solid";
import { TextArea } from "../form/TextArea";

export const Divider = () => {
  const [texts, setTexts] = useState<string[]>([""]);

  const handleAddStep = useCallback(() => {
    setTexts([...texts, ""]);
  }, [texts]);

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
          <TextArea
            text={text}
            setText={(newText) => handleChenge(index, newText)}
          />
          <div className="relative mt-4">
            <div
              className="absolute inset-0 flex items-center"
              aria-hidden="true"
            >
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center">
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
            </div>
          </div>
        </div>
      ))}
    </>
  );
};
