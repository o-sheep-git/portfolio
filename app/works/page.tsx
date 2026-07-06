import type { Metadata } from "next";
import { works } from "@/lib/site";

export const metadata: Metadata = {
  title: "Works",
  description: "制作物と活動の紹介です。",
};

export default function WorksPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="text-2xl font-bold">Works</h1>
      <p className="mt-4 leading-loose text-neutral-600">
        これまでの制作物と活動を紹介します。少しずつ増やしていく予定です。
      </p>

      <div className="mt-12 space-y-10">
        {works.map((work) => (
          <article
            key={work.slug}
            className="rounded-lg border border-neutral-200 p-8"
          >
            <p className="text-xs tracking-wide text-neutral-500">
              {work.category}
            </p>
            <h2 className="mt-2 text-lg font-semibold">{work.title}</h2>
            <p className="mt-4 leading-loose text-neutral-600">
              {work.description}
            </p>
            {work.tech && (
              <ul className="mt-5 flex flex-wrap gap-2">
                {work.tech.map((tech) => (
                  <li
                    key={tech}
                    className="rounded-full border border-neutral-200 px-3 py-1 text-xs text-neutral-600"
                  >
                    {tech}
                  </li>
                ))}
              </ul>
            )}
            {work.url && (
              <a
                href={work.url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-block text-sm text-neutral-900 underline underline-offset-4 transition-colors hover:text-neutral-600"
              >
                {work.urlLabel ?? "見る"} ↗
              </a>
            )}
          </article>
        ))}
      </div>
    </div>
  );
}
