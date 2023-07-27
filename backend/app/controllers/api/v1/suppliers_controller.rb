# frozen_string_literal: true

module Api
  module V1
    class SuppliersController < SecuredController
      before_action :authorize_request

      def index
        suppliers = Supplier.with_ingredients_for_user(current_user)
        render json: { suppliers: }, status: :ok
      end

      # セレクトボックスで使うためのindexのapi
      def select_index
        suppliers = current_user.suppliers.select(:id, :name)
        render json: { suppliers: }, status: :ok
      end

      def show
        if set_supplier
          render_supplier
        else
          render_not_found_response
        end
      end

      def create
        # 仕入れ先とuserが紐付いていれば↓この記述でuser_idが自動的に現在のuserのsubになる。
        @supplier = current_user.suppliers.build(supplier_params)

        if @supplier.save
          render_supplier(status: :created)
        else
          render_supplier_errors
        end
      end

      def update
        set_supplier
        if @supplier.update(supplier_params)
          render_supplier
        else
          render_supplier_errors
        end
      end

      private

      def set_supplier
        @supplier = current_user.suppliers.find(params[:id])
      end

      def render_supplier(status: :ok)
        render json: { supplier: @supplier.as_json }, status:
      end

      def render_not_found_response
        render json: { error: '特定の仕入れ先のデータはありません' }, status: :not_found
      end

      def render_supplier_errors
        render json: { errors: @supplier.errors.full_messages }, status: :unprocessable_entity
      end

      def supplier_params
        params.require(:supplier).permit(:name, :contact_info)
      end
    end
  end
end
