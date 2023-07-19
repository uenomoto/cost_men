# frozen_string_literal: true

require 'faker'

FactoryBot.define do
  factory :recipe_procedure do
    recipe
    procedure { Faker::Lorem.paragraph }
  end
end
