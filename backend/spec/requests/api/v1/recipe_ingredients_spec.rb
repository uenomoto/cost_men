# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'Api::V1::RecipeIngredients' do
  describe 'GET /create' do
    it 'returns http success' do
      get '/api/v1/recipe_ingredients/create'
      expect(response).to have_http_status(:success)
    end
  end

  describe 'GET /update' do
    it 'returns http success' do
      get '/api/v1/recipe_ingredients/update'
      expect(response).to have_http_status(:success)
    end
  end
end
