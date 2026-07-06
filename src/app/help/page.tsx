import type { Metadata } from "next";
import { Markdown } from "@/components/Markdown";
import { getPage } from "@/lib/content";
import { site } from "@/lib/site";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "I need help — come and eat, it's free",
  description:
    "A free hot meal every Sunday, 5–6:30pm, at Stockport Baptist Church, Thomson Street. " +
    "No referral, no form — just come. Plus where to get help before Sunday.",
};

/**
 * The most important page on the site. Everything here must read clearly at
 * low literacy levels, at a glance, on a cheap phone. Short sentences. Big
 * text. The essentials before anything else.
 */
export default async function HelpPage() {
  const page = getPage("help");

  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      <h1 className="font-[family-name:var(--font-display)] text-4xl font-semibold text-brand-900 sm:text-5xl">
        {page.title}
      </h1>
      {page.strapline && <p className="mt-3 max-w-2xl text-xl">{page.strapline}</p>}

      {/* The essentials, impossible to miss. */}
      <div className="mt-8 max-w-2xl rounded-2xl bg-accent-100 p-6 text-lg shadow-sm">
        <p className="font-bold">{site.mealTimes}</p>
        <p className="mt-1">
          {site.venue.name}, {site.venue.street}, {site.venue.town} {site.venue.postcode}
        </p>
        <p className="mt-3">
          Just turn up. You don&rsquo;t need to book, bring anything, or tell anyone you&rsquo;re
          coming.
        </p>
      </div>

      <div className="mt-10">
        <Markdown markdown={page.body} className="prose text-lg" />
      </div>

      {/* Honest scope: we're Sundays-only, so this section must always be
          current and easy to find. */}
      <section aria-labelledby="before-sunday" className="mt-12 max-w-2xl">
        <h2
          id="before-sunday"
          className="font-[family-name:var(--font-display)] text-2xl font-semibold text-brand-800"
        >
          Need help before Sunday?
        </h2>
        <p className="mt-3 text-lg">
          We&rsquo;re only open Sunday evenings — but you don&rsquo;t have to wait for us. These
          people are good, and they&rsquo;re open now:
        </p>
        <ul className="mt-5 space-y-4">
          {site.urgentHelp.map((service) => (
            <li key={service.name} className="rounded-xl border-2 border-brand-100 bg-white p-5">
              <p className="text-lg font-bold text-brand-900">{service.name}</p>
              <p className="mt-1">{service.what}</p>
              <p className="mt-1 text-ink/80">{service.where}</p>
              <p className="mt-2">
                <a
                  href={service.phoneHref}
                  className="text-lg font-bold text-brand-800 underline underline-offset-4"
                >
                  {service.phone}
                </a>
                {" · "}
                <a
                  href={service.url}
                  className="font-semibold text-brand-800 underline underline-offset-4"
                >
                  website
                </a>
              </p>
            </li>
          ))}
          <li className="rounded-xl bg-brand-900 p-5 text-white">
            <p className="text-lg font-bold">In danger right now?</p>
            <p className="mt-1">
              If you or someone else is in immediate danger, call{" "}
              <a href="tel:999" className="font-bold text-accent-300 underline underline-offset-4">
                999
              </a>
              . Always.
            </p>
          </li>
        </ul>
      </section>
    </div>
  );
}
