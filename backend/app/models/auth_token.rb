# frozen_string_literal: true

class AuthToken < ApplicationRecord
  belongs_to :user, primary_key: :sub
end
