# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'Api::V1::Ingredients' do
  describe 'GET /index' do
    it 'returns http success' do
      get '/api/v1/ingredients/index'
      expect(response).to have_http_status(:success)
    end
  end

  describe 'GET /show' do
    it 'returns http success' do
      get '/api/v1/ingredients/show'
      expect(response).to have_http_status(:success)
    end
  end

  describe 'GET /create' do
    it 'returns http success' do
      get '/api/v1/ingredients/create'
      expect(response).to have_http_status(:success)
    end
  end

  describe 'GET /update' do
    it 'returns http success' do
      get '/api/v1/ingredients/update'
      expect(response).to have_http_status(:success)
    end
  end

  describe 'GET /destroy' do
    it 'returns http success' do
      get '/api/v1/ingredients/destroy'
      expect(response).to have_http_status(:success)
    end
  end
end
