# frozen_string_literal: true

class Supplier < ApplicationRecord
  belongs_to :user
  has_many :ingredients, dependent: :destroy

  validates :name, presence: true, uniqueness: { scope: :user_id, case_sensitive: false }, length: { maximum: 50 }
  validates :contact_info, length: { maximum: 100 }

  scope :oldest, -> { order(created_at: :asc) }
  scope :with_order_ingredients, -> { includes(:ingredients).order(created_at: :asc) }

  # 仕入れ先一覧取得する1つの仕入れ先でページネーションを行う
  def self.with_ingredients_for_user(user, page = 1, per_page = 1)
    paginated_suppliers = user.suppliers.with_order_ingredients.page(page).per(per_page)
    suppliers_data = paginated_suppliers.map do |supplier|
      ingredients_data = supplier.ingredients.map do |ingredient|
        {
          id: ingredient.id,
          supplier_id: ingredient.supplier_id,
          buy_cost: ingredient.buy_cost,
          buy_quantity: ingredient.buy_quantity,
          unit: ingredient.unit,
          name: ingredient.name
        }
      end

      {
        id: supplier.id,
        user_id: supplier.user_id,
        name: supplier.name,
        contact_info: supplier.contact_info,
        ingredients: ingredients_data
      }
    end
    { suppliers: suppliers_data, total_pages: paginated_suppliers.total_pages }
  end

  # 全ての仕入れ先の原材料を取得する
  def self.with_all_ingredients_for_user(user)
    suppliers_with_ingredients = user.suppliers.with_order_ingredients

    suppliers_with_ingredients.map do |supplier|
      supplier.attributes.merge(
        ingredients: supplier.ingredients.map do |ingredient|
                       ingredient.slice(:id, :supplier_id, :buy_cost, :buy_quantity, :unit, :name)
                     end
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
