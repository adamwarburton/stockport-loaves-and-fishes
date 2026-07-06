/**
 * The town crier: reads published posts from the website content and
 * announces new ones on Facebook and Instagram. Run by GitHub Actions on
 * every content push, hourly, or by hand — see .github/workflows/town-crier.yml.
 *
 * Safety properties (do not weaken):
 *  - DRY_RUN defaults to on: no Graph API writes, no state commits.
 *  - Idempotent: the ledger (.social/state.json) is checked before and
 *    written immediately after every channel call.
 *  - One channel failing never blocks other channels or posts.
 *  - Every failure ends up in a GitHub issue a non-developer could act on.
 */
import { getAllPosts, isVisible, type Channel, type Post } from "../../src/lib/content";
import { postUrl, site } from "../../src/lib/site";
import { facebookFeedMessage, facebookPhotoCaption, instagramCaption } from "./captions";
import { postToFacebook } from "./facebook";
import { createGraphClient, GraphError, type GraphClient } from "./graph";
import { upsertIssue } from "./github";
import { postToInstagram } from "./instagram";
import { loadState, planWork, recordResult, saveState, type WorkItem } from "./state";
import fs from "node:fs";

interface Failure {
  slug: string;
  channel: Channel;
  message: string;
}

const summaryLines: string[] = [];

function note(line: string): void {
  console.log(line);
  summaryLines.push(line);
}

function absoluteImageUrl(post: Post): string | undefined {
  return post.image ? `${site.url}${post.image}` : undefined;
}

/** The post (and its image) must be live before we point Meta at it. */
async function isLive(post: Post): Promise<boolean> {
  const urls = [postUrl(post.slug)];
  const image = absoluteImageUrl(post);
  if (image) urls.push(image);
  for (const url of urls) {
    const response = await fetch(url, { method: "GET" }).catch(() => undefined);
    if (!response || response.status !== 200) return false;
  }
  return true;
}

function describeDryRun(item: WorkItem, channel: Channel): string {
  const { post } = item;
  const url = postUrl(post.slug);
  const image = absoluteImageUrl(post);
  if (channel === "facebook") {
    return image
      ? `POST /{PAGE_ID}/photos\n      image:   ${image}\n      caption: ${JSON.stringify(facebookPhotoCaption(post, url))}`
      : `POST /{PAGE_ID}/feed\n      link:    ${url}\n      message: ${JSON.stringify(facebookFeedMessage(post))}`;
  }
  return `POST /{IG_USER_ID}/media → poll → /media_publish\n      image:   ${image}\n      caption: ${JSON.stringify(instagramCaption(post, url))}`;
}

async function main(): Promise<void> {
  const dryRun = (process.env.DRY_RUN ?? "true").toLowerCase() !== "false";
  const token = process.env.META_ACCESS_TOKEN;
  const pageId = process.env.META_PAGE_ID;
  const igUserId = process.env.META_IG_USER_ID;
  const ghToken = process.env.GITHUB_TOKEN;
  const repo = process.env.GITHUB_REPOSITORY;

  if (dryRun) {
    note("🏜 DRY RUN — nothing will be posted and the ledger will not change.");
    note('   (To go live, a human sets the repository variable DRY_RUN to "false".)');
  } else {
    const missing = [
      !token && "META_ACCESS_TOKEN",
      !pageId && "META_PAGE_ID",
      !igUserId && "META_IG_USER_ID",
    ].filter(Boolean);
    if (missing.length > 0) {
      console.error(
        `❌ DRY_RUN is off but these GitHub Actions secrets are missing: ${missing.join(", ")}.\n` +
          `   Nothing was posted. Add them (docs/META_SETUP.md, step 7) or set the\n` +
          `   repository variable DRY_RUN back to "true".`,
      );
      process.exit(1);
    }
  }

  // 1–2. Eligible posts, diffed against the ledger.
  const eligible = getAllPosts().filter(
    (post) => isVisible(post) && post.social.channels.length > 0,
  );
  const state = loadState();
  const plan = planWork(eligible, state);
  note(`📋 ${eligible.length} eligible post(s); ${plan.length} with work to do.`);

  // 4 (ordered before per-post work): token health — loud within the hour.
  let graph: GraphClient | undefined;
  if (token) {
    graph = createGraphClient(token);
    try {
      await graph.get("/me");
      note("🔑 Token health check: OK.");
    } catch (error) {
      if (error instanceof GraphError && error.isAuthError) {
        console.error(`❌ Token health check failed: ${error.message}`);
        if (!dryRun && ghToken && repo) {
          await upsertIssue({
            repo,
            token: ghToken,
            title: "⚠️ Social posting is broken — token needs attention",
            body:
              `The town crier can't talk to Facebook/Instagram any more — the access token ` +
              `was rejected.\n\n**Nothing is wrong with the website.** Posts simply aren't ` +
              `being shared to social media until this is fixed.\n\n**How to fix it:** follow ` +
              `"Fixing a dead token" in [docs/RUNBOOK.md](../blob/main/docs/RUNBOOK.md) — ` +
              `it takes about ten minutes and needs the Meta Business Manager login.\n\n` +
              `Error (sanitised): ${error.message}`,
            label: "token-needs-attention",
          });
        }
        process.exit(1);
      }
      throw error;
    }
  } else {
    note("🔑 No META_ACCESS_TOKEN configured — skipping token health check (fine in dry run).");
  }

  // 3 + 5–7. Per post, per channel; failures collected, never cascading.
  const failures: Failure[] = [];
  let posted = 0;
  let skipped = 0;
  let deferred = 0;

  for (const item of plan) {
    const { post } = item;
    if (!(await isLive(post))) {
      // Not deployed yet (Vercel still building). The hourly cron retries.
      deferred += 1;
      note(`⏳ ${post.slug}: not live on the website yet — deferring to the next run.`);
      continue;
    }

    for (const channel of item.channels) {
      const image = absoluteImageUrl(post);

      if (channel === "instagram" && !image) {
        // Rule from CLAUDE.md §8: never fail the run for this.
        skipped += 1;
        note(`🖼 ${post.slug}: no photo, so Instagram is skipped (Facebook still goes out).`);
        if (!dryRun) {
          recordResult(state, post.slug, "instagram", {
            skipped: "no-image",
            notedAt: new Date().toISOString(),
          });
          saveState(state);
        }
        continue;
      }

      if (channel === "instagram" && image && !/\.jpe?g$/i.test(image)) {
        note(
          `⚠️ ${post.slug}: Instagram only accepts JPEG photos and this one is ` +
            `${image.slice(image.lastIndexOf("."))} — if run live, Instagram will reject it.`,
        );
      }

      if (dryRun) {
        posted += 1;
        note(`📣 would post ${post.slug} → ${channel}:\n      ${describeDryRun(item, channel)}`);
        continue;
      }

      try {
        // graph, pageId, igUserId are all present here: enforced at startup.
        const id =
          channel === "facebook"
            ? await postToFacebook(graph!, pageId!, post, postUrl(post.slug), image)
            : await postToInstagram(graph!, igUserId!, post, postUrl(post.slug), image!);
        recordResult(state, post.slug, channel, { id, postedAt: new Date().toISOString() });
        saveState(state); // written immediately — a crash later can't repost this
        posted += 1;
        note(`✅ ${post.slug} → ${channel} (id ${id}).`);
      } catch (error) {
        const message = error instanceof Error ? error.message : String(error);
        failures.push({ slug: post.slug, channel, message });
        note(`❌ ${post.slug} → ${channel} failed: ${message}`);
      }
    }
  }

  note(
    `\n🧾 Summary: ${posted} ${dryRun ? "would be posted" : "posted"}, ` +
      `${skipped} skipped (no image), ${deferred} deferred (not live yet), ` +
      `${failures.length} failed.`,
  );

  const stepSummary = process.env.GITHUB_STEP_SUMMARY;
  if (stepSummary) {
    fs.appendFileSync(stepSummary, `${summaryLines.join("\n\n")}\n`);
  }

  if (failures.length > 0) {
    if (!dryRun && ghToken && repo) {
      const details = failures
        .map((f) => `- **${f.slug}** → ${f.channel}: ${f.message}`)
        .join("\n");
      await upsertIssue({
        repo,
        token: ghToken,
        title: "Some posts didn't make it to social media",
        body:
          `The town crier hit problems on its last run. The website itself is fine, and ` +
          `it will retry automatically every hour — this issue is so a human knows.\n\n` +
          `${details}\n\nWhat to do: see "A post didn't appear on Facebook/Instagram" in ` +
          `[docs/RUNBOOK.md](../blob/main/docs/RUNBOOK.md).`,
        label: "cross-post-failure",
      });
    }
    process.exit(1);
  }
}

main().catch((error) => {
  console.error("💥 The town crier crashed unexpectedly:", error);
  process.exit(1);
});
