# 基本となるイメージを指定 本番用のnginxのdockerfile
FROM nginx:1.21.6

# 必要なパッケージをインストール
RUN apt-get update && \
  apt-get install -y apt-utils locales gettext vim && \
  echo "ja_JP.UTF-8 UTF-8" > /etc/locale.gen && \
  locale-gen ja_JP.UTF-8

# 環境変数を設定
ENV LC_ALL=ja_JP.UTF-8
ENV TZ=Asia/Tokyo

# Nginxの設定ファイルをコンテナ内にコピー ここではtemplateをコピーしている
COPY ./container/nginx/default.conf.template /etc/nginx/conf.d/default.conf.template

COPY ./container/nginx/entrypoint.sh /usr/bin/entrypoint.sh
RUN chmod +x /usr/bin/entrypoint.sh
ENTRYPOINT ["entrypoint.sh"]

# Nginxのログを保存するディレクトリをコンテナ内に作成
RUN mkdir -p /var/log/nginx

# Nginxが静的ファイルを提供するためのディレクトリをコンテナ内に作成
RUN mkdir -p /cost_men/public
RUN mkdir -p /cost_men/tmp

CMD ["nginx", "-g", "daemon off;"]
