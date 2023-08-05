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
        お先に仕入れ先を登録し原材料の登録してください
      </h1>
      <ErrorMessage />
      <SupplierRegistrationTab />
      <SuccessMessage />
      <SupplierIngredientTable />
    </>
  );
};

export default SupplierIngredientNew;
