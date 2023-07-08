module Api
  module V1
    class HealthCheckController < ApplicationController
      def index
        render json: { message: 'ヘルパーチェックOK!!' }, status: :ok
      end
    end
  end
end
