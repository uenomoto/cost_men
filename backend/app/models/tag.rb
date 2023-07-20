# frozen_string_literal: true

class Tag < ApplicationRecord
  belongs_to :user
  has_many :recipe_tags, dependent: :destroy
  has_many :recipes, through: :recipe_tags  # タグが削除されたらレシピは消されたくないため、dependent: :destroyは不要

  validates :name, presence: true, uniqueness: true, length: { maximum: 50 }

  scope :oldest, -> { order(created_at: :asc) }
end
