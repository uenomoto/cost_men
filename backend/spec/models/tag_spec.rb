# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Tag do
  describe 'associations' do
    it { is_expected.to belong_to(:user) }
    it { is_expected.to have_many(:recipe_tags).dependent(:destroy) }
    it { is_expected.to have_many(:recipes).through(:recipe_tags) }
  end

  describe 'validations' do
    context 'when タグ名は空欄禁止かつ20文字以下である' do
      it { is_expected.to validate_presence_of(:name) }
      it { is_expected.to validate_length_of(:name).is_at_most(20) }
    end

    context 'when タグ名ユーザーごとに一意である' do
      subject { create(:tag) }

      it { is_expected.to validate_uniqueness_of(:name).scoped_to(:user_id).case_insensitive }
    end
  end
end
