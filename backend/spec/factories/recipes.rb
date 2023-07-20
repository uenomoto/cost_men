# frozen_string_literal: true

require 'faker'

FactoryBot.define do
  factory :recipe do
    user
    name { Faker::Food.dish }
    total_cost { Faker::Number.decimal(l_digits: 4, r_digits: 2) }
  end
end
