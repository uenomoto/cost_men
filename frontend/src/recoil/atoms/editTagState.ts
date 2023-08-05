import { atom } from "recoil";

export const editTagState = atom({
  key: "editTagState",
  default: {} as Record<number, boolean>,
});
