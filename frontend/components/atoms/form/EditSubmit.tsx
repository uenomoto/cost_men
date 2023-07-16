import React, { FormEvent } from "react";

type SubmitProps = {
  text: string;
  onClick: (e: FormEvent) => void;
};

export const EditSubmit = ({ text, onClick }: SubmitProps) => {
  return (
    <div className="text-center">
      <button
        type="submit"
        className="bg-sky-500 hover:bg-sky-700 text-white font-bold py-2 px-24 rounded"
        onClick={onClick}
      >
        {text}
      </button>
    </div>
  );
};
