#!/bin/bash
set -e

# get the master key from SSM parameter store, 開発の時はコメントアウト
# ruby config/smm_params_store.rb

# railsのpidファイルが残っている場合削除
rm -f /cost_men/tmp/pids/server.pid

# 本番環境の時だけ行うようにする
# db:createは初回デプロイ後にコメントアウト
# bundle exec rails db:create
# bundle exec rails db:migrate
# bundle exec rails db:seed

exec "$@"
