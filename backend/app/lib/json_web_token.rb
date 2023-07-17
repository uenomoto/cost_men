# frozen_string_literal: true

require 'net/http'
require 'uri'

class JsonWebToken
  def self.verify(token)
    JWT.decode(token, nil,
               true, # このトークンの署名を検証する
               algorithm: 'RS256',
               iss: 'https://dev-4ntysy7176bq4imq.us.auth0.com/', # iss: Auth0のドメインで必ず語尾に/をつける
               verify_iss: true,
               aud: ENV.fetch('AUTH0_IDENTIFIER', nil), # トークンの受信者を検証する aud: APIの識別子
               verify_aud: true) do |header|
      jwks_hash[header['kid']]
    end
  end

  def self.jwks_hash
    jwks_keys = fetch_jwks_keys
    jwks_keys.to_h do |k|
      [
        k['kid'],
        OpenSSL::X509::Certificate.new(
          Base64.decode64(k['x5c'].first)
        ).public_key
      ]
    end
  end

  def self.fetch_jwks_keys
    jwks_raw = Net::HTTP.get URI('https://dev-4ntysy7176bq4imq.us.auth0.com/.well-known/jwks.json')
    Array(JSON.parse(jwks_raw)['keys'])
  end
end
