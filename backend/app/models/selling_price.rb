# frozen_string_literal: true

class SellingPrice < ApplicationRecord
  belongs_to :recipe

  validates :price, presence: true, numericality: { only_integer: true, greater_than_or_equal_to: 0 }
  validates :changed_date, presence: true
end
