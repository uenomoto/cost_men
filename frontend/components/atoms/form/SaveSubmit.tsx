import React, { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
}

export const SaveButton = ({ children }: ButtonProps) => {
  return (
    <button
      type="submit"
      className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded ease-in transition-all"
    >
      {children}
    </button>
  );
};
