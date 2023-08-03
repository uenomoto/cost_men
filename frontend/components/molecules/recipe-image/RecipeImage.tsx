import React, {
  ChangeEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import Image from "next/image";
import { useSetRecoilState } from "recoil";
import { warningMessageState } from "@/recoil/atoms/warningMessageState";

type Props = {
  onImageChange: (file: File | null) => void; // 親コンポーネントにファイルを渡す
};

export const RecipeImage = ({ onImageChange }: Props) => {
  const [preview, setPreview] = useState<string | null>("/no_image.png");

  // DOM操作したい時はuseRefを使う
  const fileInputRef = useRef<HTMLInputElement>(null);

  const setWarningMessage = useSetRecoilState(warningMessageState);

  // ファイルが選択された時に発火するイベントハンドラ関数
  const handleImageChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files ? e.target.files[0] : null;
      if (!file) {
        setPreview(null);
        return;
      }
      // fileのMIMEタイプをチェック
      if (!file.type.startsWith("image/")) {
        setWarningMessage("画像ファイルを選択してください");
        setPreview("/no_image.png");
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);

      // ここで親コンポーネントに画像情報を渡す
      onImageChange(file);
    },
    [onImageChange, setWarningMessage]
  );

  // 画像選択ボタンを押した時に発火するイベントハンドラ関数(useRefを使う)
  const handleButtonClick = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    fileInputRef.current?.click();
  }, []);

  return (
    <>
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
          画像を選択
        </button>
      </div>
      <div className="col-span-1">
        {preview && (
          <Image src={preview} alt="recipe" width={300} height={400} priority />
        )}
      </div>
    </>
  );
};
