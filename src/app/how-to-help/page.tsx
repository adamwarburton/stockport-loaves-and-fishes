import type { Metadata } from "next";
import { Markdown } from "@/components/Markdown";
import { PageHeader } from "@/components/PageHeader";
import { Photo } from "@/components/Photo";
import { IconCoat, IconGive, IconHeart } from "@/components/Icons";
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
    <>
      <PageHeader
        eyebrow="Give a fiver, feed a neighbour"
        icon={<IconHeart className="size-4" />}
        title={page.title}
        strapline={page.strapline}
      />

      <div className="mx-auto max-w-5xl px-4 pb-14">
        {/* Give money — radical transparency block, paired with the big pan. */}
        <section aria-labelledby="give-heading" className="scroll-mt-24" id="give">
          <div className="grid items-center gap-6 lg:grid-cols-[1fr_0.8fr]">
            <div>
              <h2
                id="give-heading"
                className="flex items-center gap-2 font-[family-name:var(--font-display)] text-2xl font-semibold text-brand-800"
              >
                <IconGive className="size-7 text-brand-600" />
                Give money
              </h2>
              <div className="mt-4 rounded-2xl border-2 border-brand-100 bg-white p-6 shadow-sm">
                <p className="text-lg">
                  We run on roughly £15,000 a year. That&rsquo;s not a typo. That&rsquo;s the whole
                  thing — fifty-odd dinners a week, coats, sleeping bags, tents and food parcels,
                  all of it. Nobody here is paid, so your money buys food and kit, not offices.
                </p>
                <p className="mt-4 text-lg font-semibold text-brand-800">
                  Give a fiver, feed a neighbour.
                </p>
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
                  We&rsquo;re still choosing the best way to take online donations without losing a
                  slice to fees. Until then,{" "}
                  <a
                    href={`mailto:${site.email}?subject=I'd like to donate`}
                    className="font-semibold text-brand-800 underline underline-offset-4"
                  >
                    email us
                  </a>{" "}
                  and we&rsquo;ll sort it the old-fashioned way.
                </p>
              </div>
            </div>
            {/* Swap this illustration for a real photo in src/lib/images.ts. */}
            <Photo name="pan" className="hidden aspect-[4/3] lg:block" />
          </div>
        </section>

        {/* Give goods — the live list, edited by volunteers via the CMS. */}
        <section
          aria-labelledby="goods-heading"
          className="mt-14 max-w-2xl scroll-mt-24"
          id="goods"
        >
          <h2
            id="goods-heading"
            className="flex items-center gap-2 font-[family-name:var(--font-display)] text-2xl font-semibold text-brand-800"
          >
            <IconCoat className="size-7 text-brand-600" />
            Give things
          </h2>
          <div className="mt-4 rounded-2xl bg-accent-100 p-6 shadow-sm ring-1 ring-accent-200">
            <h3 className="text-lg font-bold text-brand-900">{needs.title}</h3>
            <Markdown markdown={needs.body} className="prose mt-3 text-lg" />
          </div>
          <p className="mt-4 text-lg">
            Bring donations to {site.venue.name}, {site.venue.street}, {site.venue.postcode} on a
            Sunday between 5:00 and 6:30pm — a volunteer will take them off your hands and say thank
            you at least twice. Please only bring things that are clean, dry and ready to hand
            straight to someone.
          </p>
        </section>

        <section className="mt-14 max-w-2xl scroll-mt-24" id="volunteer">
          <Markdown markdown={page.body} className="prose text-lg" />
        </section>
      </div>
    </>
  );
}
