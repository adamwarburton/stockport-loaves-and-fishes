import { describe, expect, it } from "vitest";
import { parsePost } from "../../src/lib/content";
import { facebookFeedMessage, facebookPhotoCaption, instagramCaption } from "./captions";

const URL = "https://example.org/news/test";

function makePost(frontmatter: string): ReturnType<typeof parsePost> {
  return parsePost("2026-07-01-test.md", `---\n${frontmatter}\n---\nBody.`);
}

const WITH_TEXT = makePost(
  `title: "Coats needed"\npublishAt: 2026-07-01T09:00:00Z\nstatus: published\nsocial:\n  text: "Cold snap coming. Coats please!"`,
);

const WITHOUT_TEXT = makePost(
  `title: "Coats needed"\npublishAt: 2026-07-01T09:00:00Z\nstatus: published`,
);

describe("facebook captions", () => {
  it("uses the handwritten social text plus the post URL for photo posts", () => {
    expect(facebookPhotoCaption(WITH_TEXT, URL)).toBe(`Cold snap coming. Coats please!\n\n${URL}`);
  });

  it("falls back to title + URL when social text is missing", () => {
    expect(facebookPhotoCaption(WITHOUT_TEXT, URL)).toBe(`Coats needed\n\n${URL}`);
  });

  it("keeps the URL out of the message for link posts (it goes in the link param)", () => {
    expect(facebookFeedMessage(WITH_TEXT)).toBe("Cold snap coming. Coats please!");
    expect(facebookFeedMessage(WITHOUT_TEXT)).toBe("Coats needed");
  });

  it("treats whitespace-only social text as missing", () => {
    const blank = makePost(
      `title: "Coats needed"\npublishAt: 2026-07-01T09:00:00Z\nstatus: published\nsocial:\n  text: "   "`,
    );
    expect(facebookFeedMessage(blank)).toBe("Coats needed");
  });
});

describe("instagram captions", () => {
  it("uses the handwritten social text with the URL as trailing text", () => {
    expect(instagramCaption(WITH_TEXT, URL)).toBe(`Cold snap coming. Coats please!\n\n${URL}`);
  });

  it("falls back to title + link-in-bio phrasing + trailing URL", () => {
    const caption = instagramCaption(WITHOUT_TEXT, URL);
    expect(caption).toContain("Coats needed");
    expect(caption).toContain("link in bio");
    expect(caption.endsWith(URL)).toBe(true);
  });
});
