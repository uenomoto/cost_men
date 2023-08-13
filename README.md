[ヘルスチェック(接続チェック)](https://workoutkeep.com/api/v1/health_check): 8/5 現在 ECS 起動

[![Test and Lint CI](https://github.com/uenomoto/cost_men/actions/workflows/rspec-and-rubocop.yml/badge.svg)](https://github.com/uenomoto/cost_men/actions/workflows/rspec-and-rubocop.yml)
[![.github/workflows/auto-deploy.yml](https://github.com/uenomoto/cost_men/actions/workflows/auto-deploy.yml/badge.svg)](https://github.com/uenomoto/cost_men/actions/workflows/auto-deploy.yml)

# CostMen アプリの URL

https://cost-men.com/

テストユーザーとしてお好きにログインしてお使いください。

- email: test@example.com
- password: Pass1234

LINE アカウントを持っている方は、LINE ログインで簡単にログインできます。

Auth0 認証サービスを利用しているためセキュリティ面は安心です。

## なぜ作ったのか

知人の経営する飲食店の、原価管理作業は Excel で作成していました。

レシピと原価表は別々のファイルで管理していて、仕入れ先は常に頭で記憶していたり納品書を見て管理していました

そこから、レシピの原価を計算するのに大変手間がかかっていました。

そこでレシピと原価表を統一させてかつ、レシピの原価を計算するのに手間がかからないアプリができないかと知人と考えました。

**まずそこでアプリ開発する醍醐味として、**

- ユーザーに計算はさせない！
- ユーザーは仕入れ先とその原材料と購入値段と数量を DB に登録しあとはレシピで使う材料の数量を設定し組み立てるだけ！

たったこれだけで、レシピの原価を計算するのにかかる手間が大幅に減らすことができます！

## 使い方

1. 仕入れ先を登録します
2. 仕入れ先に原材料と必要な情報を登録します
3. レシピに使用するカテゴリー(タグ)を登録します
4. レシピに使う原材料と数量、レシピ名、タグ、盛り付け写真を登録します

ここから任意

5. レシピに対する販売価格を設定します
6. レシピに対する手順を登録します

以上です！

## こだわりポイント

<details><summary>非機能要件とこだわりポイント</summary>

- セキュリティ面は Auth0 という認証サービスを使用し、下手に自作せずにセキュリティ面を考えました。

- ユーザーの希望で LINE でのソーシャルログインもできるようにしました

**UI/UX**

- 文字は見やすく余白は誤クリックしない様間隔を空け押しやすいラベルを押しても反応するチェックボックスや端を押しても反応するボタンなど快適な操作ができるよう常に自分がユーザーの気持ちになって開発しました。

<br>

- なるべく遷移しない様にページ数は少なくフォームや編集などはモーダルなどを使用しスラスラと登録や編集ができる様にしました

<br>

- ユーザーが登録や編集、削除などアクションを起こすとメッセージがアナウンスされる様にし、<br>今ユーザーは何をしたのかを成功や失敗など色分け表示する様にしました

<br>

- 縦長にならないようにスクロール負荷を考え、タブやページネーションを使い工夫しました

<br>

- バリデーションはバックエンドは勿論、レシピ登録以外はフロント側でもバリデーションがあり<br>リアルタイムで focus と value を監視し検証に引っ掛かったら教えてあげれる様にしました。

<br>

- バリデーションに引っ掛かったり、何もしていない場合は常に Submit ボタンが非活性になり DB に送信できない様にしました。<br>バリデーションがクリアできたら押せる様になります。

<br>

- Submit ボタンが押されたら、DB 操作が終わるまで再度ボタンを押せない様にし、<br>loadingSpinner アニメーションを使用しロード中だとユーザーにお知らせできる様にしました。
  <br>何度もクリックされ DB に不具合が起きない様にもする対策にもなります。win-win です！

<br>

- CI/CD パイプラインは開発前に準備し、開発前に本番環境を整え、こまめに素早くデプロイできる様にしました。

- Rails の RSpec のみですがテストコードを書いて追加機能を開発した際にバグを早期発見できるように意識しました。

- Rails の form_object を使用し 3 つのテーブル(model)を同時に DB 操作できる様にして API の数を減らし、<br>ユーザーからとしても 1 ページで登録、編集更新ができるのでいいと思いました。

- 一度の API で複数の処理はトランザクションを使用し一貫性(全て完了か全て失敗)と整合性(矛盾が無い)を保ちながら DB 操作できる様にしました。

</details>

## 各画面機能一覧

| トップ画面                                                                                             | ログイン画面                                                                                                  |
| ------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------- |
| ![Top画面](https://github.com/uenomoto/cost_men/assets/113354283/26478410-4b1f-4c29-ac0b-d128e8c1e69e) | ![ログイン画面](https://github.com/uenomoto/cost_men/assets/113354283/c55203de-9803-40e2-8f0f-7636fdd5d2b0) |
| のんびりしながら原価計算は機械に任せてしまいましょう。                                                 | Auth0 認証サービスを使用しています。<br> LINE のアカウントがあれば、LINE ログインも可能です。                 |

| 空データレシピ一覧画面                                                                                                        | 　レシピ一覧画面                                                                                                         |
| ----------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| ![enptystate](https://github.com/uenomoto/cost_men/assets/113354283/3eea20f0-ced1-4ca4-aac0-7c9dec66eb88)                     | ![レシピ一覧](https://github.com/uenomoto/cost_men/assets/113354283/ce4946b8-5ebf-47b6-bd27-a9f67480bd91)              |
| 空のレシピ一覧です、EnptyState です。<br>こうすることにより初めて訪れた方は<br>この画面がなんなのかイメージしやすくなります。 | レシピ一覧です。原材料、値段、<br>レシピ名と画像が見れるようになっています。<br>ログイン後に一番始めに遷移される画面です |

| 仕入れ先、原材料画面                                                                                                                                           | 　 レシピ登録画面                                                                                                                                                          |
| -------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ![原材料登録](https://github.com/uenomoto/cost_men/assets/113354283/b9db6851-17df-472b-8e56-d52e8f509d83)                                                      | ![レシピ登録](https://github.com/uenomoto/cost_men/assets/113354283/f2592366-0113-4083-8893-21eac3d5a5d6)                                                                |
| こちらの画面一つで仕入れ先と原材料が一覧で確認は勿論。<br>登録、編集ができ、原材料のみ削除ができます。<br>仕入れ先の編集は名前をクリック又はタップしてください | ここで一気にタグ、レシピに使う原材料、<br>レシピ名と画像全て同時に登録しています。<br>トランザクションをしっかり行い<br>一つでも失敗すると全て登録されないようにしています |

| レシピ編集                                                                                                                                       | レシピ手順　                                                                                                |
| ------------------------------------------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------- |
| ![レシピ編集](https://github.com/uenomoto/cost_men/assets/113354283/98e570ba-bab2-4f72-92a0-137dc931cccc)                                      | ![レシピ手順](https://github.com/uenomoto/cost_men/assets/113354283/17203649-c8dd-480c-9136-fe0662093f68) |
| 登録されている情報が編集前に表示するので<br>編集前がどんななのか分かります。<br>当たり前の機能なのですが、ここは特殊で実装が<br>難しかったです。 | こちらはレシピに対する作成手順です。<br>user の任意で使用するかしないか選べます。                           |

| レシピ詳細                                                                                                                                                                                 |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| ![レシピ詳細](https://github.com/uenomoto/cost_men/assets/113354283/43f6bd4f-4dc5-4b9e-ae7f-75929f99d834)                                                                                |
| 一覧で見れなかった情報が確認できます。<br>販売価格の設定や手順の設定、レシピの編集ページに遷移できます。<br>原材料一覧と手順一覧は縦長になってしまうためタブで選択できるようにしています。 |

## アプリのイメージ動画

### 再生速度2倍で見るのをお勧めします。

https://github.com/uenomoto/cost_men/assets/113354283/81b0c136-2c82-4160-a0ed-0182ae153adb

ログインから始まり仕入れ先と原材料の登録とタグの登録をしています↑

https://github.com/uenomoto/cost_men/assets/113354283/f5779c75-d8f9-444b-8bd5-f1c29034b6c6

レシピの登録とレシピに関する販売価格の設定とレシピの手順を作成しています↑

https://github.com/uenomoto/cost_men/assets/113354283/aba1f16a-06cb-4fc7-bb57-00a6cf15cb9e

仕入れ先と原材料とタグの編集をしています↑
次の動画で注目して欲しいのはしっかりと1/円が変わりレシピに対する原材料の単価も変わっていることです

https://github.com/uenomoto/cost_men/assets/113354283/2c008fea-661d-4a1c-a00a-103ba82c119e

レシピの編集と販売価格の編集と手順の編集を行い全て削除しています。
最後にログアウトをしURLからアクセスされても認可されていなければ認証必須ページには遷移できません。


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

![cost_men](https://github.com/uenomoto/cost_men/assets/113354283/c5ea5723-2b77-4271-9e96-ddb8f39d5b3c)

## システム構成図

![AWSアーキテクチャ図](https://github.com/uenomoto/cost_men/assets/113354283/c22c4c19-f699-4579-8288-3b7fba76bafd)

## 今後開発していく機能

- 印刷機能
- 原材料検索機能

## どんな思いで作ったのか、下準備

[こちらのリポジトリにまとめてあります](https://github.com/uenomoto/original_product)
