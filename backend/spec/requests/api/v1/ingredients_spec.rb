# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'Api::V1::Ingredients' do
  let(:user) { create(:user) }
  let(:supplier) { create(:supplier, user:) }
  let(:ingredient) { create(:ingredient, supplier:) }

  # userがログインしている状態を偽装して作る,認証テストではないため注意
  before do
    allow_any_instance_of(SecuredController).to receive(:current_user).and_return(user)
    allow(AuthorizationService).to receive(:new).and_return(double(current_user: user))
  end

  describe 'POST /create' do
    let(:ingredient_params) do
      {
        ingredient: {
          name: 'test',
          buy_cost: 100,
          buy_quantity: 100,
          unit: 'g',
          supplier_id: supplier.id
        }
      }
    end

    it 'アクセスができ、正しいjsonで作成できているか' do
      post '/api/v1/ingredients', params: ingredient_params
      expect(response).to have_http_status(:success)
    end
  end

  describe 'PATCH /update' do
    let(:ingredient_params) do
      {
        ingredient: {
          name: 'test_edit',
          buy_cost: 1000,
          buy_quantity: 500,
          unit: 'cc',
          supplier_id: supplier.id
        }
      }
    end

    it 'アクセスができ、正しく名前が編集できているか' do
      patch "/api/v1/ingredients/#{ingredient.id}", params: ingredient_params
      expect(response).to have_http_status(:success)
      ingredient.reload
      expect(ingredient.name).to eq 'test_edit'
    end
  end

  describe 'DELETE /destroy' do
    it 'returns http success' do
      delete "/api/v1/ingredients/#{ingredient.id}"
      expect(response).to have_http_status(:success)
    end

    it '原材料レコードがしっかり削除されているか' do
      delete "/api/v1/ingredients/#{ingredient.id}"
      expect { ingredient.reload }.to raise_error ActiveRecord::RecordNotFound
    end
  end
end
