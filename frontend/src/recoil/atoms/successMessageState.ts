import { atom } from "recoil";

export const successMessageState = atom<string | null>({
  key: "successMessageState",
  default: null,
});
