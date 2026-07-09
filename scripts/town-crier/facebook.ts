import type { Post } from "../../src/lib/content";
import { facebookFeedMessage, facebookPhotoCaption } from "./captions";
import type { GraphClient } from "./graph";

/**
 * Publishing to a Page needs a *Page* access token, not the user / System
 * User token we hold — posting to `/{page}/feed` with a user token is rejected
 * as if we were trying to publish to someone's personal timeline.
 *
 * So we exchange our token for a page one: `GET /{page-id}?fields=access_token`
 * returns a page token whose lifetime matches the token behind it. That's why
 * `META_ACCESS_TOKEN` must be the never-expiring System User token — a token
 * that never expires yields a page token that never expires. A short-lived
 * Graph API Explorer "User token" would work for an hour, then die.
 */
export async function getPageAccessToken(graph: GraphClient, pageId: string): Promise<string> {
  const result = await graph.get(`/${pageId}`, { fields: "access_token" });
  const pageToken = result.access_token;
  if (typeof pageToken !== "string" || pageToken.length === 0) {
    throw new Error(
      `Reached the Graph API, but couldn't get a Page access token for page ${pageId}. ` +
        `The account behind META_ACCESS_TOKEN must be an admin of the Page with the ` +
        `pages_manage_posts and pages_read_engagement permissions. See docs/RUNBOOK.md §10.`,
    );
  }
  return pageToken;
}

/**
 * Post to the Facebook Page. With an image → a photo post; without → a link
 * post (Facebook renders the page preview from the link itself).
 * `graph` must be authorised with the Page token (see getPageAccessToken).
 * Returns the Facebook object id for the ledger.
 */
export async function postToFacebook(
  graph: GraphClient,
  pageId: string,
  post: Post,
  postUrl: string,
  imageUrl: string | undefined,
): Promise<string> {
  if (imageUrl) {
    const result = await graph.post(`/${pageId}/photos`, {
      url: imageUrl,
      caption: facebookPhotoCaption(post, postUrl),
    });
    return String(result.post_id ?? result.id);
  }
  const result = await graph.post(`/${pageId}/feed`, {
    message: facebookFeedMessage(post),
    link: postUrl,
  });
  return String(result.id);
}
