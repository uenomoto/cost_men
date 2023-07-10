import React, { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
}

export const SuccessButton = ({ children }: ButtonProps) => {
  return (
    <div className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded cursor-pointer inline-block">
      {children}
    </div>
  );
};