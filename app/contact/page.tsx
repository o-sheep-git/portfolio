import type { Metadata } from "next";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description: "お仕事のご相談・ご連絡はnoteまたはXのDMからどうぞ。",
};

const channels = [
  {
    name: "note",
    description: "記事へのコメントや、クリエイターページからのお問い合わせ",
    url: site.links.note,
    label: "note.com/o_sheep_like",
  },
  {
    name: "X",
    description: "DMでのご相談・ご連絡",
    url: site.links.x,
    label: "x.com/o_sheep_like",
  },
];

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="text-2xl font-bold">Contact</h1>
      <div className="mt-6 space-y-4 leading-loose text-neutral-600">
        <p>
          お仕事のご相談やご連絡は、noteまたはXからお気軽にどうぞ。
        </p>
        <p>
          「まだ依頼するか決めていないけれど、少し話を聞いてみたい」という段階でも大丈夫です。内容を確認のうえ、順番にお返事します。
        </p>
      </div>

      <div className="mt-12 space-y-6">
        {channels.map((channel) => (
          <a
            key={channel.name}
            href={channel.url}
            target="_blank"
            rel="noopener noreferrer"
            className="block rounded-lg border border-neutral-200 p-6 transition-colors hover:border-neutral-400"
          >
            <h2 className="font-semibold">{channel.name}</h2>
            <p className="mt-2 text-sm leading-relaxed text-neutral-600">
              {channel.description}
            </p>
            <p className="mt-3 text-sm text-neutral-900 underline underline-offset-4">
              {channel.label} ↗
            </p>
          </a>
        ))}
      </div>
    </div>
  );
}
