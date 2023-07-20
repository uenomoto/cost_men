# frozen_string_literal: true

require 'rails_helper'

RSpec.describe SellingPrice do
  describe 'associations' do
    it { is_expected.to belong_to(:recipe) }
  end

  describe 'validations' do
    context 'when 販売価格は空欄禁止かつ整数で0以上である' do
      it { is_expected.to validate_presence_of(:price) }
      it { is_expected.to validate_numericality_of(:price).only_integer.is_greater_than_or_equal_to(0) }
    end

    context 'when 販売価格変更日は空欄禁止である' do
      it { is_expected.to validate_presence_of(:changed_date) }
    end
  end
end
