import React from "react";

type InputProps = {
  type: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
};

export const Input = ({ type, placeholder, value, onChange }: InputProps) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="mt-3 border rounded-md px-2 py-1 w-full"
    />
  );
};
