# frozen_string_literal: true

class RecipeProcedure < ApplicationRecord
  belongs_to :recipe

  validates :procedure, presence: true, length: { maximum: 100 }

  scope :oldest, -> { order(created_at: :asc) }

  def self.build_and_save_all(recipe, procedure_params)
    recipe_procedures = procedure_params.map do |procedure|
      recipe.recipe_procedures.build(procedure:)
    end

  ActiveRecord::Base.transaction do
    if recipe_procedures.all?(&:save!)
      [recipe_procedures, nil]
    else
      failed = recipe_procedures.find { |procedure| !procedure.valid? }
      [nil, failed.errors.full_messages]
    end
  end
rescue ActiveRecord::RecordInvalid => e
  [nil, e.record.errors.full_messages]
  end
end
