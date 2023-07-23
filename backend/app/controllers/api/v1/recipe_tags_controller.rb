# frozen_string_literal: true

module Api
  module V1
    class RecipeTagsController < ApplicationController
      def index
        recipe_tags = RecipeTag.where(recipe_id: params[:recipe_id]).includes(:tag)
        recipe_tags_with_names = recipe_tags.map do |recipe_tag|
          recipe_tag.attributes.merge({ tag_name: recipe_tag.tag.name })
        end
        render json: { recipe_tags: recipe_tags_with_names }, status: :ok
      end

      # Form Objectで作成したので、レシピ登録時のタグ登録は不要だが、個々でタグを追加する場合は、このアクションを使う
      def create; end

      def destroy; end
    end
  end
end
