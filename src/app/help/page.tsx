import type { Metadata } from "next";
import { Markdown } from "@/components/Markdown";
import { PageHeader } from "@/components/PageHeader";
import { Photo } from "@/components/Photo";
import { IconClock, IconHelpingHand, IconPhone, IconPin } from "@/components/Icons";
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
    <>
      <PageHeader
        eyebrow="You're welcome here"
        icon={<IconHelpingHand className="size-4" />}
        title={page.title}
        strapline={page.strapline}
      />

      <div className="mx-auto max-w-5xl px-4 pb-14">
        {/* The essentials, impossible to miss — paired with the warm artwork. */}
        <div className="grid items-stretch gap-6 lg:grid-cols-[1.3fr_1fr]">
          <div className="rounded-3xl bg-accent-100 p-6 text-lg shadow-sm ring-1 ring-accent-200 sm:p-8">
            <p className="flex items-center gap-3 text-xl font-bold text-brand-900">
              <IconClock className="size-6 shrink-0 text-brand-700" />
              {site.mealTimes}
            </p>
            <p className="mt-3 flex items-start gap-3">
              <IconPin className="mt-1 size-6 shrink-0 text-brand-700" />
              <span>
                {site.venue.name}, {site.venue.street}, {site.venue.town} {site.venue.postcode}
              </span>
            </p>
            <p className="mt-5 border-t border-accent-200 pt-5 text-lg font-medium text-ink">
              Just turn up. You don&rsquo;t need to book, bring anything, or tell anyone
              you&rsquo;re coming.
            </p>
          </div>
          {/* Swap this illustration for a real photo in src/lib/images.ts. */}
          <Photo name="welcome" className="min-h-56 lg:min-h-0" />
        </div>

        <div className="mt-10 max-w-2xl">
          <Markdown markdown={page.body} className="prose text-lg" />
        </div>

        {/* Honest scope: we're Sundays-only, so this section must always be
            current and easy to find. */}
        <section aria-labelledby="before-sunday" className="mt-14 max-w-2xl">
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
              <li
                key={service.name}
                className="rounded-2xl border-2 border-brand-100 bg-white p-5 shadow-sm"
              >
                <p className="text-lg font-bold text-brand-900">{service.name}</p>
                <p className="mt-1">{service.what}</p>
                <p className="mt-1 flex items-start gap-2 text-ink/80">
                  <IconPin className="mt-0.5 size-5 shrink-0 text-brand-600" />
                  {service.where}
                </p>
                <p className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1">
                  <a
                    href={service.phoneHref}
                    className="inline-flex items-center gap-1.5 text-lg font-bold text-brand-800 underline underline-offset-4"
                  >
                    <IconPhone className="size-5" />
                    {service.phone}
                  </a>
                  <a
                    href={service.url}
                    className="font-semibold text-brand-800 underline underline-offset-4"
                  >
                    website
                  </a>
                </p>
              </li>
            ))}
            <li className="rounded-2xl bg-brand-900 p-5 text-white shadow-sm">
              <p className="text-lg font-bold">In danger right now?</p>
              <p className="mt-1">
                If you or someone else is in immediate danger, call{" "}
                <a
                  href="tel:999"
                  className="font-bold text-accent-300 underline underline-offset-4"
                >
                  999
                </a>
                . Always.
              </p>
            </li>
          </ul>
        </section>
      </div>
    </>
  );
}
