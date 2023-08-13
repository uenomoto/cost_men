import React from "react";
import { Divider } from "../atoms/button/Divider";

export const Procedure = () => {
  return (
    <div className="lg:w-[64rem] md:w-[56rem] sm:w-[35rem]">
      <h2 className="text-3xl my-5 pb-2 text-left border-b-2 border-sky-300">
        手順
        <span className="ml-5 text-xs text-sky-600 font-bold">
          ※ 改行する場合は<span className="text-red-500">1行</span>
          空けてください
        </span>
      </h2>
      <Divider />
    </div>
  );
};
