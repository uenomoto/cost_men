import React from "react";

export const Loading = () => {
  return (
    <div className="flex items-center text-center" aria-label="読み込み中">
      <span className="font-bold mr-3">ロード中です........</span>
      <div className="animate-spin h-10 w-10 border-4 border-blue-500 rounded-full border-t-transparent"></div>
    </div>
  );
};
