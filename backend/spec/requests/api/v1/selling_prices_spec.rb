# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'Api::V1::SellingPrices' do
  let(:user) { create(:user) }
  let(:recipe) { create(:recipe, user:) }
  let!(:selling_price) { create(:selling_price, recipe:) }

  before do
    allow_any_instance_of(SecuredController).to receive(:current_user).and_return(user)
    allow(AuthorizationService).to receive(:new).and_return(double(current_user: user))
  end

  describe 'GET /show' do
    it 'returns http success' do
      get "/api/v1/recipes/#{recipe.id}/selling_prices"
      expect(response).to have_http_status(:success)
    end

    it '値段が取得できること' do
      get "/api/v1/recipes/#{recipe.id}/selling_prices"
      expect(response.parsed_body['selling_price']['price']).to eq(selling_price.price)
    end
  end

  describe 'POST /create' do
    let(:selling_price_params) { { selling_price: { price: 1000 } } }

    it 'returns http success' do
      post "/api/v1/recipes/#{recipe.id}/selling_prices", params: selling_price_params
      expect(response).to have_http_status(:success)
    end

    it '値段が登録されること' do
      post "/api/v1/recipes/#{recipe.id}/selling_prices", params: selling_price_params
      new_selling_price = SellingPrice.last
      expect(new_selling_price.price).to eq(1000)
    end
  end

  describe 'PATCH /update' do
    let(:selling_price_params) { { selling_price: { price: 1200 } } }

    it 'returns http success' do
      patch "/api/v1/recipes/#{recipe.id}/selling_prices", params: selling_price_params
      expect(response).to have_http_status(:success)
    end

    it '値段が更新されること' do
      patch "/api/v1/recipes/#{recipe.id}/selling_prices", params: selling_price_params
      expect(selling_price.reload.price).to eq(1200)
    end
  end
end
