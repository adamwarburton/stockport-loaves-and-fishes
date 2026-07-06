import type { Metadata } from "next";
import { PostCard } from "@/components/PostCard";
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
    <div className="mx-auto max-w-5xl px-4 py-10">
      <h1 className="font-[family-name:var(--font-display)] text-4xl font-semibold text-brand-900 sm:text-5xl">
        News
      </h1>
      <p className="mt-3 max-w-2xl text-xl">
        What we need this week, thank-yous, and the odd story from the kitchen.
      </p>
      {posts.length === 0 ? (
        <p className="mt-8 text-lg">
          Nothing here yet — the pans are being warmed up. Check back soon.
        </p>
      ) : (
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      )}
    </div>
  );
}
