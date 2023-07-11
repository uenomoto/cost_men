import React from "react";

type SubmitProps = {
  text: string;
  onClick: () => void;
};

export const Submit = ({ text, onClick }: SubmitProps) => {
  return (
    <button
      type="submit"
      className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
      onClick={onClick}
    >
      {text}
    </button>
  );
};
