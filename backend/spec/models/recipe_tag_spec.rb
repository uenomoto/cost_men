# frozen_string_literal: true

require 'rails_helper'

RSpec.describe RecipeTag do
  describe 'associations' do
    it { is_expected.to belong_to(:recipe) }
    it { is_expected.to belong_to(:tag) }
  end

  describe 'validations' do
    context 'when 1つのレシピに対してタグは重複されないようにする' do
      subject { build(:recipe_tag, tag:) }

      let(:tag) { create(:tag) }

      it { is_expected.to validate_uniqueness_of(:recipe_id).scoped_to(:tag_id) }
    end
  end
end
