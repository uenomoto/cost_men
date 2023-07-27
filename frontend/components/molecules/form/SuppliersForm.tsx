import React, { useEffect, useState } from "react";
import { FormEvent } from "react";
import axios from "axios";
import { useRecoilValue } from "recoil";
import { tokenState } from "@/recoil/atoms/tokenState";
import { Input } from "../../atoms/form/Input";
import { AlertBadge } from "../../atoms/badge/AlertBadge";
import { Submit } from "../../atoms/form/Submit";

export const SuppliersForm = () => {
  const [name, setName] = useState<string>("");
  const [contactInfo, setContactInfo] = useState<string>("");

  const token = useRecoilValue(tokenState); // RecoilのTokenを取得する

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    // console.log(valueName, valueContactInfo);

    const params = {
      supplier: {
        name: name,
        contact_info: contactInfo,
      },
    };
    console.log(params);
    // console.log(token);

    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_IP_ENDPOINT}/suppliers`,
        params,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log("success");
      setName("");
      setContactInfo("");
    } catch (error) {
      console.log(error);
    }
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
        <div className="w-full mt-5">
          <AlertBadge />
          <Input
            htmlfor="name"
            text="仕入れ先名"
            type="text"
            placeholder="仕入れ先名をに入力してください"
            id="name"
            name="name"
            value={name}
            onChange={setName}
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
            value={contactInfo}
            onChange={setContactInfo}
          />
        </div>
        <Submit text="登録する" onClick={handleSubmit} />
      </div>
    </div>
  );
};
