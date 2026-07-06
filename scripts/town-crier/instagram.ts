import type { Post } from "../../src/lib/content";
import { instagramCaption } from "./captions";
import type { GraphClient } from "./graph";

const POLL_INTERVAL_MS = 5_000;
const POLL_TIMEOUT_MS = 120_000;

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Instagram publishing is two-step: create a media container (Instagram
 * fetches the image from our site, server-side — hence the liveness gate in
 * index.ts), poll until it's processed, then publish it.
 * Returns the published media id for the ledger.
 */
export async function postToInstagram(
  graph: GraphClient,
  igUserId: string,
  post: Post,
  postUrl: string,
  imageUrl: string,
  sleep: (ms: number) => Promise<unknown> = wait,
): Promise<string> {
  const container = await graph.post(`/${igUserId}/media`, {
    image_url: imageUrl,
    caption: instagramCaption(post, postUrl),
  });
  const creationId = String(container.id);

  const deadline = Date.now() + POLL_TIMEOUT_MS;
  for (;;) {
    const status = await graph.get(`/${creationId}`, { fields: "status_code" });
    const code = String(status.status_code);
    if (code === "FINISHED") break;
    if (code === "ERROR" || code === "EXPIRED") {
      throw new Error(
        `Instagram couldn't process the image for "${post.slug}" (container status: ${code}). ` +
          `Usual cause: the image isn't a JPEG, or Instagram couldn't fetch it from the website.`,
      );
    }
    if (Date.now() >= deadline) {
      throw new Error(
        `Instagram took more than ${POLL_TIMEOUT_MS / 1000}s to process the image for "${post.slug}" — ` +
          `gave up for now. The hourly run will try again automatically.`,
      );
    }
    await sleep(POLL_INTERVAL_MS);
  }

  const published = await graph.post(`/${igUserId}/media_publish`, {
    creation_id: creationId,
  });
  return String(published.id);
}
