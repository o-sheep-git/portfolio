# おひつじ ポートフォリオ

個人で働く人の発信を、依頼や信頼につながる形に整える「発信設計」と、記事・Webコンテンツの制作をしています。おひつじのポートフォリオサイトのソースコードです。

## このサイトについて

- 発信設計、記事制作、Web制作といった活動内容の紹介
- これまでの制作物の掲載
- お仕事のご相談窓口

実績や仕事観を、無理に大きく見せるのではなく、そのまま信頼につながる形で伝えることを大切にしています。サイト自体も、その考え方で自分で設計・実装しました。

## 使用技術

- [Next.js](https://nextjs.org/)（App Router）
- TypeScript
- Tailwind CSS
- Vercel（ホスティング）

静的ページ中心のシンプルな構成です。今後、ツールなどを少しずつ追加していけるようにしています。

## 開発

```bash
npm install
npm run dev
```

http://localhost:3000 で開発サーバーが起動します。

```bash
npm run build   # 本番ビルド
npm run start   # 本番ビルドの起動
npm run lint    # Lint
```

## アクセス解析

Google Tag Manager と GA4 のタグを組み込んでいます。どちらも環境変数を設定したときだけ読み込まれ、未設定なら計測用のコードは一切出力されません。ローカル開発では通常なにも設定せず、オフのまま使います。

| 変数名 | 用途 | 例 |
| --- | --- | --- |
| `NEXT_PUBLIC_GTM_ID` | Google Tag Manager のコンテナID | `GTM-XXXXXXX` |
| `NEXT_PUBLIC_GA_ID` | GA4 の測定ID | `G-XXXXXXXXXX` |

本番のIDは Vercel のプロジェクト設定(Settings → Environment Variables)に登録し、再デプロイすると反映されます。

設定するのは、次のどちらか一方です。

- **GTM経由でGA4を配信する(おすすめ)** … `NEXT_PUBLIC_GTM_ID` だけを設定し、GA4のタグはGTMの管理画面側で作成する
- **GTMを使わずGA4だけ入れる** … `NEXT_PUBLIC_GA_ID` だけを設定する

両方を設定したうえでGTM側にもGA4タグを作ると、同じページビューが二重に計測されるため注意してください。

## リンク

- サイト: https://portfolio-teal-two-97.vercel.app/
- note: https://note.com/o_sheep_like
- X: https://x.com/o_sheep_like

お仕事のご相談・ご連絡は、noteまたはXのDMからお気軽にどうぞ。
