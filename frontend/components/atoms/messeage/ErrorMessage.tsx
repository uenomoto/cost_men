import { XCircleIcon } from "@heroicons/react/20/solid";
import { errorMessageState } from "@/recoil/atoms/errorMessageState";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { useEffect, useRef } from "react";

export const ErrorMessage = () => {
  const errorMessage = useRecoilValue(errorMessageState);
  const setErrorMessage = useSetRecoilState(errorMessageState);

  const timeoutId = useRef<NodeJS.Timeout | null>(null);

  // 3秒後にメッセージを非表示にする
  useEffect(() => {
    if (errorMessage) {
      if (timeoutId.current) clearTimeout(timeoutId.current);

      timeoutId.current = setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  }, [errorMessage, setErrorMessage]);

  return (
    errorMessage && (
      <div className="rounded-md bg-red-50 p-4">
        <div className="flex items-center">
          <XCircleIcon
            onClick={() => setErrorMessage(null)}
            className="h-10 w-10 cursor-pointer text-red-400"
            aria-hidden="true"
          />
          <div className="ml-4">
            <h3 className="text-md font-bold text-red-800">
              条件に満たさないため登録できませんでした
            </h3>
            <div className="mt-2 text-xl text-red-700">
              <ul role="list" className="text-left list-disc space-y-1 pl-5">
                {Array.isArray(errorMessage) ? (
                  errorMessage.map((error, index) => (
                    <li key={index}>{error}</li>
                  ))
                ) : (
                  <li>{errorMessage}</li>
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
    )
  );
};
