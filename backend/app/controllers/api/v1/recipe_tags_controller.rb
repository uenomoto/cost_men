# frozen_string_literal: true

module Api
  module V1
    class RecipeTagsController < SecuredController
      before_action :authorize_request

      def index
        recipe_tags = RecipeTag.where(recipe_id: params[:recipe_id]).includes(:tag)
        recipe_tags_with_names = recipe_tags.map do |recipe_tag|
          recipe_tag.attributes.merge({ tag_name: recipe_tag.tag.name })
        end
        render json: { recipe_tags: recipe_tags_with_names }, status: :ok
      end

      # レシピ登録後でもタグのみをチェック入れたら(複数可)特定のレシピからタグを追加できるようにする
      def create
        checked_tags = recipe_tag_params_true
        RecipeTag.add_tags!(params[:recipe_id], checked_tags)
        render json: { checked_tags: }, status: :created
      rescue ActiveRecord::RecordInvalid => e
        render json: { errors: e.record.errors.full_messages }, status: :unprocessable_entity
      end

      # レシピ登録後でもタグのチェックを外した時に特定のレシピからタグを一つずつ削除する
      def destroy
        RecipeTag.delete_tag!(params[:recipe_id], params[:id])
        head :no_content
      rescue ActiveRecord::RecordNotFound => e
        render json: { errors: e.message }, status: :not_found
      end

      private

      # nextから送られてきたchecked_tagsの中からtrueのものだけを取り出す
      def recipe_tag_params_true
        params.require(:checked_tags).permit!.to_h.select { |_k, v| v == true }.keys
      end
    end
  end
end
