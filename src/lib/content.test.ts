import { describe, expect, it } from "vitest";
import fs from "node:fs";
import path from "node:path";
import { getAllPosts, getVisiblePosts, isVisible, parsePost } from "./content";

const VALID = `---
title: "What we need this week"
publishAt: 2026-07-05T09:00:00Z
status: published
image: /images/posts/steaming-bowl.svg
imageAlt: "Illustration of a steaming bowl of food"
categories: [weekly-needs]
social:
  text: >
    Coats and sleeping bags needed this week.
  channels: [facebook, instagram]
---
Body text here.
`;

describe("parsePost", () => {
  it("parses a fully-specified post", () => {
    const post = parsePost("2026-07-05-what-we-need-this-week.md", VALID);
    expect(post.slug).toBe("what-we-need-this-week");
    expect(post.title).toBe("What we need this week");
    expect(post.publishAt.toISOString()).toBe("2026-07-05T09:00:00.000Z");
    expect(post.image).toBe("/images/posts/steaming-bowl.svg");
    expect(post.social.channels).toEqual(["facebook", "instagram"]);
    expect(post.body).toBe("Body text here.");
  });

  it("defaults social.channels to both channels when social is omitted", () => {
    const raw = `---\ntitle: "Hello"\npublishAt: 2026-07-01T09:00:00Z\nstatus: published\n---\nHi.`;
    const post = parsePost("2026-07-01-hello.md", raw);
    expect(post.social.channels).toEqual(["facebook", "instagram"]);
    expect(post.social.text).toBeUndefined();
  });

  it("keeps an explicit empty channel list (website-only post)", () => {
    const raw = `---\ntitle: "Quiet one"\npublishAt: 2026-07-01T09:00:00Z\nstatus: published\nsocial:\n  channels: []\n---\nHi.`;
    const post = parsePost("2026-07-01-quiet-one.md", raw);
    expect(post.social.channels).toEqual([]);
  });

  it("rejects a post with a photo but no photo description, in plain English", () => {
    const raw = `---\ntitle: "Coats"\npublishAt: 2026-07-01T09:00:00Z\nstatus: published\nimage: /images/posts/coats.jpg\n---\nHi.`;
    expect(() => parsePost("2026-07-01-coats.md", raw)).toThrowError(
      /photo but no photo description/,
    );
  });

  it("rejects a post with no title and names the file in the error", () => {
    const raw = `---\npublishAt: 2026-07-01T09:00:00Z\nstatus: published\n---\nHi.`;
    expect(() => parsePost("2026-07-01-untitled.md", raw)).toThrowError(/2026-07-01-untitled\.md/);
  });

  it("rejects a bad status with the allowed values in the error", () => {
    const raw = `---\ntitle: "Oops"\npublishAt: 2026-07-01T09:00:00Z\nstatus: pending\n---\nHi.`;
    expect(() => parsePost("2026-07-01-oops.md", raw)).toThrowError(/draft/);
  });

  it("rejects filenames without a date prefix, explaining the pattern", () => {
    expect(() => parsePost("my-post.md", VALID)).toThrowError(/2026-07-09-my-post\.md/);
  });

  it("builds an excerpt from the first paragraph", () => {
    const raw = `---\ntitle: "Hello"\npublishAt: 2026-07-01T09:00:00Z\nstatus: published\n---\n## Heading\n\nFirst **paragraph** with a [link](https://example.org).\n\nSecond paragraph.`;
    const post = parsePost("2026-07-01-hello.md", raw);
    expect(post.excerpt).toBe("First paragraph with a link.");
  });
});

describe("isVisible", () => {
  const base = parsePost("2026-07-05-what-we-need-this-week.md", VALID);
  const now = new Date("2026-07-06T12:00:00Z");

  it("shows published posts whose go-live time has passed", () => {
    expect(isVisible(base, now)).toBe(true);
  });

  it("hides posts scheduled for the future", () => {
    const future = { ...base, publishAt: new Date("2026-09-01T09:00:00Z") };
    expect(isVisible(future, now)).toBe(false);
  });

  it("hides drafts even when their go-live time has passed", () => {
    const draft = { ...base, status: "draft" as const };
    expect(isVisible(draft, now)).toBe(false);
  });
});

describe("the real content in content/", () => {
  it("every post parses without errors", () => {
    expect(() => getAllPosts()).not.toThrow();
  });

  it("every post image actually exists in public/", () => {
    for (const post of getAllPosts()) {
      if (post.image) {
        const file = path.join(process.cwd(), "public", post.image);
        expect(fs.existsSync(file), `${post.file} points at a missing image: ${post.image}`).toBe(
          true,
        );
      }
    }
  });

  it("visible posts are sorted newest first", () => {
    const times = getVisiblePosts().map((p) => p.publishAt.getTime());
    expect(times).toEqual([...times].sort((a, b) => b - a));
  });
});
