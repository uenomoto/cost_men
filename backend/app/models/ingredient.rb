# frozen_string_literal: true

class Ingredient < ApplicationRecord
  belongs_to :supplier
  has_many :recipe_ingredients, dependent: :destroy
  has_many :recipes, through: :recipe_ingredients

  validates :name, presence: true
  validates :unit, presence: true
  validates :buy_cost, presence: true, numericality: { greater_than_or_equal_to: 1 }
  validates :buy_quantity, presence: true, numericality: { greater_than_or_equal_to: 1 }

  scope :leatest, -> { order(created_at: :desc) }

  # 編集したと同時に更新後の詳細の情報を返す
  def self.ingredient_with_supplier(ingredient)
    ingredient.attributes.merge(
      supplier: { id: ingredient.supplier.id, name: ingredient.supplier.name,
                  contact_info: ingredient.supplier.contact_info }
    )
  end
end
