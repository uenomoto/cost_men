# frozen_string_literal: true

FactoryBot.define do
  factory :auth_token do
    user
    sequence(:token) { Faker::Internet.unique.uuid } # ランダムで一意なUUIDをtokenとして生成する
  end
end
