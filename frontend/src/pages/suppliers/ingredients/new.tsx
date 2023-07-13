import React from "react";
import { SupplierRegistrationTab } from "../../../../components/molecules/tab/SupplierRegistrationTab";
import { SupplierIngredientTable } from "../../../../components/organisms/SupplierIngredientTable";

const SupplierIngredientNew = () => {
  return (
    <>
      <h1 className="text-xl lg:text-3xl">
        こちらのタブをクリックし仕入れ先か原材料の登録を初めてください
      </h1>
      <SupplierRegistrationTab />
      <SupplierIngredientTable />
    </>
  );
};

export default SupplierIngredientNew;
