# frozen_string_literal: true

module Api
  module V1
    class RecipesController < SecuredController
      before_action :authorize_request

      def index; end

      def show; end

      # レシピ登録でtagとingredientも一緒に登録する、Form Objectで作成したクラスを使用する
      def create
        form = RecipeTagIngredientForm.new(recipe_params.merge(user: current_user))

        if form.save
          render json: { status: 'SUCCESS!', data: form.recipe }, status: :created
        else
          render json: { status: 'ERROR', data: form.errors }, status: :unprocessable_entity
        end
      end

      def update; end

      def destroy; end

      private

      # RecipeTagIngredientFormで定義したパラメータを受け取る
      def recipe_params
        params.require(:recipe).permit(:recipe_name, :recipe_image_url, checked_tags: [], recipes: %i[id quantity])
      end
    end
  end
end
