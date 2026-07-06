import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-16">
      <h1 className="font-[family-name:var(--font-display)] text-4xl font-semibold text-brand-900">
        That page has wandered off.
      </h1>
      <p className="mt-4 max-w-xl text-lg">
        No harm done. The kettle&rsquo;s still on — here&rsquo;s where you probably wanted to be:
      </p>
      <ul className="mt-6 space-y-2 text-lg">
        <li>
          <Link href="/help" className="font-bold text-brand-800 underline underline-offset-4">
            I need help
          </Link>
        </li>
        <li>
          <Link
            href="/how-to-help"
            className="font-semibold text-brand-800 underline underline-offset-4"
          >
            I want to help
          </Link>
        </li>
        <li>
          <Link href="/" className="font-semibold text-brand-800 underline underline-offset-4">
            Back to the front page
          </Link>
        </li>
      </ul>
    </div>
  );
}
