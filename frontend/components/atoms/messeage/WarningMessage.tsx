import React, { Fragment, useEffect, useRef, useState } from "react";
import { Transition } from "@headlessui/react";
import { warningMessageState } from "@/recoil/atoms/warningMessageState";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { XMarkIcon } from "@heroicons/react/20/solid";
import { ExclamationTriangleIcon } from "@heroicons/react/24/solid";

export const WarningMessage = () => {
  const warningMessage = useRecoilValue(warningMessageState);
  const setWarningMessage = useSetRecoilState(warningMessageState);

  const timeoutId = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (warningMessage) {
      if (timeoutId.current) clearTimeout(timeoutId.current);

      timeoutId.current = setTimeout(() => {
        setWarningMessage(null);
      }, 3000);
    }
  }, [warningMessage, setWarningMessage]);

  return (
    warningMessage && (
      <>
        <div
          aria-live="assertive"
          className="pointer-events-none fixed inset-0 flex items-end px-4 py-6 sm:items-start sm:p-6"
        >
          <div className="flex w-full flex-col items-center space-y-4 sm:items-end">
            <Transition
              show={Boolean(warningMessage)}
              as={Fragment}
              enter="transform ease-out duration-300 transition"
              enterFrom="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
              enterTo="translate-y-0 opacity-100 sm:translate-x-0"
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="pointer-events-auto w-full max-w-sm overflow-hidden rounded-lg bg-white shadow-lg ring-1 ring-yellow-500 ring-opacity-5">
                <div className="p-4 bg-yellow-100">
                  <div className="flex items-start">
                    <div className="flex-shrink-0">
                      <ExclamationTriangleIcon
                        className="h-6 w-6 text-yellow-400"
                        aria-hidden="true"
                      />
                    </div>
                    <div className="ml-3 w-0 flex-1 pt-0.5">
                      <p className="text-sm font-bold text-gray-900">
                        {warningMessage}
                      </p>
                    </div>
                    <div className="ml-4 flex flex-shrink-0">
                      <button
                        type="button"
                        className="inline-flex rounded-md bg-yellow-100 text-gray-400 hover:text-gray-900 focus:outline-none focus:yellow-100"
                        onClick={() => setWarningMessage(null)}
                      >
                        <span className="sr-only">Close</span>
                        <XMarkIcon className="h-5 w-5" aria-hidden="true" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </Transition>
          </div>
        </div>
      </>
    )
  );
};
