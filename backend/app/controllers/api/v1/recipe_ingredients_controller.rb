# frozen_string_literal: true

module Api
  module V1
    class RecipeIngredientsController < SecuredController
      before_action :authorize_request

      # recipe_ingredientsのindexはレシピ詳細ページで使用する
      def index
        recipe_ingredients = RecipeIngredient.where(recipe_id: params[:recipe_id])
        render json: { recipe_ingredients: recipe_ingredients.map(&:as_json) }, status: :ok
      end

      # 個々でレシピの原材料は登録する場面がないので落ち着いたら削除する
      def create; end

      def update; end
    end
  end
end
