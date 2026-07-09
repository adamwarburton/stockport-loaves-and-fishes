import Link from "next/link";
import { Markdown } from "@/components/Markdown";
import { PostCard } from "@/components/PostCard";
import { Photo } from "@/components/Photo";
import { WaveBottom, Steam } from "@/components/Decor";
import {
  IconArrowRight,
  IconClock,
  IconGive,
  IconHeart,
  IconHelpingHand,
  IconPeople,
  IconPin,
  IconPlate,
} from "@/components/Icons";
import { getPage, getVisiblePosts } from "@/lib/content";
import { site } from "@/lib/site";

// Regenerate hourly so scheduled posts appear on time without a rebuild.
export const revalidate = 3600;

const DOORS = [
  {
    href: "/help",
    title: "I need help",
    text: "A hot dinner, warm clothes, and someone in your corner. Just turn up — here's what to expect.",
    Icon: IconHelpingHand,
    loud: true,
  },
  {
    href: "/how-to-help",
    title: "I want to give",
    text: "Money, coats, tins, sleeping bags — see what we need this week and where to bring it.",
    Icon: IconGive,
    loud: false,
  },
  {
    href: "/how-to-help#volunteer",
    title: "I want to volunteer",
    text: "Can you stir a pot, carry a table, or hold a conversation? You're hired.",
    Icon: IconPeople,
    loud: false,
  },
] as const;

// Facts already stated elsewhere on the site — re-presented, not invented.
const STATS = [
  { value: "10+ yrs", label: "of Sunday dinners" },
  { value: "Every", label: "Sunday, 5–6:30pm" },
  { value: "~£15k", label: "a year, all in" },
  { value: "100%", label: "volunteer-run" },
] as const;

export default async function HomePage() {
  const page = getPage("home");
  const latest = getVisiblePosts().slice(0, 3);

  return (
    <>
      {/* ── Hero: the three essentials, readable in five seconds on a bus. ── */}
      <section className="relative overflow-hidden bg-brand-900 text-white">
        <div className="absolute inset-0 texture-dots-light" aria-hidden="true" />
        <div className="absolute inset-0 glow-warm" aria-hidden="true" />
        <div className="relative mx-auto grid max-w-5xl items-center gap-10 px-4 py-14 sm:py-20 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <p className="eyebrow text-accent-300">
              <IconPin className="size-4" />
              Thomson Street, Stockport
            </p>
            <h1 className="mt-3 max-w-2xl text-balance font-[family-name:var(--font-display)] text-[2rem] font-semibold leading-tight sm:text-5xl">
              Everyone&rsquo;s welcome at the <span className="underline-swoosh">table.</span>
            </h1>
            <p className="mt-5 max-w-xl text-lg text-brand-100">
              Hot food, warm welcome, no questions asked — every Sunday evening in Stockport, for
              anyone who&rsquo;s homeless or struggling.
            </p>

            <dl className="mt-8 grid gap-3 sm:grid-cols-3">
              <div className="rounded-2xl bg-brand-800/80 p-4 ring-1 ring-white/10">
                <dt className="flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-accent-300">
                  <IconPlate className="size-4" /> What
                </dt>
                <dd className="mt-1.5">A free hot dinner — and practical help</dd>
              </div>
              <div className="rounded-2xl bg-brand-800/80 p-4 ring-1 ring-white/10">
                <dt className="flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-accent-300">
                  <IconClock className="size-4" /> When
                </dt>
                <dd className="mt-1.5">{site.mealTimes}</dd>
              </div>
              <div className="rounded-2xl bg-brand-800/80 p-4 ring-1 ring-white/10">
                <dt className="flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-accent-300">
                  <IconPin className="size-4" /> Where
                </dt>
                <dd className="mt-1.5">
                  {site.venue.name}, {site.venue.street}, {site.venue.postcode}
                </dd>
              </div>
            </dl>
          </div>

          {/* Hero artwork. Swap the illustration for a real photo in
              src/lib/images.ts — see docs/IMAGES.md. */}
          <div className="relative hidden lg:block">
            <div
              className="absolute -inset-4 rotate-3 rounded-[2rem] bg-accent-300/25"
              aria-hidden="true"
            />
            <Photo name="hero" priority className="relative shadow-2xl ring-1 ring-white/15" />
            <div className="absolute -bottom-4 -left-4 rotate-[-4deg] rounded-xl bg-accent-300 px-4 py-2 font-[family-name:var(--font-display)] text-sm font-bold text-brand-900 shadow-lg">
              Small charity. Big pan.
            </div>
          </div>
        </div>
        <WaveBottom fill="text-paper" />
      </section>

      {/* ── The three doors: the whole homepage strategy. ── */}
      <section aria-label="How can we help you?" className="texture-dots">
        <div className="mx-auto max-w-5xl px-4 py-12">
          <div className="grid gap-5 sm:grid-cols-3">
            {DOORS.map((door) => (
              <Link
                key={door.href}
                href={door.href}
                className={
                  door.loud
                    ? "card-lift group flex flex-col rounded-2xl bg-accent-300 p-6 text-ink shadow-md hover:bg-accent-200"
                    : "card-lift group flex flex-col rounded-2xl border-2 border-brand-100 bg-white p-6 shadow-sm hover:border-brand-600"
                }
              >
                <span
                  className={
                    door.loud
                      ? "flex size-12 items-center justify-center rounded-full bg-brand-900/10 text-brand-900"
                      : "flex size-12 items-center justify-center rounded-full bg-brand-50 text-brand-700"
                  }
                >
                  <door.Icon className="size-6" />
                </span>
                <span className="mt-4 font-[family-name:var(--font-display)] text-2xl font-semibold text-brand-900">
                  {door.title}
                </span>
                <span className="mt-2 text-base">{door.text}</span>
                <span className="mt-4 inline-flex items-center gap-1 font-bold text-brand-800">
                  <span aria-hidden="true">
                    <IconArrowRight className="size-5 transition-transform group-hover:translate-x-1" />
                  </span>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── The welcome, given room to breathe. ── */}
      <section className="texture-dots">
        <div className="mx-auto max-w-3xl px-4 pb-4 pt-6 text-center">
          <Steam className="mx-auto h-7 w-10 text-accent-400" />
          <Markdown markdown={page.body} className="prose prose-center mx-auto mt-4 text-xl" />
        </div>
      </section>

      {/* ── Impact band: small charity, big pan. ── */}
      <section aria-label="At a glance" className="mt-12">
        <div className="bg-brand-800 text-white texture-dots-light">
          <div className="mx-auto max-w-5xl px-4 py-12">
            <div className="text-center">
              <h2 className="font-[family-name:var(--font-display)] text-3xl font-semibold">
                Small charity. Big pan.
              </h2>
            </div>
            <dl className="mt-8 grid grid-cols-2 gap-6 sm:grid-cols-4">
              {STATS.map((stat) => (
                <div key={stat.label} className="text-center">
                  <dt className="font-[family-name:var(--font-display)] text-4xl font-semibold text-accent-300">
                    {stat.value}
                  </dt>
                  <dd className="mt-1 text-sm text-brand-100">{stat.label}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* ── Latest from the kitchen. ── */}
      {latest.length > 0 && (
        <section aria-labelledby="latest-news" className="texture-dots">
          <div className="mx-auto max-w-5xl px-4 py-14">
            <div className="flex items-baseline justify-between gap-4">
              <h2
                id="latest-news"
                className="font-[family-name:var(--font-display)] text-3xl font-semibold text-brand-900"
              >
                Latest from the kitchen
              </h2>
              <Link
                href="/news"
                className="shrink-0 font-semibold text-brand-800 underline underline-offset-4"
              >
                All news
              </Link>
            </div>
            <div className="mt-8 grid gap-5 sm:grid-cols-3">
              {latest.map((post) => (
                <PostCard key={post.slug} post={post} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Closing: we've saved you a seat. ── */}
      <section aria-label="Come and join us">
        <div className="relative overflow-hidden bg-brand-900 text-white">
          <div className="absolute inset-0 glow-warm" aria-hidden="true" />
          <div className="relative mx-auto max-w-3xl px-4 py-16 text-center">
            <Steam className="mx-auto h-8 w-11 text-accent-300" />
            <h2 className="mt-4 font-[family-name:var(--font-display)] text-3xl font-semibold sm:text-4xl">
              We&rsquo;ve saved you a seat.
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-lg text-brand-100">
              No referral. No form. No sermon required. Just come — this Sunday, or whenever
              you&rsquo;re ready.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link
                href="/help"
                className="inline-flex items-center gap-2 rounded-full bg-accent-300 px-6 py-3 font-bold text-ink shadow-md transition-colors hover:bg-accent-200"
              >
                <IconHelpingHand className="size-5" />I need help
              </Link>
              <Link
                href="/how-to-help"
                className="inline-flex items-center gap-2 rounded-full border-2 border-white/30 px-6 py-3 font-bold text-white transition-colors hover:bg-white/10"
              >
                <IconHeart className="size-5" />I want to help
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
