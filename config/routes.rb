Rails.application.routes.draw do
  root "net#index"

  get "/net", to: "articles#index"
  get "/net/:id", to: "net#show"
end
