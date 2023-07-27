import { atom } from "recoil";
import { Supplier } from "../../types";

export const suppliersState = atom<Supplier[]>({
  key: "suppliersState", // ユニークなID（コンポーネントから参照する際に使用）
  default: [], // 初期値は空の配列
});
