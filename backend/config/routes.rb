# frozen_string_literal: true

Rails.application.routes.draw do
  namespace :api, defaults: { format: :json } do
    namespace :v1 do
      get 'health_check', to: 'health_check#index'
      get 'search', to: 'search#index'
      resources :recipes, only: %i[index show create update destroy] do
        resources :recipe_ingredients, only: %i[index create update], path: 'ingredients'
        resources :recipe_procedures, only: %i[index create update destroy], path: 'procedures'
        resource :selling_prices, only: %i[show create update]
      end
      resources :ingredients, only: %i[create update destroy]
      get 'suppliers/select_index', to: 'suppliers#select_index'
      get 'suppliers/index_all', to: 'suppliers#index_all'
      resources :suppliers, only: %i[index create update]
      resources :tags, only: %i[index create update destroy]
    end
  end
end
