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

  # レシピで使用する原材料の合計金額を計算する(全て計算し終わったら、合計を小数点第一位で切り上げる)
  def total_cost
    total = recipe_ingredients.sum do |recipe_ingredient|
      (recipe_ingredient.ingredient.buy_cost / recipe_ingredient.ingredient.buy_quantity) * recipe_ingredient.quantity
    end
    total.ceil
  end
end
