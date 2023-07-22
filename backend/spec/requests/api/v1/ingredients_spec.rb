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

  describe 'GET /index' do
    # let!は即時実行されるletは呼ばれたときに実行される
    let!(:ingredient) do
      create(:ingredient, supplier:, name: 'サンプル材料', buy_cost: 100, buy_quantity: 100, unit: 'g')
    end
    let(:json_response) do
      get '/api/v1/ingredients'
      JSON.parse(response.body, symbolize_names: true)[:ingredients].map do |ingredient|
        ingredient.tap { |ing| ing.delete(:created_at, :updated_at) }
      end
    end
    let(:expected_response) do
      {
        ingredients: [
          {
            id: ingredient.id,
            supplier_id: ingredient.supplier_id,
            buy_cost: ingredient.buy_cost.to_s,
            buy_quantity: ingredient.buy_quantity.to_s,
            unit: ingredient.unit,
            name: ingredient.name
          }
        ]
      }
    end

    it 'returns http success' do
      expect(response).to have_http_status(:success)
    end

    it 'テスト環境のみjsonのcreated_at,updated_atが含まれていないか' do
      json_response[:ingredients].each do |ingredient|
        expect(ingredient).not_to have_key(:created_at)
        expect(ingredient).not_to have_key(:updated_at)
      end
    end

    it '仕入れ先に紐づいている原材料のjsonが取得できているか' do
      expect(json_response).to eq expected_response
    end
  end

  describe 'GET /show' do
    it 'returns http success' do
      get "/api/v1/ingredients/#{ingredient.id}"
      expect(response).to have_http_status(:success)
    end
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
