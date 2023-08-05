# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'Api::V1::Recipes' do
  let(:user) { create(:user) }
  let(:recipe) { create(:recipe, user:) }

  before do
    allow_any_instance_of(SecuredController).to receive(:current_user).and_return(user)
    allow(AuthorizationService).to receive(:new).and_return(double(current_user: user))
  end

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
    # 同じリクエストボディをかく(JSON形式)
    let(:tag1) { create(:tag, user:) }
    let(:ingredient1) { create(:ingredient) }
    let(:recipe_params) do
      {
        recipe: {
          recipe_name: 'テストレシピ名',
          recipe_image_url: 'https://cost-men-bucket.s3.ap-northeast-1.amazonaws.com/0-net.jpg',
          checked_tags: { tag1.id => true },
          recipe_ingredients: [
            { id: ingredient1.id, quantity: '1000' }
          ]
        }
      }
    end

    it 'returns http success' do
      post '/api/v1/recipes', params: recipe_params
      expect(response).to have_http_status(:success)
    end
  end

  describe 'PATCH /update' do
    # 同じリクエストボディをかく(JSON形式)
    let(:tag1) { create(:tag, user:) }
    let(:ingredient1) { create(:ingredient) }
    let(:recipe_params) do
      {
        recipe: {
          recipe_name: 'テストレシピ名編集',
          recipe_image_url: 'https://exampleedit.com',
          checked_tags: { tag1.id => false },
          recipe_ingredients: [
            { id: ingredient1.id, quantity: 500 }
          ]
        }
      }
    end

    it 'returns http success' do
      patch "/api/v1/recipes/#{recipe.id}", params: recipe_params
      expect(response).to have_http_status(:success)
    end

    it 'レシピ名が更新されていること' do
      patch "/api/v1/recipes/#{recipe.id}", params: recipe_params
      expect(recipe.reload.name).to eq 'テストレシピ名編集'
    end
  end

  describe 'DELETE /destroy' do
    it 'returns http success' do
      delete "/api/v1/recipes/#{recipe.id}"
      expect(response).to have_http_status(:success)
    end

    it 'レシピが削除されていること' do
      delete "/api/v1/recipes/#{recipe.id}"
      expect { recipe.reload }.to raise_error ActiveRecord::RecordNotFound
    end
  end
end
