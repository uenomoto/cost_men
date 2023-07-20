# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Ingredient do
  describe 'associations' do
    it { is_expected.to belong_to(:supplier) }
    it { is_expected.to have_many(:recipe_ingredients).dependent(:destroy) }
    it { is_expected.to have_many(:recipes).through(:recipe_ingredients) }
  end

  describe 'validations' do
    context '原材料名は空欄禁止' do
      it { is_expected.to validate_presence_of(:name) }
    end
    context '単位は空欄禁止' do
      it { is_expected.to validate_presence_of(:unit) }
    end
    context '購入時の値段は空欄禁止で数値で0以上である' do
      it { is_expected.to validate_presence_of(:buy_cost) }
      it { is_expected.to validate_numericality_of(:buy_cost).is_greater_than_or_equal_to(0) }
    end
    context '購入時の量は空欄禁止で数値で0以上である' do
      it { is_expected.to validate_presence_of(:buy_quantity) }
      it { is_expected.to validate_numericality_of(:buy_quantity).is_greater_than_or_equal_to(0) }
    end
  end
end
