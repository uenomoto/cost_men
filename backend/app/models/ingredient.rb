# frozen_string_literal: true

class Ingredient < ApplicationRecord
  belongs_to :supplier
  has_many :recipe_ingredients, dependent: :destroy
  has_many :recipes, through: :recipe_ingredients
end
