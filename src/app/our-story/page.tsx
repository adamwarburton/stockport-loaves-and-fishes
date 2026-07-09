import type { Metadata } from "next";
import { Markdown } from "@/components/Markdown";
import { PageHeader } from "@/components/PageHeader";
import { Photo } from "@/components/Photo";
import { IconHeart } from "@/components/Icons";
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
    <>
      <PageHeader
        eyebrow="For over a decade"
        icon={<IconHeart className="size-4" />}
        title={page.title}
        strapline={page.strapline}
      />

      <div className="mx-auto max-w-3xl px-4 pb-14">
        {/* Lead visual — swap for a real photo in src/lib/images.ts. */}
        <Photo name="story" className="aspect-[16/10] w-full shadow-md" />
        <div className="mt-10">
          <Markdown markdown={page.body} className="prose text-lg" />
        </div>
      </div>
    </>
  );
}
