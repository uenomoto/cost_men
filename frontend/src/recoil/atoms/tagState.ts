import { atom } from "recoil";
import { Tag } from "../../types";

export const tagState = atom<Tag[]>({
  key: "tagState",
  default: [],
});
