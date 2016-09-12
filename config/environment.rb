# Load the Rails application.
require_relative 'application'

Rails.application.configure do
  config.generators.javascript_engine :js
end

# Initialize the Rails application.
Rails.application.initialize!
