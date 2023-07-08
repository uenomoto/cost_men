Rails.application.routes.draw do

  namespace :api , defaults: { format: :json } do
    namespace :v1 do
      get 'health_check', to: 'health_check#index'
    end
  end
end
