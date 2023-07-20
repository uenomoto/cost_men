# frozen_string_literal: true

class RecipeIngredient < ApplicationRecord
  belongs_to :recipe
  belongs_to :ingredient

  # レシピに同じ原材料が複数登録されないようにする
  validates :recipe, uniqueness: { scope: :ingredient_id }
  # レシピ作成時に原材料は必須
  validates :ingredient, presence: true
  validates :quantity, presence: true, numericality: { greater_than_or_equal_to: 0 }
end
