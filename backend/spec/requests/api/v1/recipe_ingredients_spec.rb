# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'Api::V1::RecipeIngredients' do
  let(:user) { create(:user) }
  let(:recipe) { create(:recipe) }
  let(:ingredient) { create(:ingredient) }
  let(:recipe_ingredient) { create(:recipe_ingredient, recipe:, ingredient:) }

  before do
    allow_any_instance_of(SecuredController).to receive(:current_user).and_return(user)
    allow(AuthorizationService).to receive(:new).and_return(double(current_user: user))
  end

  describe 'GET /index' do
    it 'returns http success' do
      get "/api/v1/recipes/#{recipe.id}/ingredients"
      expect(response).to have_http_status(:success)
    end
  end

  describe 'POST /create' do
    it 'returns http success' do
      post "/api/v1/recipes/#{recipe.id}/ingredients"
      expect(response).to have_http_status(:success)
    end
  end

  describe 'PATCH /update' do
    it 'returns http success' do
      patch "/api/v1/recipes/#{recipe.id}/ingredients/#{recipe_ingredient.id}"
      expect(response).to have_http_status(:success)
    end
  end
end
