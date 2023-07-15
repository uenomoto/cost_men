import React from "react";

type SubmitProps = {
  text: string;
  onClick: () => void;
};

export const Submit = ({ text, onClick }: SubmitProps) => {
  return (
    <div className="text-center">
      <button
        type="submit"
        onClick={onClick}
        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-24 rounded"
      >
        {text}
      </button>
    </div>
  );
};
