import Link from "next/link";

const NAV = [
  { href: "/our-story", label: "Our story" },
  { href: "/news", label: "News" },
  { href: "/how-to-help", label: "How to help" },
  { href: "/contact", label: "Contact" },
] as const;

/**
 * The "I need help" link is deliberately the loudest thing on every page
 * (CLAUDE.md §7: reachable in one tap from anywhere). Keep it that way.
 */
export function Header() {
  return (
    <header className="sticky top-0 z-50 bg-brand-900 text-white shadow-md">
      <div className="mx-auto flex max-w-5xl flex-wrap items-center gap-x-6 gap-y-2 px-4 py-3">
        <Link
          href="/"
          className="mr-auto font-[family-name:var(--font-display)] text-lg font-semibold leading-tight"
        >
          Stockport
          <br className="sm:hidden" />
          <span className="hidden sm:inline"> </span>
          Loaves&nbsp;&amp;&nbsp;Fishes
        </Link>
        <nav aria-label="Main" className="flex flex-wrap items-center gap-x-5 gap-y-2">
          {NAV.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="text-sm font-medium text-brand-100 underline-offset-4 hover:text-white hover:underline"
            >
              {label}
            </Link>
          ))}
          <Link
            href="/help"
            className="rounded-full bg-accent-300 px-4 py-2 text-sm font-bold text-ink shadow-sm hover:bg-accent-200"
          >
            I need help
          </Link>
        </nav>
      </div>
    </header>
  );
}
