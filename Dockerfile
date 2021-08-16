# 参考ページ *************************************************************************
# https://www.indellient.com/blog/how-to-dockerize-an-angular-application-with-nginx/
# https://qiita.com/k_bobchin/items/14f21b9a597660f4f24c#3-dockerfile-dockerignore-%E3%82%92%E8%BF%BD%E5%8A%A0
# 

# nodeの公式イメージ
FROM node:latest AS build

# package.json package.lockをコピー
# COPY ./ /usr/local/app/
COPY ./package*.json /usr/local/app/

# ワークスペース
WORKDIR /usr/local/app

# すべての依存パッケージのインストール
# RUN npm install
RUN npm ci

# アプリケーションをビルド
# RUN npm run prod
COPY . /usr/local/app/

# Docker上にビルド
RUN npx ng build --aot

# nginxの公式イメージ
# FROM nginx:latest

# nginx構成ファイルのコピー
# COPY ./nginx/nginx.conf /etc/nginx/nginx.conf

# ビルドしたアプリケーションをnginxのデフォルトコンテンツとして設定
# COPY --from=build /usr/local/app/dist/my-app /usr/share/nginx/html
