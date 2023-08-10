import React from "react";

interface ButtonProps {
  text: string;
  onClick?: () => void;
}

export const PrimaryButton = ({ text, onClick }: ButtonProps) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ease-in transition-all"
    >
      {text}
    </button>
  );
};
