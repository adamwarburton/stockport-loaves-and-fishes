import { describe, expect, it } from "vitest";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { parsePost } from "../../src/lib/content";
import { channelIsDone, loadState, planWork, recordResult, saveState, type State } from "./state";

function makePost(file: string, extra = ""): ReturnType<typeof parsePost> {
  return parsePost(
    file,
    `---\ntitle: "Test"\npublishAt: 2026-07-01T09:00:00Z\nstatus: published\n${extra}\n---\nBody.`,
  );
}

const POST = makePost("2026-07-01-hello.md");
const POST_WITH_IMAGE = makePost(
  "2026-07-01-photo.md",
  `image: /images/posts/steaming-bowl.svg\nimageAlt: "A bowl"`,
);

describe("planWork (the diff)", () => {
  it("plans both channels for a brand-new post", () => {
    const plan = planWork([POST], { posts: {} });
    expect(plan).toHaveLength(1);
    expect(plan[0].channels).toEqual(["facebook", "instagram"]);
  });

  it("plans nothing for a fully-posted post", () => {
    const state: State = {
      posts: {
        hello: {
          facebook: { id: "1", postedAt: "2026-07-01T10:00:00Z" },
          instagram: { id: "2", postedAt: "2026-07-01T10:00:05Z" },
        },
      },
    };
    expect(planWork([POST], state)).toHaveLength(0);
  });

  it("plans only the missing channel when one already went out", () => {
    const state: State = {
      posts: { hello: { facebook: { id: "1", postedAt: "2026-07-01T10:00:00Z" } } },
    };
    const plan = planWork([POST], state);
    expect(plan).toHaveLength(1);
    expect(plan[0].channels).toEqual(["instagram"]);
  });

  it("respects a website-only post (empty channels)", () => {
    const websiteOnly = makePost("2026-07-01-quiet.md", "social:\n  channels: []");
    expect(planWork([websiteOnly], { posts: {} })).toHaveLength(0);
  });

  it("leaves a no-image Instagram skip alone while the post still has no image", () => {
    const state: State = {
      posts: {
        hello: {
          facebook: { id: "1", postedAt: "2026-07-01T10:00:00Z" },
          instagram: { skipped: "no-image", notedAt: "2026-07-01T10:00:00Z" },
        },
      },
    };
    expect(planWork([POST], state)).toHaveLength(0);
  });

  it("retries Instagram when a previously-skipped post gains an image", () => {
    const state: State = {
      posts: {
        photo: {
          facebook: { id: "1", postedAt: "2026-07-01T10:00:00Z" },
          instagram: { skipped: "no-image", notedAt: "2026-07-01T10:00:00Z" },
        },
      },
    };
    const plan = planWork([POST_WITH_IMAGE], state);
    expect(plan).toHaveLength(1);
    expect(plan[0].channels).toEqual(["instagram"]);
  });
});

describe("channelIsDone", () => {
  it("is false with no ledger entry", () => {
    expect(channelIsDone(POST, undefined)).toBe(false);
  });
  it("is true once posted", () => {
    expect(channelIsDone(POST, { id: "x", postedAt: "now" })).toBe(true);
  });
});

describe("ledger round-trip", () => {
  it("saves, loads and records without losing anything", () => {
    const file = path.join(fs.mkdtempSync(path.join(os.tmpdir(), "crier-")), "state.json");
    const state = loadState(file); // missing file → empty ledger
    expect(state).toEqual({ posts: {} });

    recordResult(state, "hello", "facebook", { id: "123", postedAt: "2026-07-01T10:00:00Z" });
    saveState(state, file);

    const reloaded = loadState(file);
    expect(reloaded.posts.hello.facebook).toEqual({
      id: "123",
      postedAt: "2026-07-01T10:00:00Z",
    });
  });

  it("refuses a mangled ledger with a plain-English error", () => {
    const file = path.join(fs.mkdtempSync(path.join(os.tmpdir(), "crier-")), "state.json");
    fs.writeFileSync(file, `{"oops": true}`);
    expect(() => loadState(file)).toThrowError(/git history/);
  });
});
