import React, { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
}

export const SuccessButton = ({ children }: ButtonProps) => {
  return (
    <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded ease-in transition-all">
      {children}
    </button>
  );
};
