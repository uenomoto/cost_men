import { XCircleIcon } from "@heroicons/react/20/solid";
import { errorMessageState } from "@/recoil/atoms/errorMessageState";
import { useRecoilValue, useSetRecoilState } from "recoil";

export const ErrorMessage = () => {
  const errorMessage = useRecoilValue(errorMessageState);
  const setErrorMessage = useSetRecoilState(errorMessageState);

  return (
    errorMessage && (
      <div className="rounded-md bg-red-50 p-4">
        <div className="flex">
          <XCircleIcon
            onClick={() => setErrorMessage(null)}
            className="h-10 w-10 cursor-pointer text-red-400"
            aria-hidden="true"
          />
          <div className="ml-3">
            <h3 className="text-md font-bold text-red-800">
              条件に満たさないため登録できませんでした
            </h3>
            <div className="mt-2 text-xl text-red-700">
              <ul role="list" className="list-disc space-y-1 pl-5">
                {errorMessage.map((error, index) => (
                  <li key={index}>{error}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    )
  );
};
