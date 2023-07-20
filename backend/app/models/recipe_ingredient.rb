# frozen_string_literal: true

class RecipeIngredient < ApplicationRecord
  belongs_to :recipe
  belongs_to :ingredient

  # レシピに同じ原材料が複数登録されないようにする
  validates :recipe_id, uniqueness: { scope: :ingredient_id }
  validates :quantity, presence: true, numericality: { greater_than_or_equal_to: 0 }
end
