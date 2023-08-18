# frozen_string_literal: true

module Api
  module V1
    class SearchController < SecuredController
      before_action :authorize_request
      # 検索機能
      def index
        suppliers = current_user.suppliers.ransack(name_cont: params[:supplier_q]).result
        render json: { suppliers: }
      end
    end
  end
end
