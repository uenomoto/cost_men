# frozen_string_literal: true

module Api
  module V1
    class SearchController < SecuredController
      before_action :authorize_request
      # 検索機能
      def index
        # 原材料と紐づいている仕入れ先を全て取得してから現在ログイン中のユーザーの仕入れ先のみに絞り込む
        ingredients_user = Ingredient.joins(:supplier).where(suppliers: { user_id: current_user.sub })
        # 検索結果を絞り込む
        ingredients = ingredients_user.ransack(name_cont: params[:ingredient_q]).result
        suppliers = current_user.suppliers.ransack(name_cont: params[:supplier_q]).result

        # 検索結果をJSON形式で返す
        render json: { ingredients:, suppliers: }
      end
    end
  end
end
