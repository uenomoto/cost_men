# frozen_string_literal: true

FactoryBot.define do
  factory :supplier do
    association :user # Userモデルとのアソシエーション
    sequence(:name) { |n| "テスト仕入れ先#{n}" } # 仕入れ先名は一意なので連番で生成
    contact_info { '012345678910' }
  end
end
