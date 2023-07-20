# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Recipe do
  describe 'associations' do
    it { is_expected.to belong_to(:user) }
    it { is_expected.to have_many(:recipe_ingredients).dependent(:destroy) }
    it { is_expected.to have_many(:ingredients).through(:recipe_ingredients).dependent(:destroy) }
    it { is_expected.to have_many(:recipe_procedures).dependent(:destroy) }
    it { is_expected.to have_many(:recipe_tags).dependent(:destroy) }
    it { is_expected.to have_many(:tags).through(:recipe_tags).dependent(:destroy) }
    it { is_expected.to have_many(:selling_prices).dependent(:destroy) }
  end

  describe 'validations' do
    context 'レシピ名は空欄禁止でログイン中のuserに対して一意である。ただし大文字小文字は区別しない' do
      subject { build(:recipe, name: '一意なレシピ名') }
      it { is_expected.to validate_presence_of(:name) }
      it { is_expected.to validate_uniqueness_of(:name).scoped_to(:user_id).case_insensitive }
    end
    context 'レシピの原材料の合計金額は空欄禁止で0以上である' do
      it { is_expected.to validate_presence_of(:total_cost) }
      it { is_expected.to validate_numericality_of(:total_cost).is_greater_than_or_equal_to(0) }
    end
  end
end
