# frozen_string_literal: true

require 'rails_helper'

RSpec.describe RecipeIngredient do
  describe 'associations' do
    it { is_expected.to belong_to(:recipe) }
    it { is_expected.to belong_to(:ingredient) }
  end

  describe 'validations' do
    context 'when レシピで使う原材料の数量は空欄禁止で数値で0以上である' do
      it { is_expected.to validate_presence_of(:quantity) }
      it { is_expected.to validate_numericality_of(:quantity).is_greater_than_or_equal_to(0) }
    end

    context 'when レシピに対して原材料は重複されないようにする' do
      subject { build(:recipe_ingredient, ingredient:) }
      let(:ingredient) { create(:ingredient) } # ingredient_idを作成するために先にingredientを作成する

      it { is_expected.to validate_uniqueness_of(:recipe_id).scoped_to(:ingredient_id) }
    end
  end
end
