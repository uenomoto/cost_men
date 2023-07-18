# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'Api::V1::Tags' do
  describe 'GET /index' do
    it 'returns http success' do
      get '/api/v1/tags/index'
      expect(response).to have_http_status(:success)
    end
  end

  describe 'GET /create' do
    it 'returns http success' do
      get '/api/v1/tags/create'
      expect(response).to have_http_status(:success)
    end
  end

  describe 'GET /update' do
    it 'returns http success' do
      get '/api/v1/tags/update'
      expect(response).to have_http_status(:success)
    end
  end

  describe 'GET /destroy' do
    it 'returns http success' do
      get '/api/v1/tags/destroy'
      expect(response).to have_http_status(:success)
    end
  end
end
