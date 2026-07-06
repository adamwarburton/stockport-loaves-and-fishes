import Link from "next/link";
import { Markdown } from "@/components/Markdown";
import { PostCard } from "@/components/PostCard";
import { getPage, getVisiblePosts } from "@/lib/content";
import { site } from "@/lib/site";

// Regenerate hourly so scheduled posts appear on time without a rebuild.
export const revalidate = 3600;

const DOORS = [
  {
    href: "/help",
    title: "I need help",
    text: "A hot dinner, warm clothes, and someone in your corner. Just turn up — here's what to expect.",
    loud: true,
  },
  {
    href: "/how-to-help",
    title: "I want to give",
    text: "Money, coats, tins, sleeping bags — see what we need this week and where to bring it.",
    loud: false,
  },
  {
    href: "/how-to-help#volunteer",
    title: "I want to volunteer",
    text: "Can you stir a pot, carry a table, or hold a conversation? You're hired.",
    loud: false,
  },
] as const;

export default async function HomePage() {
  const page = getPage("home");
  const latest = getVisiblePosts().slice(0, 3);

  return (
    <>
      {/* Hero: the three essentials, readable in five seconds on a bus. */}
      <section className="bg-brand-900 text-white">
        <div className="mx-auto max-w-5xl px-4 py-14 sm:py-20">
          <h1 className="max-w-2xl font-[family-name:var(--font-display)] text-4xl font-semibold leading-tight sm:text-5xl">
            Everyone&rsquo;s welcome at the table.
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-brand-100">
            Hot food, warm welcome, no questions asked — every Sunday evening in Stockport, for
            anyone who&rsquo;s homeless or struggling.
          </p>
          <dl className="mt-8 grid max-w-3xl gap-4 sm:grid-cols-3">
            <div className="rounded-xl bg-brand-800 p-4">
              <dt className="text-sm font-bold uppercase tracking-wide text-accent-300">What</dt>
              <dd className="mt-1">A free hot dinner — and practical help</dd>
            </div>
            <div className="rounded-xl bg-brand-800 p-4">
              <dt className="text-sm font-bold uppercase tracking-wide text-accent-300">When</dt>
              <dd className="mt-1">{site.mealTimes}</dd>
            </div>
            <div className="rounded-xl bg-brand-800 p-4">
              <dt className="text-sm font-bold uppercase tracking-wide text-accent-300">Where</dt>
              <dd className="mt-1">
                {site.venue.name}, {site.venue.street}, {site.venue.postcode}
              </dd>
            </div>
          </dl>
        </div>
      </section>

      {/* The three doors: the whole homepage strategy. */}
      <section aria-label="How can we help you?" className="mx-auto max-w-5xl px-4 py-12">
        <div className="grid gap-5 sm:grid-cols-3">
          {DOORS.map((door) => (
            <Link
              key={door.href}
              href={door.href}
              className={
                door.loud
                  ? "flex flex-col rounded-2xl bg-accent-300 p-6 text-ink shadow-md hover:bg-accent-200"
                  : "flex flex-col rounded-2xl border-2 border-brand-100 bg-white p-6 shadow-sm hover:border-brand-600"
              }
            >
              <span className="font-[family-name:var(--font-display)] text-2xl font-semibold text-brand-900">
                {door.title}
              </span>
              <span className="mt-2 text-base">{door.text}</span>
              <span className="mt-4 font-bold text-brand-800" aria-hidden="true">
                &rarr;
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 pb-4">
        <Markdown markdown={page.body} className="prose text-lg" />
      </section>

      {latest.length > 0 && (
        <section aria-labelledby="latest-news" className="mx-auto max-w-5xl px-4 py-12">
          <div className="flex items-baseline justify-between gap-4">
            <h2
              id="latest-news"
              className="font-[family-name:var(--font-display)] text-3xl font-semibold text-brand-900"
            >
              Latest from the kitchen
            </h2>
            <Link
              href="/news"
              className="font-semibold text-brand-800 underline underline-offset-4"
            >
              All news
            </Link>
          </div>
          <div className="mt-6 grid gap-5 sm:grid-cols-3">
            {latest.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
        </section>
      )}
    </>
  );
}
