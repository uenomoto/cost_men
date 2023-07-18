# frozen_string_literal: true

class User < ApplicationRecord
  self.primary_key = 'sub'
  has_many :recipes, dependent: :destroy
  has_many :suppliers, dependent: :destroy
  has_many :auth_tokens, dependent: :destroy
end
