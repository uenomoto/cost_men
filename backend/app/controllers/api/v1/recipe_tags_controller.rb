# frozen_string_literal: true

module Api
  module V1
    class RecipeTagsController < ApplicationController
      def index
        recipe_tags = RecipeTag.where(recipe_id: params[:recipe_id])
        render json: { recipe_tags: recipe_tags }, status: :ok
      end

      # Form Objectで作成したので、レシピ登録時のタグ登録は不要だが、個々でタグを追加する場合は、このアクションを使う
      def create; end

      def destroy; end
    end
  end
end
