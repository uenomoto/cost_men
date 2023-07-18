# frozen_string_literal: true

class Supplier < ApplicationRecord
  belongs_to :user
  has_many :ingredients, dependent: :destroy
end
