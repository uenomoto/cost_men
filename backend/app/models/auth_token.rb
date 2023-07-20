# frozen_string_literal: true

class AuthToken < ApplicationRecord
  belongs_to :user

  validates :token, presence: true, uniqueness: true
end
