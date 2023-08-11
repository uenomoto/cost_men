import React, { ChangeEvent, useState } from "react";

type InputProps = {
  htmlfor: string;
  text: string;
  type: string;
  placeholder: string;
  value: string | number;
  name: string;
  min?: number;
  id: string;
  validationErrors?: string | null;
  onBlur?: (e: ChangeEvent<HTMLInputElement>) => void;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

export const Input = ({
  htmlfor,
  text,
  type,
  placeholder,
  value,
  name,
  id,
  min,
  validationErrors,
  onBlur,
  onChange,
}: InputProps) => {
  return (
    <>
      <div className="relative">
        <label
          htmlFor={htmlfor}
          className="absolute -top-2 left-2 inline-block bg-gray-100 rounded-3xl px-1 text-xs font-bold text-gray-900"
        >
          {text}
        </label>
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          name={name}
          id={id}
          min={min}
          onChange={onChange}
          onBlur={onBlur} // 一度focusされてfocusが失った時に空欄だったら空欄禁止バリデーションを実行
          className={`block w-full rounded-md border-0 py-3 mb-1 text-gray-900 shadow-lg ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6 ${
            validationErrors
              ? "focus:ring-2 focus:ring-inset focus:ring-red-500 bg-red-50"
              : "focus:ring-2 focus:ring-inset focus:ring-sky-500"
          }`}
        />
        {validationErrors && (
          <p className="text-sm font-bold text-red-500 text-left">
            {validationErrors}
          </p>
        )}
      </div>
    </>
  );
};
