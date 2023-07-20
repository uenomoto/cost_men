# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'Api::V1::RecipeTags' do
  let(:recipe) { create(:recipe) }
  let(:tag) { create(:tag) }
  let(:recipe_tag) { create(:recipe_tag, recipe:, tag:) }

  describe 'POST /create' do
    it 'returns http success' do
      post "/api/v1/recipes/#{recipe.id}/tags"
      expect(response).to have_http_status(:success)
    end
  end

  describe 'GET /index' do
    it 'returns http success' do
      get "/api/v1/recipes/#{recipe.id}/tags"
      expect(response).to have_http_status(:success)
    end
  end

  describe 'DELETE /destroy' do
    it 'returns http success' do
      delete "/api/v1/recipes/#{recipe.id}/tags/#{tag.id}"
      expect(response).to have_http_status(:success)
    end
  end
end
