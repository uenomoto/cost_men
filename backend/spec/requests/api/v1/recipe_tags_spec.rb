# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'Api::V1::RecipeTags' do
  let(:user) { create(:user) }
  let(:recipe_tag) { create(:recipe_tag, recipe:, tag:) }
  let(:main_tag) { create(:tag, user:) }
  let(:sub_tag) { create(:tag, user:) }
  let!(:recipe) { create(:recipe) }
  let!(:tag) { create(:tag, user:) }

  before do
    allow_any_instance_of(SecuredController).to receive(:current_user).and_return(user)
    allow(AuthorizationService).to receive(:new).and_return(double(current_user: user))
    recipe.recipe_tags.create(tag:)
  end

  describe 'GET /index' do
    it 'returns http success' do
      get "/api/v1/recipes/#{recipe.id}/tags"
      expect(response).to have_http_status(:success)
    end
  end

  describe 'POST /create' do
    let(:recipe_tag_params) do
      {
        recipe_id: 1,
        checked_tags: { main_tag.id => true, sub_tag.id => false }
      }
    end

    it 'returns http success' do
      post "/api/v1/recipes/#{recipe.id}/tags", params: recipe_tag_params
      expect(response).to have_http_status(:success)
    end
  end

  describe 'DELETE /destroy' do
    it 'returns http success' do
      delete "/api/v1/recipes/#{recipe.id}/tags/#{tag.id}"
      expect(response).to have_http_status(:success)
    end

    it 'レシピからタグが削除される' do
      expect do
        delete "/api/v1/recipes/#{recipe.id}/tags/#{tag.id}"
      end.to change(RecipeTag, :count).by(-1)
    end
  end
end
