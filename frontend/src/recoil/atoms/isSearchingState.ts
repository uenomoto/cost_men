import { atom } from "recoil";

export const isSearchingState = atom<boolean>({
  key: "isSearchingState",
  default: false,
});
