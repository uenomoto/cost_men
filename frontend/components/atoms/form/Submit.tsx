import React, { FormEvent } from "react";
import { LoadingSpinner } from "../../molecules/loading/LoadingSpinner";

type SubmitProps = {
  text: string;
  onClick: (e: FormEvent) => void;
  disabled: boolean;
};

export const Submit = ({ text, onClick, disabled }: SubmitProps) => {
  return (
    <div className="text-center">
      <button
        type="submit"
        onClick={onClick}
        disabled={disabled}
        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-10 lg:px-24 rounded disabled:opacity-70 disabled:hover:bg-green-500 disabled:cursor-not-allowed"
      >
        {disabled ? <LoadingSpinner /> : text}
      </button>
    </div>
  );
};
