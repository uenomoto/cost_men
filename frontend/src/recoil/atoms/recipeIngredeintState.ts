import { SelectedIngredient } from "@/types";
import { atom } from "recoil";

export const recipeIngredientState = atom<SelectedIngredient[]>({
  key: "recipeIngredientState",
  default: [
    {
      ingredient: {
        id: 0,
        name: "",
        unit: "",
        buy_cost: 0,
        buy_quantity: 0,
        supplier_id: 0,
        supplier: {
          id: 0,
          user_id: "",
          name: "",
          contact_info: "",
          ingredients: [],
        },
      },
      quantity: "0",
    },
  ],
});
