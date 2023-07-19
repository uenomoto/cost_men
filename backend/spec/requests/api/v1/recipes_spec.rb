# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'Api::V1::Recipes' do
  let(:recipe) { create(:recipe) }

  describe 'GET /index' do
    it 'returns http success' do
      get '/api/v1/recipes'
      expect(response).to have_http_status(:success)
    end
  end

  describe 'GET /show' do
    it 'returns http success' do
      get "/api/v1/recipes/#{recipe.id}"
      expect(response).to have_http_status(:success)
    end
  end

  describe 'POST /create' do
    it 'returns http success' do
      post '/api/v1/recipes'
      expect(response).to have_http_status(:success)
    end
  end

  describe 'PATCH /update' do
    it 'returns http success' do
      patch "/api/v1/recipes/#{recipe.id}"
      expect(response).to have_http_status(:success)
    end
  end

  describe 'DELETE /destroy' do
    it 'returns http success' do
      delete "/api/v1/recipes/#{recipe.id}"
      expect(response).to have_http_status(:success)
    end
  end
end
