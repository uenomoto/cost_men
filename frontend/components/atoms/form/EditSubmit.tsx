import React, { FormEvent } from "react";
import { LoadingSpinner } from "../../molecules/loading/LoadingSpinner";

type SubmitProps = {
  text: string;
  onClick: (e: FormEvent) => void;
  disabled: boolean;
};

export const EditSubmit = ({ text, onClick, disabled }: SubmitProps) => {
  return (
    <div className="text-center">
      <button
        type="submit"
        onClick={onClick}
        disabled={disabled}
        className="bg-sky-500 hover:bg-sky-700 text-white font-bold py-2 px-24 rounded disabled:hover:bg-sky-500 disabled:cursor-not-allowed"
      >
        {disabled ? <LoadingSpinner /> : text}
      </button>
    </div>
  );
};
