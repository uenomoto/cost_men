import React from "react";

type LabelProps = {
  text: string;
};

export const Label = ({ text }: LabelProps) => {
  return <p className="text-sm text-gray-500">{text}</p>;
};
