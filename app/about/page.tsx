import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description: "おひつじのプロフィールと、仕事で大切にしていることの紹介です。",
};

const skills = [
  {
    title: "発信設計",
    body: "発信テーマの整理、自分の経験の棚卸し、仕事観や価値観の言語化。プロフィール文や自己紹介文の整備もお手伝いします。",
  },
  {
    title: "記事制作",
    body: "SEO記事やエッセイの企画、構成、執筆。検索意図やキーワードの整理から、構成案、下書き、セルフチェックまでを一貫して行います。",
  },
  {
    title: "AIを活用した制作",
    body: "AIを、楽に量産するためではなく、考えを整理し言葉にするための補助として使っています。AIと一緒に記事をつくる工程の設計も得意です。",
  },
  {
    title: "Web制作",
    body: "Next.js、TypeScript、Tailwind CSSを使った小さなWebサイトやツールの制作。このポートフォリオサイトも自分で設計・実装しています。",
  },
];

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="text-2xl font-bold">About</h1>

      <section className="mt-10">
        <h2 className="text-lg font-semibold">{site.name}</h2>
        <p className="mt-1 text-sm text-neutral-500">発信設計 / コンテンツ制作</p>
        <div className="mt-6 space-y-4 leading-loose text-neutral-600">
          <p>
            個人で働く人の発信を、依頼や信頼につながる形に整える「発信設計」と、記事やWebコンテンツの制作をしています。これまで、Webメディアの記事制作を継続的に担当してきました。
          </p>
          <p>
            実績、仕事観、日々の工夫。個人で働いていると、伝えたいことはあるのに、どう言葉にすればいいか迷うことが多いと感じています。私自身も、その迷いの中で書いてきました。
          </p>
          <p>
            だからこそ、大切なのは細かい表現ではなく、何を、誰に、どの順で見せるかという設計だと考えています。
            <a
              href={site.links.note}
              target="_blank"
              rel="noopener noreferrer"
              className="text-neutral-900 underline underline-offset-4 transition-colors hover:text-neutral-600"
            >
              noteでも、同じテーマで記事を書いています
            </a>
            。
          </p>
        </div>
      </section>

      <section className="mt-14 border-t border-neutral-200 pt-10">
        <h2 className="text-lg font-semibold">できること</h2>
        <div className="mt-6 space-y-8">
          {skills.map((skill) => (
            <div key={skill.title}>
              <h3 className="font-medium">{skill.title}</h3>
              <p className="mt-2 leading-loose text-neutral-600">{skill.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-14 border-t border-neutral-200 pt-10">
        <h2 className="text-lg font-semibold">大切にしていること</h2>
        <ul className="mt-6 space-y-3 leading-loose text-neutral-600">
          <li>・読む人を急かさない、煽らないこと</li>
          <li>・実績を誇張せず、正確に伝えること</li>
          <li>・結論だけでなく、考える過程や余白を残すこと</li>
          <li>・小さく作って、丁寧に育てていくこと</li>
        </ul>
      </section>

      <section className="mt-14 border-t border-neutral-200 pt-10">
        <p className="leading-loose text-neutral-600">
          お仕事のご相談は、
          <Link
            href="/contact"
            className="text-neutral-900 underline underline-offset-4 transition-colors hover:text-neutral-600"
          >
            Contact
          </Link>
          からお気軽にどうぞ。
        </p>
      </section>
    </div>
  );
}
