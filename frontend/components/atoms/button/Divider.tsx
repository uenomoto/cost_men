import React, { useState, useCallback, FormEvent, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import { PlusIcon } from "@heroicons/react/20/solid";
import { TextArea } from "../form/TextArea";
import { Submit } from "../form/Submit";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/router";
import { tokenState } from "@/recoil/atoms/tokenState";
import { useRecoilValue } from "recoil";
import { ExistingRecipeProcedure } from "@/types";

export const Divider = () => {
  const token = useRecoilValue(tokenState);
  const router = useRouter();
  const { id } = router.query;

  const [existingProcedures, setExistingProcedures] = useState<
    ExistingRecipeProcedure[]
  >([]); // 既存の手順一覧state
  const [newProcedures, setNewProcedures] = useState<string[]>([]); // 新規に追加する手順一覧state

  // 手順を追加するテキストエリアを表示
  const handleAddStep = useCallback(() => {
    setNewProcedures([...newProcedures, ""]);
  }, [newProcedures]);

  // 新しい手順の文字を状態管理する
  const handleChange = useCallback(
    (index: number, newProcedure: string) => {
      const updatedProcedures = [...newProcedures];
      updatedProcedures[index] = newProcedure;
      setNewProcedures(updatedProcedures);
      console.log(updatedProcedures);
    },
    [newProcedures]
  );

  // 手順を保存する
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const params = {
      recipe_procedure: {
        procedure: newProcedures,
      },
    };

    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_IP_ENDPOINT}/recipes/${id}/procedures`,
        params,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      console.log(res.data.recipe_procedures);
      setExistingProcedures([
        ...existingProcedures,
        ...res.data.recipe_procedures,
      ]);
      setNewProcedures([]);
    } catch (error: AxiosError | any) {
      console.log(error.response.data.errors);
    }
  };

  // 手順一覧を取得
  useEffect(() => {
    const getProcedures = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_IP_ENDPOINT}/recipes/${id}/procedures`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setExistingProcedures(
          res.data.recipe_procedures.map(
            (procedure: ExistingRecipeProcedure) => procedure
          )
        );
      } catch (error: AxiosError | any) {
        console.log(error.message);
      }
    };
    getProcedures();
  }, [id, token]);

  return (
    <>
      {existingProcedures.map((procedure, index) => (
        <>
          <div key={index}>
            <ReactMarkdown className="text-left font-bold text-2xl">
              {procedure.procedure}
            </ReactMarkdown>
          </div>
          <div className="relative my-4">
            <div
              className="absolute inset-0 flex items-center"
              aria-hidden="true"
            >
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center"></div>
          </div>
        </>
      ))}
      {newProcedures.map((procedure, index) => (
        <div key={index}>
          <TextArea
            text={procedure}
            setText={(newProcedure: string) =>
              handleChange(index, newProcedure)
            }
          />
        </div>
      ))}
      <div className="relative my-4">
        <div className="absolute inset-0 flex items-center" aria-hidden="true">
          <div className="w-full border-t border-gray-300" />
        </div>
        <div className="relative flex justify-center">
          <button
            type="button"
            onClick={handleAddStep}
            className="inline-flex items-center gap-x-1.5 rounded-full bg-white px-3 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
          >
            <PlusIcon
              className="-ml-1 -mr-0.5 h-5 w-5 text-gray-400"
              aria-hidden="true"
            />
            <span>手順を追加</span>
          </button>
        </div>
      </div>
      <div className="my-7 flex justify-end">
        <Submit text="手順を保存する" onClick={handleSubmit} />
      </div>
    </>
  );
};
