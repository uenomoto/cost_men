# frozen_string_literal: true

module Api
  module V1
    class RecipesController < SecuredController
      before_action :authorize_request
      before_action :update_find_recipe, only: %i[update]

      # レシピの一覧とそのレシピの原材料とレシピについているタグを取得
      def index
        page_number = params[:page] || 1
        recipes = current_user.recipes.includes(:recipe_ingredients, :tags).page(page_number).per(3)
        render json: { recipes: recipes.map do |recipe|
                                  recipe.as_json(include: {
                                                   recipe_ingredients: {
                                                     include: :ingredient
                                                   },
                                                   tags: {}
                                                 })
                                end,
                       meta: { total_pages: recipes.total_pages } }
      end

      # 取得するものはindexと同じで1つの(/:id)レシピのみを取得
      def show
        recipe = current_user.recipes.find(params[:id])
        render json: { recipe: recipe.as_json(include: {
                                                recipe_ingredients: {
                                                  include: :ingredient
                                                },
                                                tags: {}
                                              }) }
      end

      # レシピ登録でtagとingredientも一緒に登録する、Form Objectで作成したクラスを使用する
      def create
        form = RecipeTagIngredientForm.new(recipe_params.merge(user: current_user))

        if form.save
          render json: { status: 'SUCCESS!', data: form.recipe }, status: :created
        else
          render json: { data: form.errors.full_messages }, status: :unprocessable_entity
        end
      end

      def update
        if @edit_form.update(recipe_params)
          render json: { status: 'SUCCESS!', data: @edit_form.recipe }, status: :ok
        else
          render json: { data: @edit_form.errors.full_messages }, status: :unprocessable_entity
        end
      end

      def destroy
        recipe = Recipe.find(params[:id])
        recipe.destroy
        head :no_content
      end

      private

      def update_find_recipe
        @edit_form = RecipeTagIngredientEditForm.new(recipe_params.merge(user: current_user))
        @edit_form.recipe = current_user.recipes.find(params[:id])
        @edit_form
      end

      # RecipeTagIngredientFormで定義したパラメータを受け取る
      def recipe_params
        params.require(:recipe).permit(:recipe_name, :recipe_image_url,
                                       checked_tags: {},
                                       recipe_ingredients: %i[id quantity])
      end
    end
  end
end
