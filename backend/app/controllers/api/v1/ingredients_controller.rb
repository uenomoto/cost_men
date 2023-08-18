# frozen_string_literal: true

module Api
  module V1
    class IngredientsController < SecuredController
      before_action :authorize_request

      def create
        # /api/v1/ingredientsなのでリクエストボディからsupplier_idを取得する必要がある。
        supplier_id = params[:ingredient][:supplier_id]
        ingredient = current_user.suppliers.find(supplier_id).ingredients.build(ingredient_params)
        if ingredient.save
          render json: { ingredient: }, status: :created
        else
          render json: { errors: format_errors(ingredient) }, status: :unprocessable_entity
        end
      end

      def update
        ingredient = Ingredient.find(params[:id])
        authorize_supplier(ingredient.supplier)
        if ingredient.update(ingredient_params)
          ingredient_with_supplier = Ingredient.ingredient_with_supplier(ingredient)
          render json: { ingredient: ingredient_with_supplier }, status: :ok
        else
          render json: { errors: format_errors(ingredient) }, status: :unprocessable_entity
        end
      end

      # 仕入れ先の作成者のみ、その仕入れ先と紐づいている原材料を削除ができる様にする
      def destroy
        ingredient = Ingredient.find(params[:id])
        authorize_supplier(ingredient.supplier)

        ingredient.destroy
        head :no_content
      end

      private

      def authorize_supplier(supplier)
        return if current_user.suppliers.include?(supplier)

        render json: { errors: 'あなたが作成した仕入れ先ではありません' }, status: :not_found
        nil
      end

      def ingredient_params
        params.require(:ingredient).permit(:name, :buy_cost, :buy_quantity, :unit, :supplier_id)
      end
    end
  end
end
