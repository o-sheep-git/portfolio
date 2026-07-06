import Link from "next/link";
import { works } from "@/lib/site";

export default function Home() {
  return (
    <div className="mx-auto max-w-3xl px-6">
      <section className="py-20 sm:py-28">
        <p className="text-sm tracking-widest text-neutral-500">
          発信設計 / コンテンツ制作
        </p>
        <h1 className="mt-4 text-2xl font-bold leading-relaxed sm:text-4xl sm:leading-relaxed">
          個人で働く人の仕事を、
          <br />
          信頼につながる言葉に。
        </h1>
        <p className="mt-6 leading-loose text-neutral-600">
          おひつじと申します。個人で働く人の発信を、依頼や信頼につながる形に整える「発信設計」と、記事やWebコンテンツの制作をしています。実績や仕事観を、無理に大きく見せるのではなく、そのまま信頼につながる形で伝えることを大切にしています。
        </p>
        <div className="mt-8 flex gap-4">
          <Link
            href="/works"
            className="rounded-md bg-neutral-900 px-5 py-2.5 text-sm text-white transition-colors hover:bg-neutral-700"
          >
            制作物を見る
          </Link>
          <Link
            href="/contact"
            className="rounded-md border border-neutral-300 px-5 py-2.5 text-sm text-neutral-700 transition-colors hover:border-neutral-500"
          >
            相談する
          </Link>
        </div>
      </section>

      <section className="border-t border-neutral-200 py-16">
        <h2 className="text-lg font-semibold">できること</h2>
        <div className="mt-8 grid gap-8 sm:grid-cols-3">
          <div>
            <h3 className="font-medium">発信設計</h3>
            <p className="mt-2 text-sm leading-relaxed text-neutral-600">
              発信テーマの整理、経験の棚卸し、プロフィール文の整備など、発信の土台づくりをお手伝いします。
            </p>
          </div>
          <div>
            <h3 className="font-medium">記事制作</h3>
            <p className="mt-2 text-sm leading-relaxed text-neutral-600">
              検索意図やキーワードの整理から構成・執筆まで。読む人を急かさない、伝わる記事をつくります。
            </p>
          </div>
          <div>
            <h3 className="font-medium">Web制作</h3>
            <p className="mt-2 text-sm leading-relaxed text-neutral-600">
              Next.jsを使った小さなWebサイトやツールの制作。このサイトも自分で設計・実装しています。
            </p>
          </div>
        </div>
      </section>

      <section className="border-t border-neutral-200 py-16">
        <div className="flex items-baseline justify-between">
          <h2 className="text-lg font-semibold">Works</h2>
          <Link
            href="/works"
            className="text-sm text-neutral-500 transition-colors hover:text-neutral-900"
          >
            すべて見る →
          </Link>
        </div>
        <div className="mt-8 space-y-6">
          {works.map((work) => (
            <Link
              key={work.slug}
              href="/works"
              className="block rounded-lg border border-neutral-200 p-6 transition-colors hover:border-neutral-400"
            >
              <p className="text-xs tracking-wide text-neutral-500">
                {work.category}
              </p>
              <h3 className="mt-2 font-medium">{work.title}</h3>
              <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-neutral-600">
                {work.description}
              </p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
