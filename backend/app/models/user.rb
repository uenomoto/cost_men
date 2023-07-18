# frozen_string_literal: true

class User < ApplicationRecord
  has_many :recipes, primary_key: :sub, dependent: :destroy
  has_many :suppliers, primary_key: :sub, dependent: :destroy
  has_many :auth_tokens, primary_key: :sub, dependent: :destroy
end
