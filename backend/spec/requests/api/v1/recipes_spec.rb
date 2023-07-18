require 'rails_helper'

RSpec.describe "Api::V1::Recipes", type: :request do
  describe "GET /index" do
    it "returns http success" do
      get "/api/v1/recipes/index"
      expect(response).to have_http_status(:success)
    end
  end

  describe "GET /show" do
    it "returns http success" do
      get "/api/v1/recipes/show"
      expect(response).to have_http_status(:success)
    end
  end

  describe "GET /create" do
    it "returns http success" do
      get "/api/v1/recipes/create"
      expect(response).to have_http_status(:success)
    end
  end

  describe "GET /update" do
    it "returns http success" do
      get "/api/v1/recipes/update"
      expect(response).to have_http_status(:success)
    end
  end

  describe "GET /destroy" do
    it "returns http success" do
      get "/api/v1/recipes/destroy"
      expect(response).to have_http_status(:success)
    end
  end

end
