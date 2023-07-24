# レシピ編集フォーム
class RecipeTagIngredientEditForm
  include ActiveModel::Model

  attr_accessor :recipe_name, :recipe_image_url, :checked_tags, :recipe_ingredients, :user

  # 編集なためrecipeは読み取りも書き込みも可能にする
  attr_writer :recipe

  validates :recipe_name, presence: true
  validates :checked_tags, presence: true
  validates :recipe_ingredients, presence: true
  validate :ingredients_must_exist, :tags_must_exist

  def update(params)
    return false unless valid?

    ActiveRecord::Base.transaction do
      update_recipe
      update_recipe_tags
      update_recipe_ingredients
      update_total_cost
    end

    true
  rescue ActiveRecord::RecordInvalid => e
    errors.add(:base, e.message)
    false
  end

  private

  # 特定のレシピを更新する
  def update_recipe
    @recipe.update!(name: recipe_name, image_aws_url: recipe_image_url, total_cost: 0)
  end

  def update_recipe_tags
    @recipe.recipe_tags.destroy_all
    # 新たにチェックされたタグを登録(編集)する
    checked_tags.each do |tag_id, checked|
      RecipeTag.create!(recipe: @recipe, tag_id:) if checked
    end
  end

  def update_recipe_ingredients
    @recipe.recipe_ingredients.destroy_all
    recipe_ingredients.each do |ingredient|
      RecipeIngredient.create!(recipe: @recipe, ingredient_id: ingredient[:id], quantity: ingredient[:quantity])
    end
  end

  def update_total_cost
    # total_costを計算する前にrecipe_ingredientsをリロードして最新のデータを取得する(quantityの部分)
    @recipe.recipe_ingredients.reload
    @recipe.update!(total_cost: @recipe.update_total_cost)
  end

  # 材料のバリデーションをチェックする
  def ingredients_must_exist
    @ingredients = recipe_ingredients.map do |ingredient|
      Ingredient.find_by(id: ingredient[:id])
    end.compact

    return unless @ingredients.size != recipe_ingredients.size

    errors.add(:recipe_ingredients, '一部の材料が存在しません')
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