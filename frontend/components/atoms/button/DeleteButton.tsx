import React from "react";

type DeleteButtonProps = {
  onClick: () => void;
};

export const DeleteButton = ({ onClick }: DeleteButtonProps) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="bg-red-600 hover:bg-red-900 text-white font-bold py-2 px-4 rounded ease-in transition-all"
    >
      削除
    </button>
  );
};
