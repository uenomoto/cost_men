# frozen_string_literal: true

module Api
  module V1
    class RecipeIngredientsController < ApplicationController

      # ポストマンでしっかりと数量が保存されているか確認するために、indexアクションを作成する(後で削除)
      def index
        recipe_ingredients = RecipeIngredient.where(recipe_id: params[:recipe_id])
        render json: { recipe_ingredients: recipe_ingredients }, status: :ok
      end

      # 個々でレシピの原材料は登録する場面がないので落ち着いたら削除する
      def create; end

      def update; end
    end
  end
end
