# frozen_string_literal: true

module Api
  module V1
    class IngredientsController < SecuredController
      before_action :set_ingredient, only: %i[update destroy]
      before_action :authorize_request

      def index
        # ingredientsは仕入れ先と紐づいているので、仕入れ先のuser_idと現在のuserのsubが一致するもののみ取得する。
        @ingredients = Ingredient.joins(:supplier).where(suppliers: { user_id: current_user.sub }).leatest
        render json: { ingredients: @ingredients.map(&:as_json) }, status: :ok
      end

      # 一覧で全ての情報が見れるため、showは不要かもしれません。。。
      def show; end

      def create
        # /api/v1/ingredientsなのでリクエストボディからsupplier_idを取得する必要がある。
        supplier_id = params[:ingredient][:supplier_id]
        @ingredient = current_user.suppliers.find(supplier_id).ingredients.build(ingredient_params)
        if @ingredient.save
          render_ingredeint(status: :created)
        else
          render_ingredeint_errors
        end
      end

      def update
        set_ingredient
        authorize_supplier(@ingredient.supplier)
        if @ingredient.update(ingredient_params)
          render_ingredeint
        else
          render_ingredeint_errors
        end
      end

      # 仕入れ先の作成者のみ、その仕入れ先と紐づいている原材料を削除ができる様にする
      def destroy
        set_ingredient
        authorize_supplier(@ingredient.supplier)

        @ingredient.destroy
        head :no_content
      end

      private

      def set_ingredient
        @ingredient = Ingredient.find(params[:id])
      end

      def render_ingredeint(status: :ok)
        render json: { ingredient: @ingredient.as_json }, status:
      end

      def render_ingredeint_errors
        render json: { errors: @ingredient.errors.full_messages }, status: :unprocessable_entity
      end

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
