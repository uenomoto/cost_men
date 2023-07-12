import { Tab } from "@headlessui/react";

const classNames = (...classes: (string | false)[]): string => {
  return classes.filter(Boolean).join(" ");
};

export const TextArea = () => {
  return (
    <Tab.Group>
      {({ selectedIndex }) => (
        <>
          <Tab.List className="flex items-center">
            <Tab
              className={({ selected }) =>
                classNames(
                  selected
                    ? "bg-gray-100 text-gray-900 hover:bg-gray-200"
                    : "bg-white text-gray-500 hover:bg-gray-100 hover:text-gray-900",
                  "rounded-md border border-transparent px-3 py-1.5 text-sm font-medium"
                )
              }
            >
              Write
            </Tab>
            <Tab
              className={({ selected }) =>
                classNames(
                  selected
                    ? "bg-gray-100 text-gray-900 hover:bg-gray-200"
                    : "bg-white text-gray-500 hover:bg-gray-100 hover:text-gray-900",
                  "ml-2 rounded-md border border-transparent px-3 py-1.5 text-sm font-medium"
                )
              }
            >
              Preview
            </Tab>
          </Tab.List>
          <Tab.Panels className="mt-2">
            <Tab.Panel className="-m-0.5 rounded-lg p-0.5">
              <div>
                <textarea
                  rows={5}
                  name="comment"
                  id="comment"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"
                  placeholder="ここに手順を書いていってください！"
                  defaultValue={""}
                />
              </div>
            </Tab.Panel>
            <Tab.Panel className="-m-0.5 rounded-lg p-0.5">
              <div className="border-b">
                <div className="mx-px mt-px px-3 pb-12 pt-2 text-sm leading-5 text-gray-800">
                  Preview content will render here.
                </div>
              </div>
            </Tab.Panel>
          </Tab.Panels>
        </>
      )}
    </Tab.Group>
  );
};
