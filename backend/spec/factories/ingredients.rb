# frozen_string_literal: true

require 'faker'

FactoryBot.define do
  factory :ingredient do
    supplier
    buy_cost { Faker::Number.decimal(l_digits: 2) }
    buy_quantity { Faker::Number.decimal(l_digits: 2)}
    unit { 'g' }
    name { Faker::Food.ingredient }
  end
end
