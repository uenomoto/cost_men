# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'Api::V1::Tags' do
  let(:user) { create(:user) }
  let(:tag) { create(:tag) }

  before do
    allow_any_instance_of(SecuredController).to receive(:current_user).and_return(user)
    allow(AuthorizationService).to receive(:new).and_return(double(current_user: user))
  end

  describe 'GET /index' do
    it 'returns http success' do
      get '/api/v1/tags'
      expect(response).to have_http_status(:success)
    end
  end

  describe 'POST /create' do
    let(:tag_params) { { tag: { name: 'test' } } }

    it 'returns http success' do
      post '/api/v1/tags', params: tag_params
      expect(response).to have_http_status(:success)
    end
  end

  describe 'PATCH /update' do
    let(:tag_params) { { tag: { name: 'test' } } }
    
    it 'returns http success' do
      patch "/api/v1/tags/#{tag.id}", params: tag_params
      expect(response).to have_http_status(:success)
    end
  end

  describe 'DELETE /destroy' do
    it 'returns http success' do
      delete "/api/v1/tags/#{tag.id}"
      expect(response).to have_http_status(:success)
    end
  end
end
