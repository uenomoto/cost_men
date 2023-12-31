# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'Api::V1::Suppliers' do
  let(:user) { create(:user) }
  let(:supplier) { create(:supplier, user:) }

  before do
    allow_any_instance_of(SecuredController).to receive(:current_user).and_return(user)
    allow(AuthorizationService).to receive(:new).and_return(double(current_user: user))
  end

  describe 'GET /index_all' do
    let!(:first_supplier) { create(:supplier, user:) }
    let!(:second_supplier) { create(:supplier, user:) }
    let!(:ingredient_for_first_supplier) { create(:ingredient, supplier: first_supplier) }
    let!(:ingredient_for_second_supplier) { create(:ingredient, supplier: second_supplier) }
    let(:json) { response.parsed_body }

    describe 'しっかりと仕入れ先とその仕入れ先と紐づいている原材料が取得できるか' do
      before do
        get '/api/v1/suppliers/index_all'
      end

      it '2つの仕入れ先の情報が取得できているか' do
        expect(json['suppliers'].length).to eq(2)
      end

      it '1番目の仕入れ先から紐付いている原材料が正しく取得できるか' do
        expect(json['suppliers'][0]['ingredients'].length).to eq(1)
      end

      it '2番目の仕入れ先から紐付いている原材料が正しく取得できるか' do
        expect(json['suppliers'][1]['ingredients'].length).to eq(1)
      end
    end

    it 'returns http success' do
      get '/api/v1/suppliers'
      expect(response).to have_http_status(:success)
    end
  end

  describe 'POST /create' do
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

  describe 'PATCH /update' do
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
