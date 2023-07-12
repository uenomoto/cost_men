import React from "react";
import { FormEvent } from "react";
import { Divider } from "../../atoms/button/Divider";
import { TextArea } from "../../atoms/form/TextArea";
import { SaveButton } from "../../atoms/form/SaveSubmit";

const Procedure = () => {
  const hendlSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("submit");
  };
  return (
    <>
      <h2 className="text-5xl mt-5 text-left">手順</h2>
      <form onSubmit={hendlSubmit} action="#">
        <Divider />
        <TextArea />
        <div className="mt-5 flex justify-end">
          <SaveButton>手順を保存</SaveButton>
        </div>
      </form>
    </>
  );
};

export default Procedure;
