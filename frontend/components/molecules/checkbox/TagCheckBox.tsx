import { Tag } from "@/types";
import { useState } from "react";

const tags: Tag[] = [
  {
    id: 1,
    name: "ラーメン",
  },
  {
    id: 2,
    name: "主食",
  },
  {
    id: 3,
    name: "上物",
  },
  {
    id: 4,
    name: "副菜",
  },
  {
    id: 5,
    name: "ごはんもの",
  },
  {
    id: 6,
    name: "なんか",
  },
  {
    id: 7,
    name: "なんか2",
  },
  {
    id: 8,
    name: "なんか3",
  },
  {
    id: 9,
    name: "なんか4",
  },
  {
    id: 10,
    name: "なんか5",
  },
  {
    id: 11,
    name: "なんか6",
  },
  {
    id: 12,
    name: "なんか7",
  },
];

export const TagCheckBox = () => {
  const [checkedTags, setCheckedTags] = useState<Record<number, boolean>>(
    tags.reduce((acc, current) => ({ ...acc, [current.id]: false }), {})
  );

  const handleCheckChange = (tagId: number, isChecked: boolean) => {
    setCheckedTags((prevState) => ({
      ...prevState,
      [tagId]: isChecked,
    }));

    console.log(
      `タグのID ${tagId} とチェック状態 ${
        isChecked ? "checked" : "unchecked"
      }. 現在の全てのタグチェックの状態:`,
      checkedTags
    );
  };

  return (
    <fieldset>
      <span className="font-bold">タグを選択してください</span>
      <legend className="sr-only">タグ</legend>
      <div className="grid grid-cols-3 gap-4 lg:gap-x-4 overflow-y-auto px-3 py-1 h-40 border-2 border-sky-300 rounded-md">
        {tags.map((tag) => (
          <div className="relative flex items-start" key={tag.id}>
            <div className="flex h-6 items-center">
              <input
                type="checkbox"
                aria-describedby="tag-description"
                id={tag.id.toString()}
                name={tag.name}
                className="h-4 w-4 rounded border-gray-300 text-sky-400 focus:ring-sky-400"
                checked={checkedTags[tag.id]}
                onChange={(e) => handleCheckChange(tag.id, e.target.checked)}
              />
            </div>
            <div className="ml-3 text-sm leading-6">
              <label
                htmlFor={tag.id.toString()}
                className="font-bold text-gray-900"
              >
                {tag.name}
              </label>
            </div>
          </div>
        ))}
      </div>
    </fieldset>
  );
};
