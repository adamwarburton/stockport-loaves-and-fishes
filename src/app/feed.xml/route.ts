import { getVisiblePosts, markdownToHtml } from "@/lib/content";
import { postUrl, site } from "@/lib/site";

/**
 * RSS 2.0 with full post bodies and absolute URLs. This feed is the forever
 * fallback: if the town crier ever retires, a zero-code tool (Buffer, Zapier,
 * etc.) can cross-post straight from here.
 */
export const revalidate = 3600;

function escapeXml(text: string): string {
  return text
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

/** Relative src/href → absolute, so images work inside feed readers. */
function absolutise(html: string): string {
  return html.replaceAll('src="/', `src="${site.url}/`).replaceAll('href="/', `href="${site.url}/`);
}

export async function GET(): Promise<Response> {
  const posts = getVisiblePosts();

  const items = await Promise.all(
    posts.map(async (post) => {
      const html = absolutise(await markdownToHtml(post.body));
      const image = post.image
        ? `\n      <enclosure url="${site.url}${post.image}" type="image/${
            post.image.endsWith(".svg") ? "svg+xml" : post.image.endsWith(".png") ? "png" : "jpeg"
          }" length="0"/>`
        : "";
      return `    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${postUrl(post.slug)}</link>
      <guid isPermaLink="true">${postUrl(post.slug)}</guid>
      <pubDate>${post.publishAt.toUTCString()}</pubDate>
      <description>${escapeXml(post.excerpt)}</description>
      <content:encoded><![CDATA[${html}]]></content:encoded>${image}
    </item>`;
    }),
  );

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:content="http://purl.org/rss/1.0/modules/content/" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(site.name)}</title>
    <link>${site.url}</link>
    <atom:link href="${site.url}/feed.xml" rel="self" type="application/rss+xml"/>
    <description>${escapeXml(site.description)}</description>
    <language>en-GB</language>
${items.join("\n")}
  </channel>
</rss>
`;

  return new Response(xml, {
    headers: { "Content-Type": "application/rss+xml; charset=utf-8" },
  });
}
