# frozen_string_literal: true

require 'rails_helper'

RSpec.describe User do
  describe 'associations' do
    it { is_expected.to have_many(:recipes).dependent(:destroy) }
    it { is_expected.to have_many(:suppliers).dependent(:destroy) }
    it { is_expected.to have_many(:auth_tokens).dependent(:destroy) }
  end
end
