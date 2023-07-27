import { atom } from "recoil";

// どこからでも参照できるようにする
export const errorMessageState = atom<string[] | string | null>({
  key: "errorMessageState",
  default: null,
});
