/**
 * Thin, mockable wrapper around the Meta Graph API.
 *
 * The token travels in the Authorization header — never in a URL — so it can
 * never leak into logs, error messages or GitHub issues. Every error message
 * is sanitised before it leaves this file.
 */

// Latest stable at build time (checked 6 July 2026; v25.0 released Feb 2026).
// Review yearly — see the technical notes section of docs/RUNBOOK.md.
export const GRAPH_API_VERSION = "v25.0";

const BASE = `https://graph.facebook.com/${GRAPH_API_VERSION}`;

export class GraphError extends Error {
  readonly status: number;
  readonly graphType?: string;
  readonly graphCode?: number;

  constructor(message: string, opts: { status: number; graphType?: string; graphCode?: number }) {
    super(message);
    this.name = "GraphError";
    this.status = opts.status;
    this.graphType = opts.graphType;
    this.graphCode = opts.graphCode;
  }

  /** Token dead, revoked or missing a permission — the "wake a human" case. */
  get isAuthError(): boolean {
    return this.graphType === "OAuthException" || this.status === 401 || this.graphCode === 190;
  }
}

export interface GraphClient {
  get(path: string, params?: Record<string, string>): Promise<Record<string, unknown>>;
  post(path: string, params: Record<string, string>): Promise<Record<string, unknown>>;
}

/** Strip anything that could carry a secret: query strings and the token itself. */
function sanitise(text: string, token: string): string {
  return text.replaceAll(token, "•••").replace(/\?[^\s"')]*/g, "");
}

export function createGraphClient(token: string): GraphClient {
  async function call(
    method: "GET" | "POST",
    path: string,
    params: Record<string, string> = {},
  ): Promise<Record<string, unknown>> {
    const url = new URL(`${BASE}${path}`);
    const init: RequestInit = {
      method,
      headers: { Authorization: `Bearer ${token}` },
    };
    if (method === "GET") {
      for (const [key, value] of Object.entries(params)) {
        url.searchParams.set(key, value);
      }
    } else {
      init.headers = { ...init.headers, "Content-Type": "application/json" };
      init.body = JSON.stringify(params);
    }

    const response = await fetch(url, init);
    const body = (await response.json().catch(() => ({}))) as {
      error?: { message?: string; type?: string; code?: number };
      [key: string]: unknown;
    };

    if (!response.ok || body.error) {
      const graphMessage = body.error?.message ?? `HTTP ${response.status}`;
      throw new GraphError(sanitise(`${path}: ${graphMessage}`, token), {
        status: response.status,
        graphType: body.error?.type,
        graphCode: body.error?.code,
      });
    }
    return body;
  }

  return {
    get: (path, params) => call("GET", path, params),
    post: (path, params) => call("POST", path, params ?? {}),
  };
}
