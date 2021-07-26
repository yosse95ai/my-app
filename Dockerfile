# 参考ページ *************************************************************************
# https://www.indellient.com/blog/how-to-dockerize-an-angular-application-with-nginx/
# 

# nodeの公式イメージ
FROM node:latest AS build

# ワークスペース
WORKDIR /usr/local/app

COPY ./ /usr/local/app/

# すべての依存パッケージのインストール
RUN npm install

# アプリケーションをビルド
RUN npm run build

# nginxの公式イメージ
FROM nginx:latest

# ビルドしたアプリケーションをnginxのデフォルトコンテンツとして設定
COPY --from=build /usr/local/app/dist/my-app /usr/share/nginx/html

# Expose port 80
EXPOSE 80