/**
 * The cross-post ledger: .social/state.json, committed back to the repo.
 * A post can never go out twice because a channel is only attempted when the
 * ledger has no entry for it — and the ledger is written to disk immediately
 * after every successful call, so even a crash mid-run can't cause repeats.
 */
import fs from "node:fs";
import path from "node:path";
import { CHANNELS, type Channel, type Post } from "../../src/lib/content";

export interface PostedResult {
  id: string;
  postedAt: string;
}

export interface SkippedResult {
  skipped: "no-image";
  notedAt: string;
}

export type ChannelResult = PostedResult | SkippedResult;

export interface State {
  posts: Record<string, Partial<Record<Channel, ChannelResult>>>;
}

export const STATE_FILE = path.join(process.cwd(), ".social", "state.json");

export function loadState(file: string = STATE_FILE): State {
  if (!fs.existsSync(file)) return { posts: {} };
  const parsed = JSON.parse(fs.readFileSync(file, "utf8")) as State;
  if (!parsed || typeof parsed.posts !== "object" || parsed.posts === null) {
    throw new Error(
      `The ledger file ${file} doesn't look right — it should contain {"posts": {...}}. ` +
        `It may have been hand-edited. Restore it from git history rather than guessing.`,
    );
  }
  return parsed;
}

export function saveState(state: State, file: string = STATE_FILE): void {
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, `${JSON.stringify(state, null, 2)}\n`);
}

/**
 * Is this channel finished for this post? A successful post is always done.
 * A "skipped: no-image" marker only counts as done while the post *still*
 * has no image — add a photo later and Instagram gets picked back up.
 */
export function channelIsDone(post: Post, result: ChannelResult | undefined): boolean {
  if (!result) return false;
  if ("id" in result) return true;
  return result.skipped === "no-image" && !post.image;
}

export interface WorkItem {
  post: Post;
  channels: Channel[];
}

/**
 * Diff the eligible posts against the ledger → what still needs doing.
 *
 * `enabledChannels` is the set of channels that are actually switched on right
 * now (e.g. Facebook only, until Instagram is configured). A post's request
 * for a channel that isn't enabled is simply ignored — not an error, and not
 * recorded, so it posts automatically if that channel is turned on later.
 */
export function planWork(
  posts: Post[],
  state: State,
  enabledChannels: readonly Channel[] = CHANNELS,
): WorkItem[] {
  const work: WorkItem[] = [];
  for (const post of posts) {
    const done = state.posts[post.slug] ?? {};
    const channels = post.social.channels.filter(
      (channel) => enabledChannels.includes(channel) && !channelIsDone(post, done[channel]),
    );
    if (channels.length > 0) work.push({ post, channels });
  }
  return work;
}

export function recordResult(
  state: State,
  slug: string,
  channel: Channel,
  result: ChannelResult,
): void {
  state.posts[slug] = { ...state.posts[slug], [channel]: result };
}
