import Link from "next/link";
import { site } from "@/lib/site";

export function Footer() {
  return (
    <footer className="mt-16 bg-brand-900 text-brand-100">
      <div className="mx-auto grid max-w-5xl gap-8 px-4 py-10 sm:grid-cols-3">
        <div>
          <p className="font-[family-name:var(--font-display)] text-lg font-semibold text-white">
            {site.name}
          </p>
          <p className="mt-2 text-sm">Hot food, warm welcome, no questions asked.</p>
          <p className="mt-2 text-sm">Registered charity no. {site.charityNumber}</p>
        </div>
        <div>
          <p className="font-semibold text-white">Sunday dinner</p>
          <p className="mt-2 text-sm">
            {site.mealTimes}
            <br />
            {site.venue.name}
            <br />
            {site.venue.street}, {site.venue.town} {site.venue.postcode}
          </p>
        </div>
        <div>
          <p className="font-semibold text-white">Get in touch</p>
          <ul className="mt-2 space-y-1 text-sm">
            <li>
              <a
                className="underline underline-offset-4 hover:text-white"
                href={`mailto:${site.email}`}
              >
                {site.email}
              </a>
            </li>
            <li>
              <a className="underline underline-offset-4 hover:text-white" href={site.phoneHref}>
                {site.phone}
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
    </footer>
  );
}
