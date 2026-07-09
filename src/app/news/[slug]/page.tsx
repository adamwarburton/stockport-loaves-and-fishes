import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Markdown } from "@/components/Markdown";
import { IconArrowRight, IconHelpingHand } from "@/components/Icons";
import { formatDate, getVisiblePost, getVisiblePosts } from "@/lib/content";

// Hourly revalidation + on-demand rendering of unknown slugs means a
// scheduled post starts serving within the hour it goes live — no rebuild.
export const revalidate = 3600;

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return getVisiblePosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const post = getVisiblePost(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      type: "article",
      title: post.title,
      description: post.excerpt,
      publishedTime: post.publishAt.toISOString(),
      images: post.image ? [{ url: post.image, alt: post.imageAlt }] : undefined,
    },
    twitter: post.image ? { card: "summary_large_image" } : undefined,
  };
}

export default async function PostPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  // Drafts and future-dated posts 404 — same as not existing, on purpose.
  const post = getVisiblePost(slug);
  if (!post) notFound();

  return (
    <article className="mx-auto max-w-3xl px-4 py-10">
      <p>
        <Link
          href="/news"
          className="inline-flex items-center gap-1 font-semibold text-brand-800 underline underline-offset-4"
        >
          <span aria-hidden="true">&larr;</span> All news
        </Link>
      </p>
      <h1 className="mt-4 font-[family-name:var(--font-display)] text-4xl font-semibold leading-tight text-brand-900">
        {post.title}
      </h1>
      <p className="mt-3 text-ink/70">
        <time dateTime={post.publishAt.toISOString()}>{formatDate(post.publishAt)}</time>
      </p>
      {post.image && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={post.image}
          alt={post.imageAlt ?? ""}
          width={1200}
          height={630}
          className="mt-6 aspect-[1200/630] w-full rounded-2xl object-cover shadow-md ring-1 ring-brand-100"
        />
      )}
      <div className="mt-8">
        <Markdown markdown={post.body} className="prose text-lg" />
      </div>

      {/* Warm off-ramp: never end a post on a full stop. */}
      <aside className="mt-12 rounded-2xl border-2 border-brand-100 bg-brand-50 p-6 text-center">
        <p className="font-[family-name:var(--font-display)] text-xl font-semibold text-brand-800">
          Everyone&rsquo;s welcome at the table.
        </p>
        <p className="mx-auto mt-2 max-w-md text-ink/80">
          Hot food, warm welcome, no questions asked — every Sunday evening in Stockport.
        </p>
        <div className="mt-5 flex flex-wrap justify-center gap-3">
          <Link
            href="/help"
            className="inline-flex items-center gap-2 rounded-full bg-accent-300 px-5 py-2.5 font-bold text-ink shadow-sm transition-colors hover:bg-accent-200"
          >
            <IconHelpingHand className="size-5" />I need help
          </Link>
          <Link
            href="/how-to-help"
            className="inline-flex items-center gap-2 rounded-full border-2 border-brand-200 px-5 py-2.5 font-bold text-brand-800 transition-colors hover:border-brand-600"
          >
            How to help
            <IconArrowRight className="size-5" />
          </Link>
        </div>
      </aside>
    </article>
  );
}
