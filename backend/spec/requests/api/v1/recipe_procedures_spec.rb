# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'Api::V1::RecipeProcedures' do
  describe 'GET /index' do
    it 'returns http success' do
      get '/api/v1/recipe_procedures/index'
      expect(response).to have_http_status(:success)
    end
  end

  describe 'GET /create' do
    it 'returns http success' do
      get '/api/v1/recipe_procedures/create'
      expect(response).to have_http_status(:success)
    end
  end

  describe 'GET /update' do
    it 'returns http success' do
      get '/api/v1/recipe_procedures/update'
      expect(response).to have_http_status(:success)
    end
  end

  describe 'GET /destroy' do
    it 'returns http success' do
      get '/api/v1/recipe_procedures/destroy'
      expect(response).to have_http_status(:success)
    end
  end
end
