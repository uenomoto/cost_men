# frozen_string_literal: true

class Supplier < ApplicationRecord
  belongs_to :user
  has_many :ingredients, dependent: :destroy

  validates :name, presence: true, uniqueness: { scope: :user_id, case_sensitive: false }, length: { maximum: 50 }
  validates :contact_info, length: { maximum: 100 }

  scope :oldest, -> { order(created_at: :asc) }

  # 少し複雑なDB操作なためモデルに記述します
  def self.with_ingredients_for_user(user)
    user.suppliers.oldest.select(:id, :user_id, :name, :contact_info).includes(:ingredients).map do |supplier|
      supplier.attributes.merge(
        ingredients: supplier.ingredients.select(:id, :supplier_id, :buy_cost, :buy_quantity, :unit, :name)
      )
    end
  end

  # 詳細取得し編集後のデータを返す
  def self.with_ingredient_for_user(supplier)
    supplier.attributes.merge(
      ingredients: supplier.ingredients.select(:id, :supplier_id, :buy_cost, :buy_quantity, :unit, :name)
    )
  end

  # 検索できるカラムの設定
  def self.ransackable_attributes(_auth_object = nil)
    ['name']
  end
end
