# frozen_string_literal: true

class RecipeIngredient < ApplicationRecord
  belongs_to :recipe
  belongs_to :ingredient

  # レシピに同じ原材料が複数登録されないようにする
  validates :recipe_id, uniqueness: { scope: :ingredient_id }
  validates :quantity, presence: true, numericality: { greater_than_or_equal_to: 0 }

  after_destroy :update_recipe_total_cost
  # 数量変更時自動でrecipeのtotal_costを更新する
  after_save :update_recipe_total_cost

  private

  def update_recipe_total_cost
    recipe.update(total_cost: recipe.total_cost)
  end
end
