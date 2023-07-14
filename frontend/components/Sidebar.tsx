import { Fragment, useState } from "react";
import { useRouter } from "next/router";
import { Dialog, Transition } from "@headlessui/react";
import Link from "next/link";
import {
  Bars3Icon,
  XMarkIcon,
  InboxIcon,
  ReceiptRefundIcon,
  ReceiptPercentIcon,
  BuildingStorefrontIcon,
  ArrowLeftOnRectangleIcon,
} from "@heroicons/react/24/outline";

const classNames = (...classes: (string | false)[]): string => {
  return classes.filter(Boolean).join(" ");
};

export const Sidebar = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const router = useRouter();

  const navigation = [
    { name: "レシピ一覧", href: "/recipes", icon: InboxIcon },
    { name: "レシピ登録", href: "#", icon: ReceiptPercentIcon },
    {
      name: "仕入れ先登録",
      href: "/suppliers/ingredients/new",
      icon: BuildingStorefrontIcon,
    },
    {
      name: "原材料登録",
      href: "/suppliers/ingredients/new",
      icon: ReceiptRefundIcon,
    },
    {
      name: "ログアウト",
      href: "/",
      icon: ArrowLeftOnRectangleIcon,
    },
  ];

  const isActive = (href: string) => {
    return router.pathname === href;
  };

  return (
    <>
      <div>
        <Transition.Root show={sidebarOpen} as={Fragment}>
          <Dialog
            as="div"
            className="relative z-50 lg:hidden"
            onClose={setSidebarOpen}
          >
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-gray-900/80" />
            </Transition.Child>

            <div className="fixed inset-0 flex">
              <Transition.Child
                as={Fragment}
                enter="transition ease-in-out duration-300 transform"
                enterFrom="-translate-x-full"
                enterTo="translate-x-0"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="translate-x-0"
                leaveTo="-translate-x-full"
              >
                <Dialog.Panel className="relative mr-16 flex w-full max-w-xs flex-1">
                  <Transition.Child
                    as={Fragment}
                    enter="ease-in-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in-out duration-300"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <div className="absolute left-full top-0 flex w-16 justify-center pt-5">
                      <button
                        type="button"
                        className="-m-2.5 p-2.5"
                        onClick={() => setSidebarOpen(false)}
                      >
                        <span className="sr-only">Close sidebar</span>
                        <XMarkIcon
                          className="h-6 w-6 text-white"
                          aria-hidden="true"
                        />
                      </button>
                    </div>
                  </Transition.Child>
                  {/* ↓ハンバーガーサイドバー */}
                  <div className="flex grow flex-col overflow-y-auto pt-5 bg-sky-600 px-6 pb-2 ring-1 ring-white/10">
                    <nav className="flex flex-1 flex-col">
                      <div className="text-white mb-4">LOGO</div>
                      <ul role="list" className="flex flex-1 flex-col gap-y-7">
                        <li>
                          <ul role="list" className="-mx-2 space-y-1">
                            {navigation.map((item) => (
                              <li key={item.name}>
                                <Link
                                  href={item.href}
                                  className={classNames(
                                    isActive(item.href)
                                      ? "bg-sky-800 text-white"
                                      : "text-gray-400 hover:text-white hover:bg-sky-800",
                                    "group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold"
                                  )}
                                >
                                  <item.icon
                                    className="h-6 w-6 shrink-0"
                                    aria-hidden="true"
                                  />
                                  {item.name}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </li>
                      </ul>
                    </nav>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition.Root>

        <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-52 lg:flex-col">
          <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-sky-400 px-6">
            <div className="flex h-16 shrink-0 items-center"></div>
            <nav className="flex flex-1 flex-col">
              <div className="text-white mb-4">CostMenLogo</div>
              <ul role="list" className="flex flex-1 flex-col gap-y-7">
                <li>
                  <ul role="list" className="-mx-3 space-y-5">
                    {navigation.map((item) => (
                      <li key={item.name}>
                        <Link
                          href={item.href}
                          className={classNames(
                            isActive(item.href)
                              ? "bg-sky-800 text-white"
                              : "text-gray-700 hover:text-white hover:bg-sky-800",
                            "group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold"
                          )}
                        >
                          <item.icon
                            className="h-6 w-6 shrink-0"
                            aria-hidden="true"
                          />
                          {item.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </li>
              </ul>
            </nav>
          </div>
        </div>
        <div className="sticky top-0 z-40 flex items-center gap-x-6 px-4 py-4 sm:px-6 lg:hidden">
          <button
            type="button"
            className="-m-2.5 p-2.5 text-sky-700 lg:hidden"
            onClick={() => setSidebarOpen(true)}
          >
            <Bars3Icon className="h-6" aria-hidden="true" />
          </button>
        </div>
      </div>
    </>
  );
};
