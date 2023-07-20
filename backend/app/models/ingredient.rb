# frozen_string_literal: true

class Ingredient < ApplicationRecord
  belongs_to :supplier
  has_many :recipe_ingredients, dependent: :destroy
  has_many :recipes, through: :recipe_ingredients

  validates :name, presence: true
  validates :unit, presence: true
  validates :buy_cost, presence: true, numericality: { greater_than_or_equal_to: 0 }
  validates :buy_quantity, presence: true, numericality: { greater_than_or_equal_to: 0 }
end
