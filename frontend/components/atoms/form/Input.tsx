import React from "react";

type InputProps = {
  htmlfor: string;
  text: string;
  type: string;
  placeholder: string;
  value: string;
  name: string;
  id: string;
  onChange: (value: string) => void;
};

export const Input = ({
  htmlfor,
  text,
  type,
  placeholder,
  value,
  name,
  id,
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
          onChange={(e) => onChange(e.target.value)}
          className="block w-full rounded-md border-0 py-3 mb-5 text-gray-900 shadow-lg ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-500 sm:text-sm sm:leading-6"
        />
      </div>
    </>
  );
};
