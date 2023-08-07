import { useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { tagState } from "@/recoil/atoms/tagState";
import { editTagState } from "@/recoil/atoms/editTagState";
import { useRouter } from "next/router";
import { TagEnptyStates } from "../enptyStates/TagEnptyStates";

// 親コンポーネントにチェック状態を渡す 編集では使わないのでオプショナルプロパティにする
type Props = {
  onTagCheckChange?: (checkedTags: Record<number, boolean>) => void;
};

export const TagCheckBox = ({ onTagCheckChange }: Props) => {
  const tags = useRecoilValue(tagState); // 全てのタグ一覧
  const checkedEditTags = useRecoilValue(editTagState); // 編集用で登録されているタグ
  const setEditTag = useSetRecoilState(editTagState);

  // 編集ページか登録ページかを判定する
  const router = useRouter();
  const isEditPage = router.pathname.startsWith("/recipes/edit/");

  // 新規登録、タグのチェック状態を管理する
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

      if (onTagCheckChange) {
        // 親コンポーネントに新しい状態を通知する
        setTimeout(() => {
          onTagCheckChange(newState);
        }, 0);
      }

      return newState;
    });
  };

  // 編集専用のタグのチェック状態を管理する
  const handleCheckChangeEdit = (tagId: number, isChecked: boolean) => {
    setEditTag((prevState) => {
      const editState = {
        ...prevState,
        [tagId]: isChecked,
      };
      return editState;
    });
  };

  return (
    <fieldset>
      <span className="font-bold">
        <span className="text-xs text-red-400 mr-1">※選択必須</span>
        タグを選択してください
      </span>
      <legend className="sr-only">タグ</legend>
      <div className="grid grid-cols-3 gap-1 lg:gap-x-4 overflow-y-auto px-3 py-1 h-40 border-2 border-sky-300 rounded-md">
        {tags.length === 0 && !isEditPage && <TagEnptyStates />}
        {tags.map((tag) => (
          <>
            <div className="relative flex items-start" key={tag.id}>
              <div className="flex h-6 items-center">
                <input
                  type="checkbox"
                  aria-describedby="tag-description"
                  id={tag.id.toString()}
                  name={tag.name}
                  className="h-4 w-4 rounded border-gray-300 text-sky-400 focus:ring-sky-400"
                  checked={
                    isEditPage
                      ? checkedEditTags[tag.id] || false
                      : checkedTags[tag.id] || false
                  }
                  onChange={(e) =>
                    isEditPage
                      ? handleCheckChangeEdit(tag.id, e.target.checked)
                      : handleCheckChange(tag.id, e.target.checked)
                  }
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
          </>
        ))}
      </div>
    </fieldset>
  );
};
