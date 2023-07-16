import React, { useState } from "react";
import { FormEvent } from "react";
import { Input } from "../../atoms/form/Input";
import { SaveButton } from "../../atoms/form/SaveSubmit";
import { AlertBadge } from "../../atoms/badge/AlertBadge";

export const SuppliersForm = () => {
  const [valueName, setValueName] = useState("");
  const [valueContactInfo, setValueContactInfo] = useState("");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(valueName, valueContactInfo);
  };
  return (
    <div className="mt-5 bg-gray-200 shadow-lg rounded-2xl">
      <div className="px-4 py-5 sm:p-6">
        <h3 className="text-base font-semibold leading-6 text-gray-900">
          仕入れ先登録
        </h3>
        <div className="mt-2 max-w-xl text-sm text-gray-500">
          <p>こちらから仕入れ先を登録できます</p>
        </div>
        <form onSubmit={handleSubmit} className="mt-5">
          <div className="w-full">
            <AlertBadge />
            <Input
              htmlfor="name"
              text="仕入れ先名"
              type="text"
              placeholder="仕入れ先名をに入力してください"
              id="name"
              name="name"
              value={valueName}
              onChange={setValueName}
            />
            <div className="text-left">
              <span className="inline-flex items-start rounded-full mb-3 bg-green-50 px-1.5 py-0.5 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                連絡先は後から登録できます
              </span>
            </div>
            <Input
              htmlfor="contactInfo"
              text="連絡先"
              type="text"
              placeholder="連絡先を入力してください"
              id="contactInfo"
              name="contactInfo"
              value={valueContactInfo}
              onChange={setValueContactInfo}
            />
          </div>
          <SaveButton>登録する</SaveButton>
        </form>
      </div>
    </div>
  );
};
