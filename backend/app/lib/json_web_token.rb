require 'net/http'
require 'uri'

class JsonWebToken
  def self.verify(token)
    JWT.decode(token, nil,
      true, # このトークンの署名を検証する
      algorithm: 'RS256',
      iss: 'https://dev-4ntysy7176bq4imq.ja.auth0.com', # トークンの発行者を検証する
      verify_iss: true,
      sud: Rails.application.secrets.auth0_api_audience,
      verify_aud: true) do |header|
        jwt_hash[header['kid']]
      end
  end

  def self.jwt_hash
    jwks_raw = Net::HTTP.get URI("https://dev-4ntysy7176bq4imq.ja.auth0.com/.well-known/jwks.json")
    jwks_keys = Array(JSON.parse(jwts_raw)['keys'])
    Hash[
      jwks_keys
      .map do |k|
        [
          k['kid'],
          OpenSSL::X509::Certificate.new(
            Base64.decode64(k['x5c'].first)
          ).public_key
        ]
      end
    ]
  end
end
