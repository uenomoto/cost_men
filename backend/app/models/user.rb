# frozen_string_literal: true

class User < ApplicationRecord
  self.primary_key = 'sub'
  has_many :recipes, dependent: :destroy
  has_many :suppliers, dependent: :destroy
  has_many :auth_tokens, dependent: :destroy

  # これでuser_idがsubになる
  def self.from_token_payload(payload)
    find_by(sub: payload['sub']) || create!(sub: payload['sub'])
  end
end
