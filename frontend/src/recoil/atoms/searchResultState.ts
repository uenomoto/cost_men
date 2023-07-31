import { atom } from "recoil";
import { SearchResult } from "@/types";

export const searchResultState = atom<SearchResult>({
  key: "searchResultState",
  default: {
    suppliers: [],
  },
});
