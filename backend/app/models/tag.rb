# frozen_string_literal: true

class Tag < ApplicationRecord
  has_many :recipe_tags, dependent: :destroy
  has_many :recipes, through: :recipe_tags  # タグが削除されたらレシピは消されたくないため、dependent: :destroyは不要
end
