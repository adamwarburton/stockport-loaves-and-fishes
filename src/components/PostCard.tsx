import Link from "next/link";
import { IconArrowRight, IconBowl } from "@/components/Icons";
import { formatDate, type Category, type Post } from "@/lib/content";

// Human-friendly chip labels. Display concern, so it lives with the card.
const CATEGORY_LABELS: Record<Category, string> = {
  "weekly-needs": "This week's needs",
  "thank-you": "Thank you",
  "volunteer-voices": "Volunteer voices",
  story: "Story",
  seasonal: "Seasonal",
  update: "Update",
};

export function PostCard({ post }: { post: Post }) {
  const category = post.categories[0];

  return (
    <article className="card-lift group relative flex flex-col overflow-hidden rounded-2xl border-2 border-brand-100 bg-white shadow-sm hover:border-brand-200 hover:shadow-lg">
      <div className="relative aspect-[1200/630] w-full overflow-hidden">
        {post.image ? (
          // Plain <img>: post images are small local files and content pages
          // ship zero client JS — next/image buys nothing here.
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={post.image}
            alt={post.imageAlt ?? ""}
            width={1200}
            height={630}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          // No photo? A warm, on-brand header so the grid never looks broken.
          <div className="flex h-full w-full items-center justify-center bg-brand-800 texture-dots-light">
            <IconBowl className="size-12 text-accent-300/90" />
          </div>
        )}
        {category && (
          <span className="absolute left-3 top-3 rounded-full bg-paper/95 px-3 py-1 text-xs font-bold text-brand-800 shadow-sm">
            {CATEGORY_LABELS[category]}
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-[family-name:var(--font-display)] text-xl font-semibold leading-snug">
          <Link href={`/news/${post.slug}`} className="text-brand-800">
            {/* Stretched link: the whole card is clickable, keyboard-focusable once. */}
            <span className="absolute inset-0" aria-hidden="true" />
            {post.title}
          </Link>
        </h3>
        <p className="mt-1 text-sm text-ink/70">
          <time dateTime={post.publishAt.toISOString()}>{formatDate(post.publishAt)}</time>
        </p>
        {post.excerpt && <p className="mt-3 text-base">{post.excerpt}</p>}
        <span className="mt-4 inline-flex items-center gap-1 text-sm font-bold text-brand-700">
          Read more
          <IconArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
        </span>
      </div>
    </article>
  );
}
