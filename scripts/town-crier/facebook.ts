import type { Post } from "../../src/lib/content";
import { facebookFeedMessage, facebookPhotoCaption } from "./captions";
import type { GraphClient } from "./graph";

/**
 * Post to the Facebook Page. With an image → a photo post; without → a link
 * post (Facebook renders the page preview from the link itself).
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
