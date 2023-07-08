# Base Image
FROM ruby:3.1.0

# 必要なライブラリをインストール
RUN apt-get update -qq && apt-get install -y build-essential \
  libpq-dev \
  postgresql-client \
  tzdata

# Set timezone
ENV TZ=Asia/Tokyo

# アプリケーションディレクトリ
ENV APP_HOME /cost_men
WORKDIR $APP_HOME

# Gemfileを追加する
ADD ./backend/Gemfile $APP_HOME/Gemfile
ADD ./backend/Gemfile.lock $APP_HOME/Gemfile.lock

# アプリケーションのコードを追加する
ADD ./backend $APP_HOME

RUN bundle install

COPY ./container/backend/entrypoint.sh /usr/bin/
RUN chmod +x /usr/bin/entrypoint.sh
ENTRYPOINT ["entrypoint.sh"]

VOLUME /cost_men/public
VOLUME /cost_men/tmp

CMD ["rails", "server", "-b", "0.0.0.0", "-e", "development"]
