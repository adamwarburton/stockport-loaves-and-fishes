import Link from "next/link";
import { IconBowl, IconHelpingHand } from "@/components/Icons";

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
    <header className="sticky top-0 z-50 border-b border-brand-800/40 bg-brand-900/95 text-white shadow-md backdrop-blur">
      <div className="mx-auto flex max-w-5xl flex-wrap items-center gap-x-6 gap-y-2 px-4 py-3">
        <Link
          href="/"
          className="group mr-auto flex items-center gap-2.5 font-[family-name:var(--font-display)] text-lg font-semibold leading-tight"
        >
          <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-accent-300 text-brand-900 shadow-sm transition-transform group-hover:scale-105">
            <IconBowl className="size-5" />
          </span>
          <span>
            Stockport
            <br className="sm:hidden" />
            <span className="hidden sm:inline"> </span>
            Loaves&nbsp;&amp;&nbsp;Fishes
          </span>
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
            className="inline-flex items-center gap-1.5 rounded-full bg-accent-300 px-4 py-2 text-sm font-bold text-ink shadow-sm transition-colors hover:bg-accent-200"
          >
            <IconHelpingHand className="size-4" />I need help
          </Link>
        </nav>
      </div>
    </header>
  );
}
