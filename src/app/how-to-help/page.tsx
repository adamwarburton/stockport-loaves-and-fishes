import type { Metadata } from "next";
import { Markdown } from "@/components/Markdown";
import { getNeeds, getPage } from "@/lib/content";
import { site } from "@/lib/site";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "How to help",
  description:
    "Give a fiver, feed a neighbour. Donate, drop off coats and tins, volunteer on a Sunday, " +
    "or just spread the word — every bit turns into Sunday dinner.",
};

export default async function HowToHelpPage() {
  const page = getPage("how-to-help");
  const needs = getNeeds();

  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      <h1 className="font-[family-name:var(--font-display)] text-4xl font-semibold text-brand-900 sm:text-5xl">
        {page.title}
      </h1>
      {page.strapline && <p className="mt-3 max-w-2xl text-xl">{page.strapline}</p>}

      {/* Give money — radical transparency block. */}
      <section aria-labelledby="give" className="mt-10 max-w-2xl scroll-mt-24" id="give">
        <h2
          id="give-heading"
          className="font-[family-name:var(--font-display)] text-2xl font-semibold text-brand-800"
        >
          Give money
        </h2>
        <div className="mt-4 rounded-2xl border-2 border-brand-100 bg-white p-6">
          <p className="text-lg">
            We run on roughly £15,000 a year. That&rsquo;s not a typo. That&rsquo;s the whole thing
            — fifty-odd dinners a week, coats, sleeping bags, tents and food parcels, all of it.
            Nobody here is paid, so your money buys food and kit, not offices.
          </p>
          <p className="mt-4 text-lg">Give a fiver, feed a neighbour.</p>
          {/* PLACEHOLDER: the charity hasn't chosen a giving platform yet
              (logged in docs/FACTS_TO_CONFIRM.md). Do not wire up payments
              here — it will be a link out to an external platform. */}
          <p className="mt-5">
            <span
              className="inline-block cursor-not-allowed rounded-full bg-brand-100 px-6 py-3 font-bold text-brand-800"
              aria-disabled="true"
            >
              Donate online — coming soon
            </span>
          </p>
          <p className="mt-3 text-base text-ink/80">
            We&rsquo;re still choosing the best way to take online donations without losing a slice
            to fees. Until then,{" "}
            <a
              href={`mailto:${site.email}?subject=I'd like to donate`}
              className="font-semibold text-brand-800 underline underline-offset-4"
            >
              email us
            </a>{" "}
            and we&rsquo;ll sort it the old-fashioned way.
          </p>
        </div>
      </section>

      {/* Give goods — the live list, edited by volunteers via the CMS. */}
      <section aria-labelledby="goods-heading" className="mt-12 max-w-2xl scroll-mt-24" id="goods">
        <h2
          id="goods-heading"
          className="font-[family-name:var(--font-display)] text-2xl font-semibold text-brand-800"
        >
          Give things
        </h2>
        <div className="mt-4 rounded-2xl bg-accent-100 p-6 shadow-sm">
          <h3 className="text-lg font-bold">{needs.title}</h3>
          <Markdown markdown={needs.body} className="prose mt-3 text-lg" />
        </div>
        <p className="mt-4 text-lg">
          Bring donations to {site.venue.name}, {site.venue.street}, {site.venue.postcode} on a
          Sunday between 5:00 and 6:30pm — a volunteer will take them off your hands and say thank
          you at least twice. Please only bring things that are clean, dry and ready to hand
          straight to someone.
        </p>
      </section>

      <section className="mt-12 max-w-2xl scroll-mt-24" id="volunteer">
        <Markdown markdown={page.body} className="prose text-lg" />
      </section>
    </div>
  );
}
