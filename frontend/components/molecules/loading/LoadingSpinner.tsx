import React from "react";

export const LoadingSpinner = () => {
  return (
    <div className="flex items-center text-center" aria-label="読み込み中">
      <div className="animate-spin h-7 w-7 border-4 border-green-800 rounded-full border-t-transparent"></div>
    </div>
  );
};
