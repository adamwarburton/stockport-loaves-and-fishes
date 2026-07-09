import { describe, expect, it } from "vitest";
import { getPageAccessToken } from "./facebook";
import type { GraphClient } from "./graph";

function graphReturning(response: Record<string, unknown>): GraphClient {
  return {
    get: async () => response,
    post: async () => ({}),
  };
}

describe("getPageAccessToken", () => {
  it("returns the page token when the Graph API provides one", async () => {
    const graph = graphReturning({ id: "123", access_token: "PAGE_TOKEN" });
    await expect(getPageAccessToken(graph, "123")).resolves.toBe("PAGE_TOKEN");
  });

  it("fails with a plain-English, admin-permission hint when no token comes back", async () => {
    // What Graph returns when the account isn't a Page admin: a page object
    // with no access_token field.
    const graph = graphReturning({ id: "123", name: "The Page" });
    await expect(getPageAccessToken(graph, "123")).rejects.toThrow(/admin of the Page/);
  });
});
