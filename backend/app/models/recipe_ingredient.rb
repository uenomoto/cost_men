# frozen_string_literal: true

class RecipeIngredient < ApplicationRecord
  belongs_to :recipe
  belongs_to :ingredient

  # レシピに同じ原材料が複数登録されないようにする
  validates :recipe_id, uniqueness: { scope: :ingredient_id }
  validates :quantity, presence: true, numericality: { greater_than_or_equal_to: 0 }

  # レシピの編集(レシピ原材料の追加や削除が行われた場合)でレシピの合計金額を更新する
  after_destroy :update_total_cost
  after_save :update_total_cost

  def update_total_cost
    total_cost = recipe.recipe_ingredients.sum do |recipe_ingredient|
      (recipe_ingredient.ingredient.buy_cost / recipe_ingredient.ingredient.buy_quantity) * recipe_ingredient.quantity
    end
    total_cost = total_cost.ceil
    recipe.update(total_cost:)
  end
end
