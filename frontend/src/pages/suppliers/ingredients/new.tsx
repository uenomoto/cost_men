import React from "react";
import { NextPage } from "next";
import { SupplierRegistrationTab } from "../../../../components/molecules/tab/SupplierRegistrationTab";
import { SupplierIngredientTable } from "../../../../components/organisms/SupplierIngredientTable";
import { ErrorMessage } from "../../../../components/atoms/messeage/ErrorMessage";
import { SuccessMessage } from "../../../../components/atoms/messeage/SuccessMessage";

const SupplierIngredientNew: NextPage = () => {
  return (
    <>
      <h1 className="text-xl lg:text-3xl">
        こちらのタブをクリックし仕入れ先か原材料の登録を初めてください
      </h1>
      <ErrorMessage />
      <SuccessMessage />
      <SupplierRegistrationTab />
      <SupplierIngredientTable />
    </>
  );
};

export default SupplierIngredientNew;
