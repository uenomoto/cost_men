import { atom } from "recoil";

export const warningMessageState = atom<string | null>({
  key: "warningMessageState",
  default: null,
});
