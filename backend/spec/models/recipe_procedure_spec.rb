# frozen_string_literal: true

require 'rails_helper'

RSpec.describe RecipeProcedure do
  describe 'associations' do
    it { is_expected.to belong_to(:recipe) }
  end

  describe 'validations' do
    context 'レシピの手順は空欄禁止で200文字以内である' do
      it { is_expected.to validate_presence_of(:procedure) }
      it { is_expected.to validate_length_of(:procedure).is_at_most(200)}
    end
  end
end
