require 'spec_helper'

# Both routes point at HomeController#index -- `root` and the explicit
# `get 'home/index'` -- so each is exercised separately to catch either one
# being changed or removed on its own.
describe 'Home', type: :request do
  shared_examples 'the home page' do |path|
    it 'responds with 200 OK' do
      get path
      expect(response).to have_http_status(:ok)
    end

    it 'renders HTML' do
      get path
      expect(response.media_type).to eq('text/html')
    end

    it 'renders the home#index template inside the application layout' do
      get path
      expect(response.body).to include('Welcome to FieldRouter')
      expect(response.body).to include('<title>FieldRouter</title>')
    end

    it 'renders the map containers the stimulus controller binds to' do
      get path
      expect(response.body).to include('data-controller="map"')
      expect(response.body).to include('id="map1"')
      expect(response.body).to include('id="map2"')
    end
  end

  describe 'GET /' do
    it_behaves_like 'the home page', '/'
  end

  describe 'GET /home/index' do
    it_behaves_like 'the home page', '/home/index'
  end

  it 'serves the same page from both routes' do
    get '/'
    root_body = response.body

    get '/home/index'
    expect(response.body).to eq(root_body)
  end

  # show_exceptions is :rescuable in the test env, so a routing miss comes back
  # as a rendered 404 rather than a raised ActionController::RoutingError.
  it 'returns 404 for an unrouted path' do
    get '/no-such-page'
    expect(response).to have_http_status(:not_found)
  end
end
