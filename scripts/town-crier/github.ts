/**
 * Self-announcing failure: every problem becomes a GitHub issue a
 * non-developer could read. One open issue per kind — repeat failures add a
 * comment to the existing issue instead of flooding the tracker hourly.
 */

const API = "https://api.github.com";

interface IssueParams {
  repo: string; // "owner/name"
  token: string;
  title: string;
  body: string;
  label: string;
}

async function gh(
  token: string,
  method: string,
  path: string,
  body?: Record<string, unknown>,
): Promise<{ status: number; json: unknown }> {
  const response = await fetch(`${API}${path}`, {
    method,
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/vnd.github+json",
      "Content-Type": "application/json",
    },
    body: body ? JSON.stringify(body) : undefined,
  });
  return { status: response.status, json: await response.json().catch(() => ({})) };
}

/** Create the label if needed, then open an issue — or comment on the open one. */
export async function upsertIssue({ repo, token, title, body, label }: IssueParams): Promise<void> {
  // 422 = label already exists, which is fine.
  await gh(token, "POST", `/repos/${repo}/labels`, { name: label, color: "d93f0b" });

  const existing = await gh(
    token,
    "GET",
    `/repos/${repo}/issues?labels=${encodeURIComponent(label)}&state=open&per_page=1`,
  );
  const issues = existing.json as Array<{ number: number }>;

  if (Array.isArray(issues) && issues.length > 0) {
    await gh(token, "POST", `/repos/${repo}/issues/${issues[0].number}/comments`, {
      body: `Still happening as of ${new Date().toISOString()}:\n\n${body}`,
    });
    console.log(`ℹ️  Updated existing issue #${issues[0].number} (${label}).`);
  } else {
    const created = await gh(token, "POST", `/repos/${repo}/issues`, {
      title,
      body,
      labels: [label],
    });
    const number = (created.json as { number?: number }).number;
    console.log(`ℹ️  Opened issue${number ? ` #${number}` : ""} (${label}).`);
  }
}
