# frozen_string_literal: true

class Supplier < ApplicationRecord
  belongs_to :user, primary_key: :sub
  has_many :ingredients, dependent: :destroy
end
