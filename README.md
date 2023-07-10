[ヘルスチェック]('https://workoutkeep.com/api/v1/health_check')

[![Test and Lint CI](https://github.com/uenomoto/cost_men/actions/workflows/rspec-and-rubocop.yml/badge.svg)](https://github.com/uenomoto/cost_men/actions/workflows/rspec-and-rubocop.yml)

# オリジナルプロダクトざっくりタスクリスト

# 8/13 日までに完成させること

細かい部分は Trello に書いていく。細かくタスクを作ってやってる感を出して自分を鼓舞する。

- [ ] 第一フェーズ：開発環境構築 7/10
- [ ] 第二フェーズ：本番環境構築(test_deploy)7/10~7/11 クラスター、タスク、サービス、ALB は削除するまたすぐ作れるようメモ
- [ ] 第三フェーズ：全画面のビュー作成、JSX,CSS のみ(frontend)7/11~7/12
      この段階のビューは直接データ書いて良い。データベースとの連携はしない。↑
      ここで Vercel にデプロイして、デプロイした URL をメンターさんに見せる
- [ ] 第四フェーズ：ユーザー登録機能の実装, ログイン機能の実装 7/13~7/17
- [ ] 第五フェーズ：API の実装(backend)※必ずこの段階で postman で API 叩けるか確認すること！！7/17~7/21
- [ ] 第六フェーズ：API テストの実装、モデルテストの実装 7/21~7/22
      ここで AWS ECS にデプロイし独自ドメインでポストマンと繋げてテストデプロイする。
- [ ] 第七フェーズ：フロントエンドとバックエンドの統合(API との連携)7/22~8/3
- [ ] 第八フェーズ：ここが正念場！！View を作り込む。8/3~8/12
- [ ] 最終フェーズ: ラストデプロイ！！8/13

厳しかったら作り込むな、まずは完成させろ！ということを優先していく

追加機能がない限りテストは後回し

## 時間が余ったらやること

フロント側もボタンテストだけは挑戦してみる
jest と react testing library を使用する
