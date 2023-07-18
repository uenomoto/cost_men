# frozen_string_literal: true

class Recipe < ApplicationRecord
  belongs_to :user, primary_key: :sub
  has_many :recipe_ingredients, dependent: :destroy
  has_many :ingredients, through: :recipe_ingredients, dependent: :destroy
  has_many :recipe_procedures, dependent: :destroy
  has_many :recipe_tags, dependent: :destroy
  has_many :tags, through: :recipe_tags, dependent: :destroy
  has_many :selling_prices, dependent: :destroy
end
