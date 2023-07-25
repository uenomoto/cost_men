# frozen_string_literal: true

module Api
  module V1
    class SellingPricesController < SecuredController
      before_action :authorize_request

      def show
        set_current_user_recipe_selling_price
        render json: { selling_price: @selling_price }, status: :ok
      end

      def create
        recipe = current_user.recipes.find(params[:recipe_id])
        selling_price = recipe.selling_prices.build(selling_price_params)
        if selling_price.save
          render json: { selling_price: }, status: :created
        else
          render json: { errors: selling_price.errors.full_messages }, status: :unprocessable_entity
        end
      end

      def update
        set_current_user_recipe_selling_price
        if @selling_price.update(selling_price_params)
          render json: { selling_price: @selling_price }, status: :ok
        else
          render json: { errors: selling_price.errors.full_messages }, status: :unprocessable_entity
        end
      end

      private

      def set_current_user_recipe_selling_price
        recipe = current_user.recipes.find(params[:recipe_id])
        @selling_price = recipe.selling_prices.find(params[:id])
      end

      def selling_price_params
        params.require(:selling_price).permit(:price)
      end
    end
  end
end
