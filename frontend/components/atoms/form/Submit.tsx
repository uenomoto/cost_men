import React, { FormEvent } from "react";
import { LoadingSpinner } from "../../molecules/loading/LoadingSpinner";

type SubmitProps = {
  text: string;
  onClick: (e: FormEvent) => void;
  disabled: boolean;
  dbOperationLoading: boolean;
};

export const Submit = ({
  text,
  onClick,
  disabled,
  dbOperationLoading,
}: SubmitProps) => {
  return (
    <div className="text-center">
      <button
        type="submit"
        onClick={onClick}
        disabled={dbOperationLoading || disabled}
        className={`bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-10 mt-5 lg:px-24 rounded  disabled:hover:bg-green-500 disabled:cursor-not-allowed 
        ${disabled && "opacity-50"} 
        ${dbOperationLoading && "disabled:opacity-100"}`}
      >
        {dbOperationLoading ? <LoadingSpinner /> : text}
      </button>
    </div>
  );
};
