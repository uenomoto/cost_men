import React, { useState, useCallback, FormEvent, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import { PlusIcon } from "@heroicons/react/20/solid";
import { TrashIcon } from "@heroicons/react/20/solid";
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

  // 手順を追加するテキストエリアを表示、空欄で再度追加はできないようにする
  const handleAddStep = useCallback(() => {
    const emptyProcedure = newProcedures.some((procedure) => procedure === "");

    if (!emptyProcedure) {
      setNewProcedures([...newProcedures, ""]);
    }
  }, [newProcedures]);

  // 手順を削除する
  const handleRemoveStep = useCallback(
    (index: number) => {
      if (confirm("手順を削除しますか？")) {
        setNewProcedures(newProcedures.filter((_, idx) => idx !== index));
      }
    },
    [newProcedures]
  );

  // 新しい手順の文字を状態管理する
  const handleChange = useCallback(
    (index: number, newProcedure: string) => {
      const updatedProcedures = [...newProcedures];
      updatedProcedures[index] = newProcedure;
      setNewProcedures(updatedProcedures);
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

  // 登録済みの手順を削除
  const handleDelete = async (procedureId: number) => {
    if (confirm("手順を削除しますか？") === false) return;
    try {
      await axios.delete(
        `${process.env.NEXT_PUBLIC_IP_ENDPOINT}/recipes/${id}/procedures/${procedureId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setExistingProcedures(
        existingProcedures.filter((procedure) => procedure.id !== procedureId)
      );
    } catch (error: AxiosError | any) {
      console.log(error.message);
    }
  };

  return (
    <>
      {existingProcedures.map((procedure, index) => (
        <>
          <div key={procedure.id}>
            <ReactMarkdown className="text-left font-bold text-2xl">
              {procedure.procedure}
            </ReactMarkdown>
          </div>
          <div className="flex justify-end">
            <TrashIcon
              className="h-6 w-6 text-gray-500 cursor-pointer transition-all duration-300 hover:scale-110 hover:text-red-500"
              aria-hidden="true"
              onClick={() => handleDelete(procedure.id)}
            />
          </div>
          <div className="relative my-4">
            <div
              className="absolute inset-0 flex items-center"
              aria-hidden="true"
            >
              <div
                className={`w-full ${
                  index < existingProcedures.length - 1
                    ? "border-t border-gray-300"
                    : ""
                }`}
              />
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
          <div className="text-right">
            <button
              className="text-md font-bold text-red-500 mt-5 transition-all duration-500 hover:scale-110 hover:text-red-700"
              onClick={() => handleRemoveStep(index)}
            >
              作成中の手順を削除
            </button>
          </div>
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
            disabled={newProcedures.some((procedure) => procedure === "")}
            className="inline-flex items-center gap-x-1.5 rounded-full bg-white px-3 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
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
