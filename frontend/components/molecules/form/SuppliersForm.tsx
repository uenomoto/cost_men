import React, { ChangeEvent, useState } from "react";
import { FormEvent } from "react";
import axios, { AxiosError, AxiosResponse } from "axios";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { tokenState } from "@/recoil/atoms/tokenState";
import { successMessageState } from "@/recoil/atoms/successMessageState";
import { Supplier } from "@/types";
import { Input } from "../../atoms/form/Input";
import { AlertBadge } from "../../atoms/badge/AlertBadge";
import { Submit } from "../../atoms/form/Submit";

type ValidationErrorState = {
  name?: string;
};

export const SuppliersForm = () => {
  const [name, setName] = useState<string>("");
  const [contactInfo, setContactInfo] = useState<string>("");
  const [dbOperationLoading, setDbOperationLoading] = useState<boolean>(false); // DB操作中はボタンを非活性

  const token = useRecoilValue(tokenState); // RecoilのTokenを取得する
  const setSuccessMessage = useSetRecoilState(successMessageState);

  // バリデーションエラーを格納するステート
  const [validationErrors, setValidationErrors] =
    useState<ValidationErrorState>({ name: "" });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setDbOperationLoading(true);
    const params = {
      supplier: {
        name: name,
        contact_info: contactInfo,
      },
    };
    try {
      const res: AxiosResponse<Supplier> = await axios.post(
        `${process.env.NEXT_PUBLIC_IP_ENDPOINT}/suppliers`,
        params,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (res.status === 201) {
        setName("");
        setContactInfo("");
        setSuccessMessage("仕入れ先を登録しました");
        setValidationErrors({ name: "" });
      }
    } catch (error: AxiosError | any) {
      if (error.response && error.response.data.errors) {
        setValidationErrors(error.response.data.errors);
      }
    } finally {
      setDbOperationLoading(false);
    }
  };

  // 入力したその時に値を監視し送信ボタンを押さなくても、一度フォーカスしてフォーカスが外れた場合、入力必須バリデーションを実行
  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setName(value);

    if (!value) {
      setValidationErrors((prev) => ({ ...prev, name: "入力必須項目です" }));
    } else {
      setValidationErrors((prev) => ({ ...prev, name: undefined }));
    }
  };

  const isSubmitButtonDisabled = Object.values(validationErrors).some(
    (error) => error !== undefined
  );

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
          <AlertBadge text="入力必須" />
          <Input
            htmlfor="name"
            text="仕入れ先名"
            type="text"
            placeholder="仕入れ先名を入力してください"
            id="name"
            name="name"
            value={name}
            onChange={handleNameChange}
            onBlur={handleNameChange}
            validationErrors={
              validationErrors.name ? validationErrors.name : null
            }
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
            onChange={(e) => setContactInfo(e.target.value)}
          />
        </div>
        <Submit
          text="登録する"
          onClick={handleSubmit}
          disabled={dbOperationLoading || isSubmitButtonDisabled}
          dbOperationLoading={dbOperationLoading}
        />
      </div>
    </div>
  );
};
