import { useState } from "react";
import { tagState } from "@/recoil/atoms/tagState";
import { useRecoilValue } from "recoil";

type Props = {
  onTagCheckChange: (checkedTags: Record<number, boolean>) => void; // 親コンポーネントにチェック状態を渡す
};

export const TagCheckBox = ({ onTagCheckChange }: Props) => {
  const tags = useRecoilValue(tagState);

  // タグのチェック状態を管理する
  const [checkedTags, setCheckedTags] = useState<Record<number, boolean>>(
    tags.reduce(
      (accumulator, current) => ({ ...accumulator, [current.id]: false }),
      {}
    )
  );

  const handleCheckChange = (tagId: number, isChecked: boolean) => {
    setCheckedTags((prevState) => {
      const newState = {
        ...prevState,
        [tagId]: isChecked,
      };
      // 親コンポーネントに新しい状態を通知する
      setTimeout(() => {
        onTagCheckChange(newState);
      }, 0);
      return newState;
    });
  };

  return (
    <fieldset>
      <span className="font-bold">タグを選択してください</span>
      <legend className="sr-only">タグ</legend>
      <div className="grid grid-cols-3 gap-1 lg:gap-x-4 overflow-y-auto px-3 py-1 h-40 border-2 border-sky-300 rounded-md">
        {tags.map((tag) => (
          <div className="relative flex items-start" key={tag.id}>
            <div className="flex h-6 items-center">
              <input
                type="checkbox"
                aria-describedby="tag-description"
                id={tag.id.toString()}
                name={tag.name}
                className="h-4 w-4 rounded border-gray-300 text-sky-400 focus:ring-sky-400"
                checked={checkedTags[tag.id] || false}
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
