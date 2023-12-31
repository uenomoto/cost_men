# frozen_string_literal: true

module Api
  module V1
    class SuppliersController < SecuredController
      before_action :authorize_request

      # ページネーション込みの一覧
      def index
        page = params[:page] || 1
        per_page = 1

        suppliers = Supplier.with_ingredients_for_user(current_user, page, per_page)
        render json: { suppliers: suppliers[:suppliers],
                       meta: {
                         total_pages: suppliers[:total_pages]
                       } }, status: :ok
      end

      # ページネーションなしの仕入れ先一覧
      def index_all
        suppliers = Supplier.with_all_ingredients_for_user(current_user)
        render json: { suppliers: }, status: :ok
      end

      # セレクトボックスで使うためのindexのapi
      def select_index
        suppliers = current_user.suppliers.select(:id, :name).oldest
        render json: { suppliers: }, status: :ok
      end

      def create
        # 仕入れ先とuserが紐付いていれば↓この記述でuser_idが自動的に現在のuserのsubになる。
        supplier = current_user.suppliers.build(supplier_params)
        if supplier.save
          render json: { supplier: }, status: :created
        else
          render json: { errors: format_errors(supplier) }, status: :unprocessable_entity
        end
      end

      def update
        supplier = current_user.suppliers.find(params[:id])
        if supplier.update(supplier_params)
          supplier_with_ingredient = Supplier.with_ingredient_for_user(supplier)
          render json: { supplier: supplier_with_ingredient }, status: :ok
        else
          render json: { errors: format_errors(supplier) }, status: :unprocessable_entity
        end
      end

      private

      def supplier_params
        params.require(:supplier).permit(:name, :contact_info)
      end
    end
  end
end
