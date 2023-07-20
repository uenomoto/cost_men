# frozen_string_literal: true

require 'rails_helper'

RSpec.describe AuthToken do
  describe 'associations' do
    it { is_expected.to belong_to(:user) }
  end

  describe 'validations' do
    context 'when tokenが空欄禁止であり一意であること' do
      subject { build(:auth_token, token: '一意なtoken') }

      it { is_expected.to validate_presence_of(:token) }
      it { is_expected.to validate_uniqueness_of(:token) }
    end
  end
end
