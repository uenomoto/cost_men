import React, { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
}

export const PrimaryButton = ({ children }: ButtonProps) => {
  return (
    <button
      type="button"
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ease-in transition-all"
    >
      {children}
    </button>
  );
};
