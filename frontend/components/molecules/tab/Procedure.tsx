import React from "react";
import { useState } from "react";
import { FormEvent } from "react";
import { Divider } from "../../atoms/button/Divider";
import { TextArea } from "../../atoms/form/TextArea";
import { SaveButton } from "../../atoms/form/SaveSubmit";

const Procedure = () => {
  return (
    <>
      <h2 className="text-5xl my-5 pb-2 text-left border-b-2 border-sky-300">
        手順
      </h2>
      <Divider />
    </>
  );
};

export default Procedure;
