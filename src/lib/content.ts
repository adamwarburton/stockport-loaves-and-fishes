/**
 * The one true reader of everything in content/. The website build and the
 * town crier (the social cross-poster) both load posts through this file, so
 * a post that's invalid fails everywhere at once, loudly, in plain English —
 * rather than looking fine on the site and silently breaking social.
 */
import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { z } from "zod";
import { remark } from "remark";
import remarkGfm from "remark-gfm";
import remarkHtml from "remark-html";

export const CATEGORIES = [
  "weekly-needs",
  "thank-you",
  "volunteer-voices",
  "story",
  "seasonal",
  "update",
] as const;

export const CHANNELS = ["facebook", "instagram"] as const;

export type Category = (typeof CATEGORIES)[number];
export type Channel = (typeof CHANNELS)[number];

const postFrontmatterSchema = z
  .object({
    title: z.string().min(1),
    publishAt: z.coerce.date(),
    status: z.enum(["draft", "published"]),
    image: z.string().startsWith("/").optional(),
    imageAlt: z.string().min(1).optional(),
    categories: z.array(z.enum(CATEGORIES)).default([]),
    social: z
      .object({
        text: z.string().optional(),
        // Leaving channels out means "post everywhere". An explicit empty
        // list [] means "website only" — the crier skips it entirely.
        channels: z.array(z.enum(CHANNELS)).default([...CHANNELS]),
      })
      .default({ channels: [...CHANNELS] }),
  })
  .superRefine((data, ctx) => {
    if (data.image && !data.imageAlt) {
      ctx.addIssue({
        code: "custom",
        path: ["imageAlt"],
        message:
          "this post has a photo but no photo description (imageAlt). " +
          "Add a short sentence describing the photo for people who can't see it.",
      });
    }
  });

const pageFrontmatterSchema = z.object({
  title: z.string().min(1),
  strapline: z.string().optional(),
});

export interface Post {
  /** URL slug: the filename minus its date prefix and .md */
  slug: string;
  /** Filename inside content/posts, e.g. 2026-07-05-what-we-need.md */
  file: string;
  title: string;
  publishAt: Date;
  status: "draft" | "published";
  image?: string;
  imageAlt?: string;
  categories: Category[];
  social: { text?: string; channels: Channel[] };
  /** Raw markdown body — render with markdownToHtml(). */
  body: string;
  /** First paragraph as plain text, for cards and meta descriptions. */
  excerpt: string;
}

export interface Page {
  title: string;
  strapline?: string;
  body: string;
}

const POSTS_DIR = path.join(process.cwd(), "content", "posts");
const PAGES_DIR = path.join(process.cwd(), "content", "pages");
const SETTINGS_DIR = path.join(process.cwd(), "content", "settings");

const POST_FILENAME = /^(\d{4}-\d{2}-\d{2})-([a-z0-9]+(?:-[a-z0-9]+)*)\.md$/;

/**
 * Plain-English hints per field, so a volunteer reading a failed build knows
 * what to fix without learning what "zod" is.
 */
const FIELD_HINTS: Record<string, string> = {
  title: 'every post needs a title, e.g. title: "What we need this week".',
  publishAt:
    "every post needs a go-live date and time (publishAt), written like " +
    "2026-07-09T10:00:00Z. The post stays hidden until that moment passes.",
  status: 'status must be either "draft" (hidden everywhere) or "published" (live).',
  image:
    "image must be a path starting with /, e.g. /images/posts/coats.jpg — " +
    "photos uploaded through the CMS get this automatically.",
  imageAlt: "imageAlt is a short sentence describing the photo for people who can't see it.",
  categories: `categories can only contain: ${CATEGORIES.join(", ")}.`,
  social: `social.channels can only contain: ${CHANNELS.join(
    ", ",
  )} (or be an empty list [] for a website-only post).`,
};

function friendlyError(file: string, issues: z.core.$ZodIssue[]): Error {
  const lines = issues.map((issue) => {
    const field = String(issue.path[0] ?? "frontmatter");
    const hint = FIELD_HINTS[field];
    return `  • Problem with "${issue.path.join(".") || "frontmatter"}": ${
      issue.message
    }${hint ? `\n    Fix: ${hint}` : ""}`;
  });
  return new Error(
    `The post file "${file}" can't be used yet:\n${lines.join("\n")}\n` +
      `Nothing is broken on the live site — fix the file and save again.`,
  );
}

/**
 * Parse one post from its filename and raw file contents. Pure — this is the
 * bit the unit tests exercise directly.
 */
export function parsePost(file: string, raw: string): Post {
  const nameMatch = POST_FILENAME.exec(file);
  if (!nameMatch) {
    throw new Error(
      `The post file "${file}" has the wrong sort of name. Post files must ` +
        `look like 2026-07-09-my-post.md — the date it was written, a dash, ` +
        `then a short name in lowercase letters, numbers and dashes.`,
    );
  }
  const slug = nameMatch[2];

  const { data, content } = matter(raw);
  const parsed = postFrontmatterSchema.safeParse(data);
  if (!parsed.success) {
    throw friendlyError(file, parsed.error.issues);
  }

  return {
    slug,
    file,
    ...parsed.data,
    body: content.trim(),
    excerpt: makeExcerpt(content),
  };
}

/** Every post in content/posts, drafts and scheduled ones included, newest first. */
export function getAllPosts(): Post[] {
  const files = fs
    .readdirSync(POSTS_DIR)
    .filter((f) => f.endsWith(".md"))
    .sort();
  const posts = files.map((file) =>
    parsePost(file, fs.readFileSync(path.join(POSTS_DIR, file), "utf8")),
  );
  return posts.sort((a, b) => b.publishAt.getTime() - a.publishAt.getTime());
}

/** Should this post appear on the site (and be eligible for social) right now? */
export function isVisible(post: Post, now: Date = new Date()): boolean {
  return post.status === "published" && post.publishAt.getTime() <= now.getTime();
}

/** Posts the public can see: published, go-live time reached, newest first. */
export function getVisiblePosts(now: Date = new Date()): Post[] {
  return getAllPosts().filter((post) => isVisible(post, now));
}

export function getVisiblePost(slug: string, now: Date = new Date()): Post | undefined {
  return getVisiblePosts(now).find((post) => post.slug === slug);
}

/** Editable copy for a static page, e.g. getPage("our-story"). */
export function getPage(name: string): Page {
  const file = path.join(PAGES_DIR, `${name}.md`);
  const { data, content } = matter(fs.readFileSync(file, "utf8"));
  const parsed = pageFrontmatterSchema.safeParse(data);
  if (!parsed.success) {
    throw friendlyError(`content/pages/${name}.md`, parsed.error.issues);
  }
  return { ...parsed.data, body: content.trim() };
}

/** The live "what we need now" list from content/settings/needs.md. */
export function getNeeds(): Page {
  const file = path.join(SETTINGS_DIR, "needs.md");
  const { data, content } = matter(fs.readFileSync(file, "utf8"));
  const parsed = pageFrontmatterSchema.safeParse(data);
  if (!parsed.success) {
    throw friendlyError("content/settings/needs.md", parsed.error.issues);
  }
  return { ...parsed.data, body: content.trim() };
}

/**
 * Markdown → HTML. sanitize is off because content is trusted: it only gets
 * here via a commit to this repo (CMS or pull request), never from visitors.
 */
export async function markdownToHtml(markdown: string): Promise<string> {
  const result = await remark()
    .use(remarkGfm)
    .use(remarkHtml, { sanitize: false })
    .process(markdown);
  return String(result);
}

/**
 * Dates are stored in UTC and always *shown* in UK time (Europe/London), so
 * a post stamped 2026-07-09T18:00:00Z reads as 7pm in British Summer Time.
 */
export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat("en-GB", {
    timeZone: "Europe/London",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
}

function makeExcerpt(markdown: string, maxLength = 180): string {
  const firstBlock =
    markdown
      .trim()
      .split(/\n\s*\n/)
      .find((block) => !block.startsWith("#")) ?? "";
  const plain = firstBlock
    .replace(/!\[[^\]]*\]\([^)]*\)/g, "") // images
    .replace(/\[([^\]]*)\]\([^)]*\)/g, "$1") // links → their text
    .replace(/[*_`>#]/g, "")
    .replace(/\s+/g, " ")
    .trim();
  if (plain.length <= maxLength) return plain;
  return `${plain.slice(0, maxLength).replace(/\s+\S*$/, "")}…`;
}
