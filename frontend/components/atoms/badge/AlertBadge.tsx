import React from "react";

export const AlertBadge = () => {
  return (
    <div className="text-left">
      <span className="inline-flex items-center mb-3 rounded-full bg-red-50 px-1.5 py-0.5 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/10">
        入力必須です
      </span>
    </div>
  );
};
