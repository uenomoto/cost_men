# frozen_string_literal: true

module Api
  module V1
    class RecipeProceduresController < SecuredController
      before_action :authorize_request
      before_action :set_current_user_recipe
      before_action :set_recipe_procedure, only: %i[update destroy]

      def index
        recipe_procedures = @recipe.recipe_procedures.oldest
        render json: { recipe_procedures: recipe_procedures.map(&:as_json) }, status: :ok
      end

      def create
        # 変数recipe_proceduresとerrorsを複数代入で同時に定義
        recipe_procedures, errors = RecipeProcedure.build_and_save_all(@recipe, recipe_procedure_params[:procedure])

        if recipe_procedures
          render json: { recipe_procedures: recipe_procedures }, status: :created
        else
          render json: { errors: errors }, status: :unprocessable_entity
        end
      end

      def update
        if @recipe_procedure.update(recipe_procedure_update_params)
          render json: { recipe_procedure: @recipe_procedure }, status: :ok
        else
          render json: { errors: @recipe_procedure.errors.full_messages }, status: :unprocessable_entity
        end
      end

      def destroy
        @recipe_procedure.destroy
        head :no_content
      end

      private

      def set_current_user_recipe
        @recipe = current_user.recipes.find(params[:recipe_id])
      end

      def set_recipe_procedure
        @recipe_procedure = @recipe.recipe_procedures.find(params[:id])
      end

      def recipe_procedure_params
        params.require(:recipe_procedure).permit(procedure: [])
      end

      def recipe_procedure_update_params
        params.require(:recipe_procedure).permit(:procedure)
      end
    end
  end
end
