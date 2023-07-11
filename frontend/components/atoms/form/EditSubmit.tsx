import React from "react";

type SubmitProps = {
  text: string;
  onClick: () => void;
};

export const EditSubmit = ({ text, onClick }: SubmitProps) => {
  return (
    <button
      type="submit"
      className="bg-sky-500 hover:bg-sky-700 text-white font-bold py-2 px-4 rounded"
      onClick={onClick}
    >
      {text}
    </button>
  );
};
