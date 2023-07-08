#!/bin/bash
set -e

# ruby config/smm_params_store.rb

rm -f /cost_men/tmp/pids/server.pid

# bundle exec rails db:create
# bundle exec rails db:migrate
# bundle exec rails db:seed

exec "$@"
