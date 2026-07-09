import type { Metadata } from "next";
import Link from "next/link";
import { Markdown } from "@/components/Markdown";
import { PageHeader } from "@/components/PageHeader";
import { IconArrowRight, IconMail, IconPhone, IconPin } from "@/components/Icons";
import { getPage } from "@/lib/content";
import { site } from "@/lib/site";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Contact us",
  description:
    "Phone, email, or just come and find us on a Sunday evening at Stockport Baptist Church, " +
    "Thomson Street, Stockport SK3 9DR.",
};

export default async function ContactPage() {
  const page = getPage("contact");

  return (
    <>
      <PageHeader
        eyebrow="Say hello"
        icon={<IconMail className="size-4" />}
        title={page.title}
        strapline={page.strapline}
      />

      <div className="mx-auto max-w-5xl px-4 pb-14">
        <div className="max-w-2xl">
          <Markdown markdown={page.body} className="prose text-lg" />
        </div>

        <div className="mt-10 grid max-w-3xl gap-5 sm:grid-cols-2">
          <div className="rounded-2xl border-2 border-brand-100 bg-white p-6 shadow-sm">
            <h2 className="flex items-center gap-2 text-lg font-bold text-brand-900">
              <span className="flex size-9 items-center justify-center rounded-full bg-brand-50 text-brand-700">
                <IconPhone className="size-5" />
              </span>
              Phone or text
            </h2>
            <p className="mt-3">
              <a
                href={site.phoneHref}
                className="text-xl font-bold text-brand-800 underline underline-offset-4"
              >
                {site.phone}
              </a>
            </p>
            <p className="mt-2 text-ink/80">
              We&rsquo;re volunteers with day jobs — if we miss you, leave a message and we&rsquo;ll
              ring back.
            </p>
          </div>
          <div className="rounded-2xl border-2 border-brand-100 bg-white p-6 shadow-sm">
            <h2 className="flex items-center gap-2 text-lg font-bold text-brand-900">
              <span className="flex size-9 items-center justify-center rounded-full bg-brand-50 text-brand-700">
                <IconMail className="size-5" />
              </span>
              Email
            </h2>
            <p className="mt-3">
              <a
                href={`mailto:${site.email}`}
                className="break-all text-lg font-bold text-brand-800 underline underline-offset-4"
              >
                {site.email}
              </a>
            </p>
          </div>
          <div className="rounded-2xl border-2 border-brand-100 bg-white p-6 shadow-sm">
            <h2 className="flex items-center gap-2 text-lg font-bold text-brand-900">
              <span className="flex size-9 items-center justify-center rounded-full bg-brand-50 text-brand-700">
                <IconPin className="size-5" />
              </span>
              Find us on a Sunday
            </h2>
            <p className="mt-3">
              {site.venue.name}
              <br />
              {site.venue.street}, {site.venue.town} {site.venue.postcode}
              <br />
              {site.mealTimes}
            </p>
            <p className="mt-3">
              <Link
                href="/help"
                className="inline-flex items-center gap-1 font-semibold text-brand-800 underline underline-offset-4"
              >
                Need help? Here&rsquo;s what to expect
                <IconArrowRight className="size-4" />
              </Link>
            </p>
          </div>
          <div className="rounded-2xl border-2 border-brand-100 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-bold text-brand-900">Post</h2>
            {/* The registered (postal) address is unconfirmed — see
                docs/FACTS_TO_CONFIRM.md. Don't guess an address here. */}
            <p className="mt-3 text-ink/80">
              Sending something by post? Email us first and we&rsquo;ll give you the right address —
              we&rsquo;d hate for a cheque to go on its own little adventure.
            </p>
          </div>
        </div>

        {/* Facebook link goes here once the charity's new page exists —
            logged in docs/FACTS_TO_CONFIRM.md. The legacy pages are
            deliberately never linked. */}
      </div>
    </>
  );
}
