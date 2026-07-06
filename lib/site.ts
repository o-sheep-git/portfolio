export const site = {
  name: "おひつじ",
  title: "おひつじ | ポートフォリオ",
  description:
    "個人で働く人の発信を、依頼や信頼につながる形に整える発信設計と、記事・Webコンテンツの制作をしています。おひつじのポートフォリオサイトです。",
  links: {
    note: "https://note.com/o_sheep_like",
    x: "https://x.com/o_sheep_like",
  },
} as const;

export type Work = {
  slug: string;
  title: string;
  category: string;
  description: string;
  tech?: string[];
  url?: string;
  urlLabel?: string;
};

export const works: Work[] = [
  {
    slug: "portfolio-site",
    title: "ポートフォリオサイト(本サイト)",
    category: "Web制作",
    description:
      "このサイト自体も、自分で設計と実装を行った制作物です。今後ツールなどを追加していけるように、静的ページ中心のシンプルな構成でNext.jsを使って作りました。",
    tech: ["Next.js", "TypeScript", "Tailwind CSS", "Vercel"],
  },
  {
    slug: "note",
    title: "個人で働く人の発信を、依頼や信頼につながる形に整えるnote",
    category: "発信活動",
    description:
      "実績や仕事観を、選ばれる理由に変える考え方を書いています。私も個人で働くひとりとして、同じ場所で試行錯誤しています。",
    url: "https://note.com/o_sheep_like",
    urlLabel: "noteを読む",
  },
];
