# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'Api::V1::Suppliers', type: :request do
  let(:user) { FactoryBot.create(:user) }
  let(:supplier) { create(:supplier) }

  before do
    allow_any_instance_of(SecuredController).to receive(:current_user).and_return(user)
    allow(AuthorizationService).to receive(:new).and_return(double(current_user: user))
  end

  describe 'GET /index', type: :request do
    it 'returns http success' do
      get '/api/v1/suppliers'
      expect(response).to have_http_status(:success)
    end
  end

  describe 'GET /show', type: :request do

    it 'returns http success' do
      get "/api/v1/suppliers/#{supplier.id}"
      expect(response).to have_http_status(:success)
    end
  end

  describe 'POST /create', type: :request do
    let(:supplier_params) { { supplier: { name: 'テスト仕入れ先名', contact_info: '01234567910' } } }

    it 'returns http success' do
      post '/api/v1/suppliers', params: supplier_params
      expect(response).to have_http_status(:success)
    end

    it 'ちゃんと新しく仕入れ先の情報が作成できているか' do
      expect { post '/api/v1/suppliers', params: supplier_params }.to change(Supplier, :count).by(1)
    end

    it '正しい名前で仕入れ先を作成できているか' do
      post '/api/v1/suppliers', params: supplier_params
      created_supplier = Supplier.order(:created_at).last
      expect(created_supplier.name).to eq(supplier_params[:supplier][:name])
    end

    it '正しい連絡先で仕入れ先を作成できているか' do
      post '/api/v1/suppliers', params: supplier_params
      created_supplier = Supplier.order(:created_at).last
      expect(created_supplier.contact_info).to eq(supplier_params[:supplier][:contact_info])
    end
  end

  describe 'PATCH /update', type: :request do
    let(:update_params) { { supplier: { name: 'テスト仕入れ先編集', contact_info: '012345678910' } } }

    it 'returns http success' do
      patch "/api/v1/suppliers/#{supplier.id}", params: update_params
      expect(response).to have_http_status(:success)
    end

    it 'ちゃんと仕入れ先の情報が更新できているか' do
      patch "/api/v1/suppliers/#{supplier.id}", params: update_params
      supplier.reload
      expect(supplier.name).to eq(update_params[:supplier][:name])
      expect(supplier.contact_info).to eq(update_params[:supplier][:contact_info])
    end
  end
end
