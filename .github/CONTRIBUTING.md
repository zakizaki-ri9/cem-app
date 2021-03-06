# Contribution Guide
このリポジトリへのコントリビュート方法についてのガイドです

## 貢献方法
コードを書いて実装するだけが貢献方法ではありません。例として以下の貢献方法があります。

+ ドキュメントを追加、編集する
  + README
  + ユーザーガイド
  + 開発ガイド
+ Issueを挙げる
  + Issue上の議論に加わる
  + 不具合報告
  + 機能要望
  + 課題/タスク
+ コードのPull requestを送る
  + 既存実装の修正
  + 機能追加の実装

このなかでオススメの貢献方法は、
+ Issue上の議論に加わる => 参加ハードルがいちばん低く、広く意見を求められているため
+ Issueを挙げる => 課題の整理は全ての1歩目なのでとても大事で、GitHubの草も生えます
+ ユーザーガイドを編集する => 実装者は使う人の目線に戻れないと多々あるため

です。是非お気軽にご参加下さい。

## ドキュメントの追加、編集
このリポジトリでは多くのドキュメントはWikiで扱われています。
大きくわけて以下の二種類です。
+ ユーザーガイド
+ 開発ガイド

現在Wikiはどなたでも編集できます。

### ユーザーガイド
使いかたを説明するガイドです。開発に携わっていなくても貢献しやすいドキュメントのひとつです。
むしろ開発者目線で書いてしまうことが多いため、ユーザー目線で書いていただけると非常に嬉しいです。

### 開発ガイド
開発に関して説明したガイドです。実際に動作テストする場合、開発用に外部サービスとの連携をする必要があったりと意外複雑です。

現行のガイドでわかりにくかった箇所、上手くいかなかった箇所などがあればフィードバック、加筆、修正をしていただけると助かります。

## Issues
Issueによる貢献は開発に携わらなくても参加できるもっとも重要かつ簡単な貢献の一つです。

Issue内ではユーザビリティに基づく実装方針が議論されることもあります。開発者でなくても議論に参加することができるので、是非気軽に意見を交わしていただきたいと考えています。

また、Issueは大きく、不具合報告、機能要望、課題/タスクにわけられています。
各Issueは専用のテンプレートがありますが、これはIssueを記載しやすいように助けるためのものでフォーマットを強制するものではありません。もちろん上記Issue以外の内容でも歓迎しています。

### Issue上で議論に加わる
最もハードルが低く、広く求められている貢献方法です。

[Issues一覧](https://github.com/challenge-every-month/cem-app/issues)から興味のあるIssueを開き議論に参加してみてください。
また、`help wanted`タグのついてるものは特に広く意見を求めているものなので参考にしてみてください。

### 不具合報告、機能要望、課題/タスク
それぞれテンプレートがあるので是非活用してみてください。
+ [不具合報告](https://github.com/challenge-every-month/cem-app/issues/new?template=bag_report.md)
+ [機能要望](https://github.com/challenge-every-month/cem-app/issues/new?template=feature_request.md)
+ [課題/タスク](https://github.com/challenge-every-month/cem-app/issues/new?template=task.md)

また上記に当てはまらないもしくはふさわしいものが不明な場合、[それ以外のIssue](https://github.com/challenge-every-month/cem-app/issues/new)も大歓迎です。

また、アイデアとして挙がっているbacklogリストをIssueとして整理していただく方法もオススメです。
backlogは[こちらのボード](https://github.com/challenge-every-month/cem-app/projects/1)で管理されています。

是非なにかあれば気軽にIssueとして挙げていただければと思います。必ずしも実装に結びつくものでなくても構いません。質問や相談も気兼ねなく書いてみてください。

## 機能追加、修正をする
機能の追加実装や修正はPull requestを送ることで対応しています。既存の問題はIssueに挙がっていますが、Pull requestにあたって必ずしも対応するIssueが必要ではありません。

### 実装に関して
実装方針に関して相談や質問があればPull request、関連Issue、どちらでもコメントによってお気軽に話しあいましょう。CEMではSlackコミュニティなので、Slack内でご相談いただいてもかまいません。

### コミットメッセージに関して
commitの際は`npm run commit`か`yarn commit`を実行すると対話的にコミットメッセージを作成できるのでご活用ください。フォーマットにしたがったコミットメッセージになるものの、必須ではありません。

もちろん使わなくてもOKですのでやりやすいやり方でコミットしてください。

### コードレビュー
Pull requestで送られたコードはもれなくメンテナーによってレビューされます。レビュワーは心理的安全性を第一にレビューすることを心掛けなければならず、レビュイーに心理的圧力がかからないように配慮するものとします。

つまり、ためらわずに積極的なPull requestをお待ちしております。

### マージとリリース
Pull requestが承認（Approve）されたらメンテナーの手によってしかるべきタイミングでマージされ、リリースされます。
