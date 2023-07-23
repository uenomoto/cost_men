# frozen_string_literal: true

# Form Objctを使用し、レシピとタグと材料を同時に登録するクラスです
class RecipeTagIngredientForm
  include ActiveModel::Model

  # Next.js側のフォームから送られてくるデータを受け取る
  attr_accessor :recipe_name, :recipe_image_url, :checked_tags, :recipes

  # 読み取り専用でrecipeをcreateアクションに返す
  attr_reader :recipe

  validates :recipe_name, presence: true
  validates :checked_tags, presence: true
  validates :recipes, presence: true
  validate :ingredients_must_exist, :tags_must_exist

  def save
    return false unless valid?

    # トランザクションを使用し、レシピとタグと材料を同時に登録する
    ActiveRecord::Base.transaction do
      create_recipe
      create_recipe_tags
      create_recipe_ingredients
    end

    true
  rescue ActiveRecord::RecordInvalid => e
    errors.add(:base, e.message)
    false
  end

  private

  # method分割　レシピを登録する
  def create_recipe
    @recipe = Recipe.create!(name: recipe_name, image_aws_url: recipe_image_url)
  end

  # method分割　recipeに紐づくtagを登録する(配列)
  def create_recipe_tags
    checked_tags.each do |tag_id, checked|
      RecipeTag.create!(recipe: @recipe, tag_id:) if checked # checkedがtrueの場合のみ登録する
    end
  end

  # method分割　recipeに紐づくingredientと数量を登録する(配列)
  def create_recipe_ingredients
    recipes.each do |ingredient|
      # ingredient[:id]は材料のid、ingredient[:quantity]は材料の量
      RecipeIngredient.create!(recipe: @recipe, ingredient_id: ingredient[:id], quantity: ingredient[:quantity])
    end
  end

  # 材料のバリデーションをチェックする
  def ingredients_must_exist
    @ingredients = recipes.map do |ingredient|
      Ingredient.find_by(id: ingredient[:id])
    end.compact

    return unless @ingredients.size != recipes.size

    errors.add(:recipes, '一部の材料が存在しません')
  end

  def tags_must_exist
    # 同様にタグのバリデーションもチェックする
    @tags = checked_tags.map do |tag_id, _checked|
      Tag.find_by(id: tag_id)
    end.compact

    return unless @tags.size != checked_tags.size

    errors.add(:tags, '一部のタグが存在しません')
  end
end
