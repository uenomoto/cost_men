import { Recipe } from "@/types";
import { atom } from "recoil";

export const recipeShowState = atom<Recipe>({
  key: "recipeShowState",
  default: {
    id: 0,
    name: "",
    total_cost: 0,
    image_aws_url: "",
    recipe_ingredients: [],
    tags: [],
  },
});
