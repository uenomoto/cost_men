import React, { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
}

export const EditButton = ({ children }: ButtonProps) => {
  return (
    <button
      type="button"
      className="bg-sky-500 hover:bg-sky-700 text-white font-bold py-2 px-4 rounded ease-in transition-all"
    >
      {children}
    </button>
  );
};
