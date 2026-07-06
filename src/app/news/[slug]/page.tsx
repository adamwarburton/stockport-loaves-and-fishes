import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Markdown } from "@/components/Markdown";
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
    <article className="mx-auto max-w-5xl px-4 py-10">
      <p>
        <Link href="/news" className="font-semibold text-brand-800 underline underline-offset-4">
          &larr; All news
        </Link>
      </p>
      <h1 className="mt-4 max-w-2xl font-[family-name:var(--font-display)] text-4xl font-semibold leading-tight text-brand-900">
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
          className="mt-6 aspect-[1200/630] w-full max-w-2xl rounded-2xl object-cover"
        />
      )}
      <div className="mt-8">
        <Markdown markdown={post.body} className="prose text-lg" />
      </div>
    </article>
  );
}
