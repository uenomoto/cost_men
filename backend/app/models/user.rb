# frozen_string_literal: true

class User < ApplicationRecord
  self.primary_key = 'sub'
  has_many :recipes, dependent: :destroy
  has_many :suppliers, dependent: :destroy
  has_many :tags, dependent: :destroy

  validates :sub, presence: true, uniqueness: true

  # これでuser_idにAuth0のsubが格納される
  def self.from_token_payload(payload)
    find_by(sub: payload['sub']) || create!(sub: payload['sub'])
  end
end
