# frozen_string_literal: true

require 'rails_helper'

RSpec.describe RecipeProcedure do
  describe 'associations' do
    it { is_expected.to belong_to(:recipe) }
  end
end
