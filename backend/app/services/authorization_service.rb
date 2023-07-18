# frozen_string_literal: true

class AuthorizationService
  def initialize(headers = {})
    @headers = headers
  end

  # トークンを検証し、ユーザーを返す
  def current_user
    @auth_payload, @auth_header = verify_token
    @user = User.from_token_payload(@auth_payload)
  end

  private

  # Authorizationヘッダーからトークンを取り出す
  def http_token
    @headers['Authorization'].split.last if @headers['Authorization'].present?
  end

  # トークンを検証する
  def verify_token
    JsonWebToken.verify(http_token)
  end
end
