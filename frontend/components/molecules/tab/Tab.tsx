import { useState } from "react";
import { IngredientIndex } from "../../organisms/IngredientIndex";
import { Procedure } from "../../organisms/Procedure";

type Tab = {
  name: string;
};

const tabs = [{ name: "原材料一覧" }, { name: "手順一覧" }];

export const Tab = () => {
  // 初期のタブを設定
  const [currentTab, setCurrentTab] = useState(tabs[0].name);

  return (
    <div className="mt-10">
      <nav className="isolate flex divide-x divide-gray-200 rounded-lg shadow-lg">
        {tabs.map((tab) => (
          <button
            key={tab.name}
            onClick={() => {
              setCurrentTab(tab.name);
            }}
            className="relative min-w-0 md:w-60 shadow-lg flex-1 overflow-hidden bg-white py-4 px-5 text-center text-lg font-medium hover:bg-gray-100 focus:z-10"
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
      {currentTab === "原材料一覧" && <IngredientIndex />}
      {currentTab === "手順一覧" && <Procedure />}
    </div>
  );
};
