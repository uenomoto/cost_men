# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'Api::V1::RecipeIngredients' do
  let(:recipe) { create(:recipe) }
  let(:ingredient) { create(:ingredient) }
  let(:recipe_ingredient) { create(:recipe_ingredient, recipe: recipe, ingredient: ingredient) }

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
