FROM ruby:3.1.0

RUN apt-get update -qq && apt-get install -y build-essential \
  libpq-dev \
  postgresql-client \
  tzdata

ENV TZ=Asia/Tokyo

ENV APP_HOME /cost_men
WORKDIR $APP_HOME

ADD ./backend/Gemfile $APP_HOME/Gemfile
ADD ./backend/Gemfile.lock $APP_HOME/Gemfile.lock

ADD ./backend $APP_HOME

RUN bundle install

COPY ./container/backend/entrypoint.sh /usr/bin/
RUN chmod +x /usr/bin/entrypoint.sh
ENTRYPOINT ["entrypoint.sh"]

VOLUME /cost_men/public
VOLUME /cost_men/tmp

CMD ["rails", "server", "-b", "0.0.0.0", "-e", "development"]
