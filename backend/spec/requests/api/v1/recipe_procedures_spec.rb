# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'Api::V1::RecipeProcedures' do
  let(:user) { create(:user) }
  let(:recipe) { create(:recipe, user:) }
  # 配列で作成する
  let(:recipe_procedure) { create(:recipe_procedure, recipe:) }

  before do
    allow_any_instance_of(SecuredController).to receive(:current_user).and_return(user)
    allow(AuthorizationService).to receive(:new).and_return(double(current_user: user))
  end

  describe 'GET /index' do
    it 'returns http success' do
      get "/api/v1/recipes/#{recipe.id}/procedures"
      expect(response).to have_http_status(:success)
    end

    it 'レシピの手順が取得できること' do
      get "/api/v1/recipes/#{recipe.id}/procedures", params: recipe_procedure
      expect(response.parsed_body['recipe_procedures'][0]['procedure']).to eq(recipe_procedure.procedure)
    end
  end

  describe 'POST /create' do
    let(:recipe_procedure_params) { { recipe_procedure: { procedure: %w[手順1 手順2] } } }

    it 'returns http success' do
      post "/api/v1/recipes/#{recipe.id}/procedures", params: recipe_procedure_params
      expect(response).to have_http_status(:success)
    end

    it 'レシピの手順が登録されること' do
      post "/api/v1/recipes/#{recipe.id}/procedures", params: recipe_procedure_params
      new_recipe_procedure = RecipeProcedure.last(2)
      new_recipe_procedure_array = new_recipe_procedure.map(&:procedure)
      expect(new_recipe_procedure_array).to eq %w[手順1 手順2]
    end
  end

  describe 'PATCH /update' do
    let(:recipe_procedure_update_params) { { recipe_procedure: { procedure: '手順1編集' } } }

    it 'returns http success' do
      patch "/api/v1/recipes/#{recipe.id}/procedures/#{recipe_procedure.id}", params: recipe_procedure_update_params
      expect(response).to have_http_status(:success)
    end

    it 'レシピの手順が更新されること' do
      patch "/api/v1/recipes/#{recipe.id}/procedures/#{recipe_procedure.id}", params: recipe_procedure_update_params
      expect(recipe_procedure.reload.procedure).to eq '手順1編集'
    end
  end

  describe 'DELETE /destroy' do
    it 'returns http success' do
      delete "/api/v1/recipes/#{recipe.id}/procedures/#{recipe_procedure.id}"
      expect(response).to have_http_status(:success)
    end

    it 'レシピの手順が削除されること' do
      delete "/api/v1/recipes/#{recipe.id}/procedures/#{recipe_procedure.id}"
      expect { recipe_procedure.reload }.to raise_error ActiveRecord::RecordNotFound
    end
  end
end
