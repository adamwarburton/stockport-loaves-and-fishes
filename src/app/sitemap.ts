import type { MetadataRoute } from "next";
import { getVisiblePosts } from "@/lib/content";
import { postUrl, site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages: MetadataRoute.Sitemap = [
    { url: site.url, priority: 1 },
    { url: `${site.url}/help`, priority: 1 },
    { url: `${site.url}/how-to-help`, priority: 0.8 },
    { url: `${site.url}/our-story`, priority: 0.6 },
    { url: `${site.url}/news`, priority: 0.6 },
    { url: `${site.url}/contact`, priority: 0.6 },
  ];

  const posts: MetadataRoute.Sitemap = getVisiblePosts().map((post) => ({
    url: postUrl(post.slug),
    lastModified: post.publishAt,
    priority: 0.5,
  }));

  return [...pages, ...posts];
}
