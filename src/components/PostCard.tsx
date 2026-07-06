import Link from "next/link";
import { formatDate, type Post } from "@/lib/content";

export function PostCard({ post }: { post: Post }) {
  return (
    <article className="flex flex-col overflow-hidden rounded-xl border-2 border-brand-100 bg-white shadow-sm">
      {post.image && (
        // Plain <img>: post images are small local files and content pages
        // ship zero client JS — next/image buys nothing here.
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={post.image}
          alt={post.imageAlt ?? ""}
          width={1200}
          height={630}
          loading="lazy"
          className="aspect-[1200/630] w-full object-cover"
        />
      )}
      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-[family-name:var(--font-display)] text-xl font-semibold leading-snug">
          <Link
            href={`/news/${post.slug}`}
            className="text-brand-800 hover:underline underline-offset-4"
          >
            {post.title}
          </Link>
        </h3>
        <p className="mt-1 text-sm text-ink/70">
          <time dateTime={post.publishAt.toISOString()}>{formatDate(post.publishAt)}</time>
        </p>
        {post.excerpt && <p className="mt-3 text-base">{post.excerpt}</p>}
      </div>
    </article>
  );
}
