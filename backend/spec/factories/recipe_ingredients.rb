# frozen_string_literal: true

require 'faker'

FactoryBot.define do
  factory :recipe_ingredient do
    recipe
    ingredient
    quantity { Faker::Number.decimal(l_digits: 4, r_digits: 2) }
  end
end
