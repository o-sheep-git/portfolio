import { site } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="border-t border-neutral-200">
      <div className="mx-auto flex max-w-3xl flex-col gap-3 px-6 py-8 text-sm text-neutral-500 sm:flex-row sm:items-center sm:justify-between">
        <p>&copy; {new Date().getFullYear()} {site.name}</p>
        <div className="flex gap-5">
          <a
            href={site.links.note}
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-neutral-900"
          >
            note
          </a>
          <a
            href={site.links.x}
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-neutral-900"
          >
            X
          </a>
        </div>
      </div>
    </footer>
  );
}
