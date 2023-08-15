# frozen_string_literal: true

module Api
  module V1
    class RecipeTagsController < SecuredController
      before_action :authorize_request
    end
  end
end
