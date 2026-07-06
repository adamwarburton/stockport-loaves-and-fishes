/**
 * Caption building and fallbacks — the rules from CLAUDE.md §8:
 *  - social.text present → it leads, post URL follows.
 *  - social.text empty → Facebook falls back to the title (+ URL);
 *    Instagram falls back to the title + "link in bio" phrasing, with the
 *    URL as trailing text (Instagram captions can't hyperlink).
 */
import type { Post } from "../../src/lib/content";

function socialText(post: Post): string | undefined {
  const text = post.social.text?.trim();
  return text || undefined;
}

/** Caption for a Facebook *photo* post (URL must live in the caption). */
export function facebookPhotoCaption(post: Post, url: string): string {
  return `${socialText(post) ?? post.title}\n\n${url}`;
}

/** Message for a Facebook *link* post — the URL goes in the `link` param. */
export function facebookFeedMessage(post: Post): string {
  return socialText(post) ?? post.title;
}

export function instagramCaption(post: Post, url: string): string {
  const text = socialText(post);
  if (text) return `${text}\n\n${url}`;
  return `${post.title}\n\nMore on our website — link in bio, or type it in:\n${url}`;
}
