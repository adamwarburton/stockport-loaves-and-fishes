import { markdownToHtml } from "@/lib/content";

/**
 * Server-renders trusted markdown from content/ as HTML. Trusted means: it
 * only arrives via a commit to this repo — never from site visitors.
 */
export async function Markdown({
  markdown,
  className = "prose",
}: {
  markdown: string;
  className?: string;
}) {
  const html = await markdownToHtml(markdown);
  return <div className={className} dangerouslySetInnerHTML={{ __html: html }} />;
}
