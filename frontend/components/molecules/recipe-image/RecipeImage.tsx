import React, { ChangeEvent, useState } from "react";
import Image from "next/image";

export const RecipeImage = () => {
  const [preview, setPreview] = useState<string | null>("/no_image.png");

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

  return (
    <div>
      <input type="file" accept="image/*" onChange={handleImageChange} />

      {preview && (
        <Image src={preview} alt="chosen" width={400} height={500} priority />
      )}
    </div>
  );
};
