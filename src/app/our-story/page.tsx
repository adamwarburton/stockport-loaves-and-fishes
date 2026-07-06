import type { Metadata } from "next";
import { Markdown } from "@/components/Markdown";
import { getPage } from "@/lib/content";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Our story",
  description:
    "How a car boot full of hot food became a Sunday dinner for dozens of guests — " +
    "the story of Stockport Loaves and Fishes.",
};

export default async function OurStoryPage() {
  const page = getPage("our-story");

  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      <h1 className="font-[family-name:var(--font-display)] text-4xl font-semibold text-brand-900 sm:text-5xl">
        {page.title}
      </h1>
      {page.strapline && <p className="mt-3 max-w-2xl text-xl">{page.strapline}</p>}
      <div className="mt-8">
        <Markdown markdown={page.body} className="prose text-lg" />
      </div>
    </div>
  );
}
