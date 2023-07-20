# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Ingredient do
  describe 'associations' do
    it { is_expected.to belong_to(:supplier) }
    it { is_expected.to have_many(:recipe_ingredients).dependent(:destroy) }
    it { is_expected.to have_many(:recipes).through(:recipe_ingredients) }
  end
end
