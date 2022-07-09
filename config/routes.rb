Rails.application.routes.draw do
  get 'users_net_pay/index'
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
  root 'index#index'
end
