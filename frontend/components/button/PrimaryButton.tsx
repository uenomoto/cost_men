import React, { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
}

export const PrimaryButton = ({ children }: ButtonProps) => {
  return (
    <div className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded cursor-pointer inline-block">
      {children}
    </div>
  );
};
