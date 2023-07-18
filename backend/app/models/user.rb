# frozen_string_literal: true

class User < ApplicationRecord
  has_many :recipes, foreign_key: :user_id, primary_key: :sub, dependent: :destroy
  has_many :suppliers, foreign_key: :user_id, primary_key: :sub, dependent: :destroy
  has_many :auth_tokens, foreign_key: :user_id, primary_key: :sub, dependent: :destroy
end
