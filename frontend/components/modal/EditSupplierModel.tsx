import React, { useState } from "react";
import { Modal } from "./Modal";
import { Input } from "../atoms/form/Input";
import { EditSubmit } from "../atoms/form/EditSubmit";

export const EditSupplierModel = () => {
  // 仕入れ先を編集するモーダルとinputのstate
  const [supplierOpen, setSupplierOpen] = useState(false);
  const [supplierName, setSupplierName] = useState("");
  const [contactInfo, setContactInfo] = useState("");

  const supplierHandleSubmit = () => {
    console.log(
      `仕入れ先名前: ${supplierName}, 仕入れ先連絡先: ${contactInfo}`
    );

    setSupplierName("");
    setContactInfo("");
  };

  return (
    <>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={() => setSupplierOpen(true)}
      >
        仕入れ先を編集する
      </button>
      <Modal open={supplierOpen} setModalOpen={setSupplierOpen}>
        <div className="text-center">
          <h3 className="text-3xl leading-6 font-medium text-gray-900">
            仕入れ先を編集する
          </h3>
        </div>
        <form action="#" method="PUT" className="py-10">
          <div className="p-7">
            <div className="">
              <Input
                text="仕入れ先名"
                htmlfor="supplierName"
                type="text"
                name="supplierName"
                id="supplierName"
                placeholder="仕入れ先名"
                value={supplierName}
                onChange={setSupplierName}
              />
            </div>
            <Input
              text="連絡先情報"
              htmlfor="contactInfo"
              type="text"
              name="contactInfo"
              id="contactInfo"
              placeholder="連絡先情報"
              value={contactInfo}
              onChange={setContactInfo}
            />
          </div>
          <EditSubmit
            text="編集する"
            onClick={() => {
              supplierHandleSubmit();
              setSupplierOpen(false);
            }}
          />
        </form>
      </Modal>
    </>
  );
};
