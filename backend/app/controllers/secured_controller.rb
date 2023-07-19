# frozen_string_literal: true

# 認証用クラス
class SecuredController < ApplicationController
  before_action :authorize_request # トークンと解析し認証ができなかった場合はエラーメッセージを返す

  private

  def authorize_request
    authorize_request = AuthorizationService.new(request.headers)
    @current_user = authorize_request.current_user
  rescue JWT::VerificationError, JWT::DecodeError => e
    render json: { errors: ['認証されていません', "エラーメッセージ: #{e.message}"] }, status: :unauthorized
  end

  attr_reader :current_user
end
