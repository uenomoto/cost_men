# frozen_string_literal: true

class RecipeProcedure < ApplicationRecord
  belongs_to :recipe

  validates :procedure, presence: true, length: { maximum: 200 }
end
