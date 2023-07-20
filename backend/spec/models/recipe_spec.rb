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
end
