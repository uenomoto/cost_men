# frozen_string_literal: true

class AuthToken < ApplicationRecord
  belongs_to :user, foreign_key: :user_id, primary_key: :sub
end
