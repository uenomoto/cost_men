# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Supplier do
  describe 'associations' do
    it { is_expected.to belong_to(:user) }
    it { is_expected.to have_many(:ingredients).dependent(:destroy) }
  end
end
