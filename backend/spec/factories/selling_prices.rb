# frozen_string_literal: true
require 'faker'

FactoryBot.define do
  factory :selling_price do
    recipe
    price { Faker::Number.number(digits: 4) }
    changed_date { Faker::Date.between(from: '2022-01-01', to: '2022-12-31') }
  end
end
