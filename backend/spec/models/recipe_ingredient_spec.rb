# frozen_string_literal: true

require 'rails_helper'

RSpec.describe RecipeIngredient do
  describe 'associations' do
    it { is_expected.to belong_to(:recipe) }
    it { is_expected.to belong_to(:ingredient) }
  end
end
