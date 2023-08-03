# frozen_string_literal: true

# Form Objctを使用し、レシピとタグと材料を同時に登録するクラスです
class RecipeTagIngredientForm
  include ActiveModel::Model

  # Next.js側のフォームから送られてくるデータを受け取る
  attr_accessor :recipe_name, :recipe_image_url, :checked_tags, :recipe_ingredients, :user

  # 読み取り専用でrecipeをcreateアクションに返す
  attr_reader :recipe

  validates :recipe_name, presence: true
  validates :checked_tags, presence: true
  validates :recipe_ingredients, presence: true
  validate :ingredients_must_exist, :tags_must_exist, :ingredients_quantity_must_be_positive, :image_url_check

  def save
    return false unless valid?

    ActiveRecord::Base.transaction do
      create_recipe
      create_recipe_tags
      create_recipe_ingredients
      update_total_cost
    end

    true
  rescue ActiveRecord::RecordInvalid => e
    errors.add(:base, e.message)
    false
  end

  private

  # method分割　ログイン中のユーザーと自動で紐付けレシピを登録する
  def create_recipe
    @recipe = user.recipes.create!(name: recipe_name, image_aws_url: recipe_image_url, total_cost: 0)
  end

  # method分割　recipeに紐づくtagを登録する(ハッシュ)
  def create_recipe_tags
    checked_tags.each do |tag_id, checked|
      RecipeTag.create!(recipe: @recipe, tag_id:) if checked # checkedがtrueの場合のみ登録する
    end
  end

  # method分割　recipeに紐づくingredientと数量を登録する(ハッシュ)
  def create_recipe_ingredients
    recipe_ingredients.each do |ingredient|
      # ingredient[:id]は材料のid、ingredient[:quantity]は材料の量
      RecipeIngredient.create!(recipe: @recipe, ingredient_id: ingredient[:id], quantity: ingredient[:quantity])
    end
  end

  # method分割 recipeで使用する原材料の合計金額を計算する
  def update_total_cost
    # total_costを計算する前にrecipe_ingredientsをリロードして最新のデータを取得する(quantityの部分)
    recipe.recipe_ingredients.reload
    recipe.update!(total_cost: recipe.total_cost)
  end

  # 材料の数量が1以上であり空欄でないかをチェックする
  def ingredients_quantity_must_be_positive
    recipe_ingredients.each do |ingredient|
      if ingredient[:quantity].blank? || ingredient[:quantity].to_i <= 0
        errors.add(:recipe_ingredients, '全ての材料の数量は0以上でなければなりません')
      end
    end
  end

  # 材料がしっかりと存在するかをチェックする
  def ingredients_must_exist
    @ingredients = recipe_ingredients.map do |ingredient|
      Ingredient.find_by(id: ingredient[:id])
    end.compact

    return unless @ingredients.size != recipe_ingredients.size

    errors.add(:recipe_ingredients, '一部の材料が存在しません')
  end

  def tags_must_exist
    @tags = checked_tags

    return if @tag.nil? # checked_tagsがnilの場合は早期でメソッドを抜ける

    # 同様にタグも存在するかをチェックする
    @tag.map do |tag_id, _checked|
      Tag.find_by(id: tag_id)
    end.compact

    return unless @tags.size != checked_tags.size

    errors.add(:tags, '一部のタグが存在しません')
  end

  # S3から送られてきた画像のURLが正しいかをチェックする
  def image_url_check
    url_regex = /\Ahttps:\/\/cost-men-bucket\.s3\.ap-northeast-1\.amazonaws\.com\/\w+(\-\w+)*\.(jpg|jpeg|png|gif|svg|webp)\z/
    unless recipe_image_url =~ url_regex
      errors.add(:recipe_image_url, '画像のURLが正しくありません')
    end
  end

end
