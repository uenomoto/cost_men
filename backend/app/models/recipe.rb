# frozen_string_literal: true

class Recipe < ApplicationRecord
  belongs_to :user
  has_many :recipe_ingredients, dependent: :destroy
  has_many :ingredients, through: :recipe_ingredients, dependent: :destroy
  has_many :recipe_procedures, dependent: :destroy
  has_many :recipe_tags, dependent: :destroy
  has_many :tags, through: :recipe_tags, dependent: :destroy
  has_one :selling_price, dependent: :destroy # レシピに対して販売価格は一つだけ

  validates :name, presence: true, uniqueness: { scope: :user_id, case_sensitive: false }
  validates :total_cost, presence: true, numericality: { greater_than_or_equal_to: 0 }

  # 基本はレシピに対して原材料はマストである万が一空で登録したら登録はされないようにする
  # ユーザーが間違えて空の原材料フォームを追加してしまった場合に、そのフォームを無視する(reject_if: :all_blank)
  accepts_nested_attributes_for :recipe_ingredients, allow_destroy: true, reject_if: :all_blank
  validates_associated :recipe_ingredients

  scope :oldest, -> { order(created_at: :asc) }

  # レシピで使用する原材料の合計金額を計算する(全て計算し終わったら、合計を四捨五入する。frontと計算方法を合わせる事！)
  def total_cost
    total = recipe_ingredients.sum do |recipe_ingredient|
      unit_cost = (recipe_ingredient.ingredient.buy_cost.to_f / recipe_ingredient.ingredient.buy_quantity).round(1)
      (unit_cost * recipe_ingredient.quantity).round(1)
    end
    total.round
  end
end
