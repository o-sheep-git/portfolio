# H.Oshikiri ポートフォリオ

オウンドメディア運用とWebアナリティクスのビジネスプロフィールです。

## ファイル構成

| ファイル | 用途 |
| --- | --- |
| `index.html` | Home |
| `about/index.html` | About |
| `privacy/index.html` | プライバシーポリシー |
| `assets/css/style.css` | 共通スタイルとページレイアウト |
| `assets/js/main.js` | フッターの年表示 |
| `favicon.svg` | サイトアイコン |
| `robots.txt`、`sitemap.xml` | クロールと公開URLの案内 |
| `vercel.json` | Vercelの静的配信設定 |

## ローカル確認

リポジトリ直下で静的ファイルサーバーを起動し、ブラウザで [Home](http://localhost:8000/) を開きます。ビルドは不要です。

```bash
python3 -m http.server 8000
```

## Projects・Labの追加

公開時に `projects/index.html` または `lab/index.html` を作成し、共通CSSとヘッダー・フッターを利用します。全ページで該当する「準備中」の項目をリンクに切り替え、固有のtitle・description・canonicalを設定し、公開URLをサイトマップに追加します。主要リンクの `data-track` は、将来のGTM設定で使える識別子です。

## 公開先

[ポートフォリオサイト](https://portfolio-teal-two-97.vercel.app/)
