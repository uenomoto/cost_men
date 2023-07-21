# frozen_string_literal: true

require 'rails_helper'

RSpec.describe User do
  describe 'associations' do
    it { is_expected.to have_many(:recipes).dependent(:destroy) }
    it { is_expected.to have_many(:suppliers).dependent(:destroy) }
    it { is_expected.to have_many(:auth_tokens).dependent(:destroy) }
    it { is_expected.to have_many(:tags).dependent(:destroy) }
  end

  describe 'validations' do
    context 'when subが空欄禁止であり一意であること' do
      # FactoryBotにUserのsubを一意にするためのsequenceを定義すること
      subject { build(:user, sub: '一意なsub') } # 保存するテストではないためbuild使用

      it { is_expected.to validate_presence_of(:sub) }
      it { is_expected.to validate_uniqueness_of(:sub) }
    end
  end
end
