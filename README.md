[ヘルスチェック(接続チェック)](https://workoutkeep.com/api/v1/health_check): 8/5 現在 ECS 起動

[![Test and Lint CI](https://github.com/uenomoto/cost_men/actions/workflows/rspec-and-rubocop.yml/badge.svg)](https://github.com/uenomoto/cost_men/actions/workflows/rspec-and-rubocop.yml)
[![.github/workflows/auto-deploy.yml](https://github.com/uenomoto/cost_men/actions/workflows/auto-deploy.yml/badge.svg)](https://github.com/uenomoto/cost_men/actions/workflows/auto-deploy.yml)

# CostMen アプリの URL

https://cost-men.com/

テストユーザーとしてお好きにログインしてお使いください。

- email: test@email.com
- password: Test4649

LINE アカウントを持っている方は、LINE ログインで簡単にログインできます。

Auth0 認証サービスを利用しているためセキュリティ面は安心です。

## なぜ作ったのか

知人の経営する飲食店の、原価管理作業は Excel で作成していました。

レシピと原価表は別々のファイルで管理していて、仕入れ先は常に頭で記憶していたり納品書を見て管理していました

そこから、レシピの原価を計算するのに大変手間がかかっていました。

そこでレシピと原価表を統一させてかつ、レシピの原価を計算するのに手間がかからないアプリができないかと知人と考えました。

**まずそこでアプリ開発する醍醐味として、**

- ユーザーに計算はさせない！
- ユーザーは仕入れ先とその原材料と購入値段と数量を DB に登録しあとはレシピで使う材料の数量を設定しを組み立てるだけ！

たったこれだけで、レシピの原価を計算するのにかかる手間が大幅に減ります。(やったね！)

## 使い方

1. 仕入れ先を登録します
2. 仕入れ先に原材料と必要な情報を登録します
3. レシピに使用するカテゴリー(タグ)を登録します
4. レシピに使う原材料と数量、レシピ名、タグ、盛り付け写真を登録します

ここから任意

5. レシピに対する販売価格を設定します
6. レシピに対する手順を登録します

以上です！

## 機能一覧

comming soon....

## 開発環境

- Docker version 20.10.23
- Docker Compose version v2.15.1

- インフラ

  - AWS(ECS Fargate/ECR/RDS/ALB/Route53/ACM/VPC/S3/cloudformation)
  - Vercel

- 継続的インテグレーション/継続的デリバリー

  - GitHub Actions

- 認証機能
  - Auth0

## 技術一覧

- フロントエンド
  - TypeScript
  - React
  - Next.js
  - Tailwind CSS
  - axios
  - ESLint
  - Prettier
- バックエンド
  - Ruby 3.0.5
  - Ruby on Rails 7.0.5
  - RSpec
  - Rubocop
  - PostgreSQL
  - Nginx
  - Puma

## ER 図

![cost_men](https://github.com/uenomoto/cost_men/assets/113354283/504279f2-fbd3-4a0c-8590-4c363180862b)


## システム構成図

![AWSアーキテクチャ図](https://github.com/uenomoto/cost_men/assets/113354283/d2306de2-ec4d-4046-8f0e-cfe3d513203c)


## 開発途中な機能

- 印刷機能
- タグ検索機能
- ページネーション
- 原材料検索機能

## どんな思いで作ったのか、下準備

[こちらのリポジトリにまとめてあります](https://github.com/uenomoto/original_product)
