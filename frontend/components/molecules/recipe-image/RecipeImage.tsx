import React, { ChangeEvent, useRef, useState } from "react";
import Image from "next/image";

export const RecipeImage = () => {
  const [preview, setPreview] = useState<string | null>("/no_image.png");

  // DOM操作したい時はuseRefを使う
  const fileInputRef = useRef<HTMLInputElement>(null);

  // ファイルが選択された時に発火するイベントハンドラ関数
  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (!file) {
      setPreview(null);
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  // 画像選択ボタンを押した時に発火するイベントハンドラ関数(useRefを使う)
  const handleButtonClick = (e: React.MouseEvent) => {
    e.preventDefault();
    fileInputRef.current?.click();
  };

  return (
    <div className="grid grid-cols-1 place-items-center lg:gap-20 lg:grid-cols-2">
      <div className="col-span-1">
        <input
          type="file"
          accept="image/*"
          style={{ display: "none" }}
          ref={fileInputRef}
          onChange={handleImageChange}
        />
        <button
          type="button"
          onClick={handleButtonClick}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ease-in transition-all"
        >
          画像を選択してください
        </button>
      </div>
      <div className="col-span-1">
        {preview && (
          <Image src={preview} alt="recipe" width={300} height={400} priority />
        )}
      </div>
    </div>
  );
};
