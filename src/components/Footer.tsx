import Link from "next/link";
import {
  IconBowl,
  IconClock,
  IconFacebook,
  IconMail,
  IconPhone,
  IconPin,
} from "@/components/Icons";
import { WaveTop } from "@/components/Decor";
import { site } from "@/lib/site";

export function Footer() {
  return (
    <footer className="mt-20 text-brand-100">
      {/* Curved lip so the footer rises out of the page, not a hard rectangle. */}
      <WaveTop fill="text-brand-950" />
      <div className="bg-brand-950 texture-dots-light">
        <div className="mx-auto grid max-w-5xl gap-8 px-4 pb-12 pt-4 sm:grid-cols-3">
          <div>
            <p className="flex items-center gap-2.5 font-[family-name:var(--font-display)] text-lg font-semibold text-white">
              <span className="flex size-8 items-center justify-center rounded-full bg-accent-300 text-brand-900">
                <IconBowl className="size-4.5" />
              </span>
              {site.name}
            </p>
            <p className="mt-3 text-sm">Hot food, warm welcome, no questions asked.</p>
            <p className="mt-3 text-sm text-brand-200">
              Registered charity no. {site.charityNumber}
            </p>
          </div>
          <div>
            <p className="font-semibold text-white">Sunday dinner</p>
            <p className="mt-3 flex items-start gap-2 text-sm">
              <IconClock className="mt-0.5 size-4.5 shrink-0 text-accent-300" />
              {site.mealTimes}
            </p>
            <p className="mt-2 flex items-start gap-2 text-sm">
              <IconPin className="mt-0.5 size-4.5 shrink-0 text-accent-300" />
              <span>
                {site.venue.name}
                <br />
                {site.venue.street}, {site.venue.town} {site.venue.postcode}
              </span>
            </p>
          </div>
          <div>
            <p className="font-semibold text-white">Get in touch</p>
            <ul className="mt-3 space-y-2 text-sm">
              <li>
                <a
                  className="flex items-center gap-2 underline-offset-4 hover:text-white hover:underline"
                  href={`mailto:${site.email}`}
                >
                  <IconMail className="size-4.5 shrink-0 text-accent-300" />
                  {site.email}
                </a>
              </li>
              <li>
                <a
                  className="flex items-center gap-2 underline-offset-4 hover:text-white hover:underline"
                  href={site.phoneHref}
                >
                  <IconPhone className="size-4.5 shrink-0 text-accent-300" />
                  {site.phone}
                </a>
              </li>
              <li>
                <a
                  className="flex items-center gap-2 underline-offset-4 hover:text-white hover:underline"
                  href={site.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <IconFacebook className="size-4.5 shrink-0 text-accent-300" />
                  Facebook
                </a>
              </li>
              <li>
                <Link className="underline underline-offset-4 hover:text-white" href="/help">
                  I need help
                </Link>
              </li>
              <li>
                <a className="underline underline-offset-4 hover:text-white" href="/feed.xml">
                  News feed (RSS)
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-brand-800">
          <p className="mx-auto max-w-5xl px-4 py-5 text-center text-sm text-brand-200">
            Our faith is why we cook. It&rsquo;s not the price of admission.
          </p>
        </div>
      </div>
    </footer>
  );
}
