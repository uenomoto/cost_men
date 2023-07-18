# frozen_string_literal: true

class RecipeTag < ApplicationRecord
  belongs_to :recipe
  belongs_to :tag
end
