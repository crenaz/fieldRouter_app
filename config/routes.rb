FieldRouter::Application.routes.draw do
  # Set the root path to the home controller's index action
  root 'home#index'
  
  # Add more routes as needed
  get 'home/index'
end
