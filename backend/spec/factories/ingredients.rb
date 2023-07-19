# frozen_string_literal: true

FactoryBot.define do
  factory :ingredient do
    supplier
    buy_cost { 1000.00 }
    buy_quantity { 100.12 }
    unit { "g" }
    name { "玉ねぎ" }
  end
end
