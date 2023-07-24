# frozen_string_literal: true

module Api
  module V1
    class RecipesController < SecuredController
      before_action :authorize_request

      # レシピの一覧とそのレシピの原材料とレシピについているタグを取得
      def index
        recipes = current_user.recipes.includes(:recipe_ingredients, :tags)
        render json: { recipes: recipes.map { |recipe|
          recipe.as_json(include: {
            recipe_ingredients: {
              include: :ingredient
            },
            tags: {}
          })
        }}
      end

      # 取得するものはindexと同じで1つの(/:id)レシピのみを取得
      def show
        recipe = current_user.recipes.find(params[:id])
        render json: { recipe: recipe.as_json(include: {
          recipe_ingredients: {
            include: :ingredient
          },
          tags: {}
        })}
      end

      # レシピ登録でtagとingredientも一緒に登録する、Form Objectで作成したクラスを使用する
      def create
        form = RecipeTagIngredientForm.new(recipe_params.merge(user: current_user))

        if form.save
          render json: { status: 'SUCCESS!', data: form.recipe }, status: :created
        else
          render json: { status: 'ERROR', data: form.errors }, status: :unprocessable_entity
        end
      end

      def update
      end

      def destroy
        recipe = Recipe.find(params[:id])
        recipe.destroy
        head :no_content
      end

      private

      # RecipeTagIngredientFormで定義したパラメータを受け取る
      def recipe_params
        # hashのkeyを取得する.try(:keys)はnilの場合のエラー回避↓
        checked_tags_keys = params[:recipe][:checked_tags].try(:keys)
        params.require(:recipe).permit(:recipe_name, :recipe_image_url,
                                       { checked_tags: checked_tags_keys },
                                       recipe_ingredients: %i[id quantity])
      end
    end
  end
end
