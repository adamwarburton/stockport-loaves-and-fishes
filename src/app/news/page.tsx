import type { Metadata } from "next";
import { PostCard } from "@/components/PostCard";
import { PageHeader } from "@/components/PageHeader";
import { IconMegaphone } from "@/components/Icons";
import { getVisiblePosts } from "@/lib/content";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "News",
  description:
    "What's happening at Stockport Loaves and Fishes — what we need this week, " +
    "thank-yous, and the odd story from the kitchen.",
};

export default function NewsPage() {
  const posts = getVisiblePosts();

  return (
    <>
      <PageHeader
        eyebrow="From the kitchen"
        icon={<IconMegaphone className="size-4" />}
        title="News"
        strapline="What we need this week, thank-yous, and the odd story from the kitchen."
      />
      <div className="mx-auto max-w-5xl px-4 pb-14">
        {posts.length === 0 ? (
          <p className="text-lg">
            Nothing here yet — the pans are being warmed up. Check back soon.
          </p>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
        )}
      </div>
    </>
  );
}
