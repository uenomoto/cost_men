import React from "react";

interface ButtonProps {
  text: string;
  onClick: () => void;
}

export const SuccessButton = ({ text, onClick }: ButtonProps) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded ease-in transition-all"
    >
      {text}
    </button>
  );
};
