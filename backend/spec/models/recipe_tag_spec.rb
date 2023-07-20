# frozen_string_literal: true

require 'rails_helper'

RSpec.describe RecipeTag do
  describe 'associations' do
    it { is_expected.to belong_to(:recipe) }
    it { is_expected.to belong_to(:tag) }
  end

  describe 'validations' do
    it '1つのレシピに対してタグは一意である' do
      recipe = create(:recipe)
      tag = create(:tag)
      create(:recipe_tag, recipe:, tag:)
      duplicate_recipe_tag = build(:recipe_tag, recipe:, tag:)

      expect(duplicate_recipe_tag).not_to be_valid
      expect(duplicate_recipe_tag.errors[:recipe_id]).to include('has already been taken')
    end
  end
end
