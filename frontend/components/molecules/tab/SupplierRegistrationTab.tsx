import React, { useState } from "react";
import { SuppliersForm } from "../form/SuppliersForm";
import { IngredidentForm } from "../form/IngredidentForm";

type Tab = {
  name: string;
};

const tabs = [{ name: "仕入れ先登録" }, { name: "原材料登録" }];

export const SupplierRegistrationTab = () => {
  // 初期のタブを設定
  const [currentTab, setCurrentTab] = useState(tabs[0].name);

  return (
    <>
      <div className="mt-10">
        <nav className="isolate flex divide-x divide-gray-200 rounded-lg shadow-lg">
          {tabs.map((tab) => (
            <button
              key={tab.name}
              onClick={() => {
                setCurrentTab(tab.name);
              }}
              className="relative min-w-0 w-64 shadow-lg flex-1 overflow-hidden bg-white py-4 px-5 text-center text-lg font-medium hover:bg-gray-100 focus:z-10"
            >
              <span>{tab.name}</span>
              {/* タブが現在選択中のCSS↓ */}
              <span
                className={`${
                  currentTab === tab.name ? "bg-sky-500" : "bg-transparent"
                } absolute inset-x-0 bottom-0 h-0.5`}
              />
            </button>
          ))}
        </nav>
        {currentTab === "仕入れ先登録" && <SuppliersForm />}
        {currentTab === "原材料登録" && <IngredidentForm />}
      </div>
    </>
  );
};
