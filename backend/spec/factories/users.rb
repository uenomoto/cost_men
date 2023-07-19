# frozen_string_literal: true

FactoryBot.define do
  factory :user do
    sequence(:sub) { |n| "user_#{n}" }  # IDが一意であることを保証
  end
end
