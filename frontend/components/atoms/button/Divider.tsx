import React, { useState, useCallback, FormEvent, useEffect } from "react";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/router";
import ReactMarkdown from "react-markdown";
import { ExistingRecipeProcedure } from "@/types";
import { PlusIcon } from "@heroicons/react/20/solid";
import { TrashIcon } from "@heroicons/react/20/solid";
import { PencilIcon } from "@heroicons/react/20/solid";
import { CheckIcon } from "@heroicons/react/20/solid";
import { XCircleIcon } from "@heroicons/react/24/solid";
import { tokenState } from "@/recoil/atoms/tokenState";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { successMessageState } from "@/recoil/atoms/successMessageState";
import { errorMessageState } from "@/recoil/atoms/errorMessageState";
import { TextArea } from "../form/TextArea";
import { SuccessMessage } from "../messeage/SuccessMessage";
import { ErrorMessage } from "../messeage/ErrorMessage";
import { Loading } from "../../molecules/loading/Loading";
import { DeleteModal } from "../../modal/DeleteModal";
import { LoadingSpinner } from "../../molecules/loading/LoadingSpinner";

export const Divider = () => {
  const token = useRecoilValue(tokenState);
  const router = useRouter();
  const { id } = router.query;
  const setSuccessMessage = useSetRecoilState(successMessageState);
  const setErrorMessage = useSetRecoilState(errorMessageState);
  const [loading, setLoading] = useState<boolean>(true);
  const [dbOperationLoading, setDbOperationLoading] = useState<boolean>(false);

  const [existingProcedures, setExistingProcedures] = useState<
    ExistingRecipeProcedure[]
  >([]); // 既存の手順一覧state
  const [newProcedures, setNewProcedures] = useState<string[]>([]); // 新規に追加する手順一覧state

  // 手順編集する際にIDを取得管理するstate
  const [editprocedureId, setEditProcedureId] = useState<number | null>(null);
  const [editProcedure, setEditProcedure] = useState<string>("");

  // 手順削除するステート
  const [confirmDelete, setConfirmDelete] = useState<
    (() => Promise<void>) | null
  >(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

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
      if (confirm("保存前の手順を削除しますか？")) {
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
    setDbOperationLoading(true);

    try {
      const params = {
        recipe_procedure: {
          procedure: newProcedures,
        },
      };
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_IP_ENDPOINT}/recipes/${id}/procedures`,
        params,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (res.status === 201) {
        setExistingProcedures([
          ...existingProcedures,
          ...res.data.recipe_procedures,
        ]);
        setNewProcedures([]);
        setSuccessMessage("手順を保存しました");
      }
    } catch (error: AxiosError | any) {
      console.log(error.response.data.errors);
      setErrorMessage(error.response.data.errors);
    } finally {
      setDbOperationLoading(false);
    }
  };

  // 手順一覧を取得
  useEffect(() => {
    const getProcedures = async () => {
      if (!id) return;
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
      } finally {
        setLoading(false);
      }
    };
    getProcedures();
  }, [id, token]);

  // 登録済みの手順を削除
  const handleDelete = async (procedureId: number) => {
    const confirmDeleteFunc = async () => {
      try {
        await axios.delete(
          `${process.env.NEXT_PUBLIC_IP_ENDPOINT}/recipes/${id}/procedures/${procedureId}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );

        setExistingProcedures(
          existingProcedures.filter((procedure) => procedure.id !== procedureId)
        );
        setSuccessMessage("手順を削除しました");
      } catch (error: AxiosError | any) {
        console.log(error.message);
        setErrorMessage("手順の削除に失敗しました");
      } finally {
        setDeleteModalOpen(false);
      }
    };

    setConfirmDelete(() => confirmDeleteFunc);
    setDeleteModalOpen(true);
  };

  // 手順を編集する
  const handleEdit = async (e: FormEvent, procedureId: number) => {
    e.preventDefault();

    try {
      const params = {
        recipe_procedure: {
          procedure: editProcedure,
        },
      };

      const res = await axios.patch(
        `${process.env.NEXT_PUBLIC_IP_ENDPOINT}/recipes/${id}/procedures/${procedureId}`,
        params,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setExistingProcedures(
        existingProcedures.map((procedure) =>
          procedure.id === procedureId ? res.data.recipe_procedure : procedure
        )
      );
      setEditProcedureId(null);
      setSuccessMessage("手順を編集しました");
    } catch (error: AxiosError | any) {
      console.log(error.response.data.errors);
      setErrorMessage(error.response.data.errors);
    }
  };

  return (
    <>
      {loading && <Loading />}
      {existingProcedures.map((procedure, index) => (
        <>
          <div key={procedure.id}>
            {editprocedureId === procedure.id ? (
              <>
                <div className="flex items-center space-x-10">
                  <XCircleIcon
                    className="h-6 w-6 cursor-pointer text-red-500 hover:text-red-700"
                    onClick={() => setEditProcedureId(null)}
                  />
                  <textarea
                    placeholder="手順を編集"
                    rows={5}
                    name="editProcedure"
                    id="editProcedure"
                    className="font-bold text-md block w-1/2 rounded-md border-0 py-1.5 text-gray-900 shadow-lg ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:leading-6"
                    value={editProcedure}
                    onChange={(e) => setEditProcedure(e.target.value)}
                  />
                </div>
              </>
            ) : (
              <ReactMarkdown className="text-left font-bold text-2xl">
                {procedure.procedure}
              </ReactMarkdown>
            )}
          </div>
          <div className="flex justify-end space-x-3">
            {editprocedureId === procedure.id ? (
              <CheckIcon
                className="h-6 w-6 text-green-500 cursor-pointer transition-all duration-300 hover:scale-110 hover:text-green-700"
                onClick={(e) => handleEdit(e, procedure.id)}
              />
            ) : (
              <PencilIcon
                className="h-6 w-6 text-gray-500 cursor-pointer transition-all duration-300 hover:scale-110 hover:text-sky-500"
                aria-hidden="true"
                onClick={() => {
                  setEditProcedureId(procedure.id);
                  setEditProcedure(procedure.procedure);
                }}
              />
            )}
            <TrashIcon
              className="h-6 w-6 text-gray-500 cursor-pointer transition-all duration-300 hover:scale-110 hover:text-red-500"
              aria-hidden="true"
              onClick={() => handleDelete(procedure.id)}
            />
            <DeleteModal
              text="手順を削除しますか？"
              open={deleteModalOpen}
              setDeleteModalOpen={setDeleteModalOpen}
              onConfirm={() => confirmDelete && confirmDelete()}
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
      <ErrorMessage />
      <SuccessMessage />
      <div className="my-7 flex justify-end">
        <div className="mb-12">
          <button
            type="submit"
            onClick={handleSubmit}
            disabled={
              dbOperationLoading ||
              newProcedures.length === 0 ||
              newProcedures.every((p) => p.trim() === "")
            }
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-10 lg:px-24 rounded disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {dbOperationLoading ? <LoadingSpinner /> : "手順を保存する"}
          </button>
        </div>
      </div>
    </>
  );
};
