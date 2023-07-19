# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'Api::V1::SellingPrices' do
  let(:recipe) { create(:recipe) }
  let(:selling_price) { create(:selling_price, recipe: recipe) }

  describe 'POST /create' do
    it 'returns http success' do
      post "/api/v1/recipes/#{recipe.id}/selling_prices"
      expect(response).to have_http_status(:success)
    end
  end

  describe 'PATCH /update' do
    it 'returns http success' do
      patch "/api/v1/recipes/#{recipe.id}/selling_prices/#{selling_price.id}"
      expect(response).to have_http_status(:success)
    end
  end
end
