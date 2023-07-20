# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Supplier do
  describe 'associations' do
    it { is_expected.to belong_to(:user) }
    it { is_expected.to have_many(:ingredients).dependent(:destroy) }
  end

  describe 'validations' do
    context '仕入れ先名は空欄禁止かつ50文字以下である' do
      it { is_expected.to validate_presence_of(:name) }
      it { is_expected.to validate_length_of(:name).is_at_most(50) }
    end
    context '仕入れ先名はユーザーごとに一意である 大文字小文字は区別しない' do
      subject { build(:supplier, name: '一意な仕入れ先名') }
      it { is_expected.to validate_uniqueness_of(:name).scoped_to(:user_id).case_insensitive }
    end
    context '連絡先は100文字以下である' do
      it { is_expected.to validate_length_of(:contact_info).is_at_most(100) }
    end
  end
end
