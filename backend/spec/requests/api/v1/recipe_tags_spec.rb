# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'Api::V1::RecipeTags' do
  describe 'GET /create' do
    it 'returns http success' do
      get '/api/v1/recipe_tags/create'
      expect(response).to have_http_status(:success)
    end
  end

  describe 'GET /index' do
    it 'returns http success' do
      get '/api/v1/recipe_tags/index'
      expect(response).to have_http_status(:success)
    end
  end

  describe 'GET /destroy' do
    it 'returns http success' do
      get '/api/v1/recipe_tags/destroy'
      expect(response).to have_http_status(:success)
    end
  end
end
