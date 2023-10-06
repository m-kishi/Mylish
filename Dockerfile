# 現時点で最新のLTSを指定
FROM node:lts-alpine3.18

# プロジェクトフォルダ
WORKDIR /mylish

# 必要なパッケージをインストール
RUN apk update && npm install -g npm @vue/cli
