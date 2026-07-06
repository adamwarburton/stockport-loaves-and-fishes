# CLAUDE.md — Stockport Loaves and Fishes: Website + Social Pipeline

You are building the complete digital home of **Stockport Loaves and Fishes** (registered charity 1200660), a tiny, volunteer-run, faith-based charity that serves a hot meal every Sunday evening to people who are homeless or struggling in Stockport, England — plus coats, sleeping bags, tents, food parcels and friendship.

This repo starts **empty except for this file**. You are responsible for the entire setup: the Next.js website, the volunteer-friendly CMS, the GitHub repo configuration, the Vercel deployment, and the "town crier" GitHub Action that cross-posts website content to Facebook and Instagram automatically.

Read this whole file before writing any code. It is the single source of truth for the project. When this file and your instincts disagree, this file wins. When this file is silent, use judgment consistent with the Prime Directives, and prefer asking the human over guessing on anything irreversible.

---

## 1. Prime Directives (never violate these)

1. **£0/month to run, forever.** Vercel Hobby tier, GitHub Free, GitHub Actions free minutes, Meta Graph API. No paid services, no trials that convert to paid, no "cheap" add-ons. If a task seems to need a paid service, stop and ask.
2. **No database. No Supabase. No backend.** Content is markdown in this repo. Cross-post state is a committed JSON file. The contact page uses `mailto:`/`tel:` links, not a form backend. This is deliberate: nothing to maintain, nothing to migrate, nothing that expires.
3. **Volunteer-proof.** The people who will eventually run this are non-technical charity volunteers. Every workflow that touches them must be a simple web form. Every failure must explain itself in plain English.
4. **The charity must be able to own everything.** Ownership (GitHub, Vercel, Meta) sits with the project lead for now and will transfer to the charity later. Never hardcode personal identifiers where a config value will do. Write docs as if the reader inherited this project cold.
5. **Never post to real social channels without explicit human sign-off.** The cross-poster ships with `DRY_RUN=true` and stays that way until the human flips it after end-to-end testing against a throwaway Facebook page. There is no exception to this.
6. **Never commit secrets.** Tokens live in GitHub Actions Secrets and Vercel env vars only. Add `.env*` to `.gitignore` in your first commit.
7. **Truth in copy.** Never invent facts about the charity (statistics, dates, costs, names). Facts marked `[CONFIRM]` in §5 may be used in draft copy but must be logged in `docs/FACTS_TO_CONFIRM.md`. Nothing launches until that file is resolved.
8. **Dignity in imagery.** Never generate, source, or include imagery depicting identifiable people experiencing homelessness. Placeholder imagery = food, hands, tables, the building, abstract warmth. Real photos come later from the charity, with consent.

---

## 2. Decisions already made (do not re-litigate)

| Decision | Value |
|---|---|
| Hosting | Vercel, team `adamwarburtons-projects` (`team_O5nb3A2tlMKOnXvX7px64EEq`) |
| Vercel project name | `stockport-loaves-and-fishes` |
| GitHub repo | `stockport-loaves-and-fishes`, **public** (unlimited Actions minutes, transparency suits a charity; secrets stay in Actions Secrets) |
| Framework | Next.js (latest stable, App Router, TypeScript strict) + Tailwind CSS |
| CMS | Pages CMS (app.pagescms.org — free, git-based, zero infrastructure). Fallback if it hits a wall: Keystatic in GitHub mode. Do NOT use Decap (its OAuth gateway is friction on Vercel). |
| Social channels | Facebook Page + Instagram, both via one Meta app. X/Twitter is out of scope for now (architecture must make adding it trivial later). |
| Facebook page | A **brand-new page** will be created (the charity's two legacy pages have unknown admins). The pipeline never touches the legacy pages. |
| Instagram | New Business account, created now, linked to the new page. |
| Database | None (see Prime Directive 2) |
| Domain | Build and launch on `stockport-loaves-and-fishes.vercel.app`. The real domain (`stockportloavesandfishes.org`) points at the old site and cuts over later — that's a human task, not yours. |
| Donations | Link out to an external giving platform. Platform not yet chosen → use a clearly-marked placeholder button and log in `FACTS_TO_CONFIRM.md`. Do not build payment processing. |

---

## 3. Architecture (memorise this)

```
Volunteer → Pages CMS web form → commit to main
                                      │
              ┌───────────────────────┼──────────────────────┐
              ▼                       ▼                      │
        Vercel build            GitHub Action                │
        (site + RSS)            "town-crier"                 │
                                (on push + hourly cron)      │
                                      │                      │
                          ┌───────────┼───────────┐          │
                          ▼           ▼           ▼          │
                      Facebook    Instagram   .social/state.json
                       Page                   (committed back ──┘
                                               with [skip ci])
                                      │
                              on failure → GitHub issue
```

Key properties you must preserve:
- **Decoupled:** a social API failure can never break the website build, and vice versa.
- **Idempotent:** a post can never go out twice, across re-runs, rebuilds, force-pushes, or parallel triggers.
- **Self-announcing failure:** every failure produces a GitHub issue a non-developer could act on.
- **One direction:** website → social. Never build sync in the other direction.

---

## 4. Repository layout (create exactly this)

```
/
├── CLAUDE.md                    ← this file
├── README.md                    ← plain-English project intro for the charity
├── .pages.yml                   ← Pages CMS config
├── .gitignore
├── package.json
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
├── vercel.json                  ← only if needed (e.g. ignore-build rules)
├── .github/
│   └── workflows/
│       ├── town-crier.yml       ← the cross-poster
│       └── ci.yml               ← lint + typecheck + tests on PRs
├── .social/
│   └── state.json               ← cross-post ledger (bot-committed)
├── content/
│   ├── posts/                   ← blog/news posts (the social source)
│   │   └── YYYY-MM-DD-slug.md
│   ├── pages/                   ← editable copy for static pages
│   └── settings/
│       └── needs.md             ← the live "what we need now" list
├── public/
│   └── images/
│       └── posts/               ← CMS-uploaded images
├── scripts/
│   └── town-crier/              ← cross-poster source (TypeScript, tested)
│       ├── index.ts
│       ├── facebook.ts
│       ├── instagram.ts
│       ├── state.ts
│       └── *.test.ts
├── src/
│   ├── app/                     ← Next.js App Router
│   │   ├── feed.xml/route.ts    ← RSS
│   │   └── ...pages
│   ├── components/
│   └── lib/
│       └── content.ts           ← markdown loading/parsing (shared with scripts)
└── docs/
    ├── META_SETUP.md            ← step-by-step human walkthrough (you write this)
    ├── RUNBOOK.md               ← "when something breaks" guide (you write this)
    ├── HANDOVER.md              ← ownership-transfer checklist (you write this)
    └── FACTS_TO_CONFIRM.md      ← running log of unverified copy facts
```

Keep dependencies minimal: `gray-matter` + `remark`/`rehype` (or `next-mdx-remote`) for markdown, `zod` for frontmatter validation, nothing heavier. No ORMs, no CMS SDKs, no component libraries beyond Tailwind. Every dependency is a future maintenance burden on a charity.

---

## 5. The charity: facts for copy

Use these; do not embellish. `[CONFIRM]` = usable in draft, must be logged in `docs/FACTS_TO_CONFIRM.md`.

- Registered charity number: **1200660** (a CIO). Never reference old number 1180286.
- What: free hot meal + practical help (clothes, bedding, tents, sleeping bags, food parcels, help with next steps including support for refugees and asylum seekers).
- When: **every Sunday, 5:00–6:30pm** `[CONFIRM]`
- Where: **Stockport Baptist Church, Thomson Street, Stockport SK3 9DR** `[CONFIRM]`
- Contact: info@stockportloavesandfishes.org `[CONFIRM]` · 07429 567402 `[CONFIRM]`
- Scale: roughly 30–50 people eat each Sunday; more at Christmas `[CONFIRM]`
- Founded: 2012 or 2013 `[CONFIRM — sources conflict; write around it: "for over a decade"]`
- Run entirely by volunteers, no paid staff `[CONFIRM]`
- Annual running cost: ~£15,000 `[CONFIRM]`
- Founding story (safe to use, verified in press): founder Ed Leavy was told there were "no homeless in Stockport" and started serving hot food from the boot of his car; the operation grew from a handful of people to dozens.
- No emergency/24-7 service. The site must clearly signpost elsewhere for urgent help: Wellspring Stockport, Stockport Council housing options, and 999/emergency services. Get current phone numbers/URLs at build time and log them in `FACTS_TO_CONFIRM.md`.

---

## 6. Tone of voice (embedded — apply to ALL copy you write)

**The voice in one sentence: "Everyone's welcome at the table — come as you are."** We sound like the person ladling out food on a Sunday evening: warm, direct, a bit cheeky, never preachy, never pitying.

Principles:
1. **Name people, don't categorise.** "If you're sleeping rough, sofa-surfing, or just can't stretch the money to the end of the week — come and eat." Never: "provision for vulnerable and socially excluded individuals."
2. **Warm humour, aimed only at ourselves.** Jokes about our cooking: yes. Jokes about hardship: never. Humour dials down (not off) for serious subjects.
3. **Faith is why we cook, never the price of admission.** "We're a Christian charity. The clue's in the name — loaves, fishes, and everybody gets fed." No page leads with scripture.
4. **Plain, concrete, Stockport.** Short words, short sentences, real details. "Thomson Street", not "our premises". Banned words on public pages: service users, clients, beneficiaries, vulnerable individuals, provision, signposting, stakeholders, pathways.
5. **Dignity first.** People who eat with us are guests. Never "the homeless" as a noun. No guilt-trip donation asks — invite, don't shame.

Ready-made lines you may use verbatim: "Everyone's welcome at the table." · "Hot food, warm welcome, no questions asked." · "No referral. No form. No sermon required. Just come." · "We've saved you a seat." · "Small charity. Big pan." · "Our faith is why we cook. It's not the price of admission." · "Can you stir a pot, carry a table, or hold a conversation? You're hired. (We don't pay. But the company's excellent.)" · "Give a fiver, feed a neighbour." · "We run on roughly £15,000 a year. That's not a typo."

---

## 7. Website specification

### Pages (App Router routes)

| Route | Purpose | Notes |
|---|---|---|
| `/` | Hero welcome + the three essentials (what/when/where) + three doors: **I need help / I want to give / I want to volunteer** + latest posts | The three doors are the whole homepage strategy |
| `/help` | **The most important page.** Plain instructions: just turn up, what to expect, what we can give, what we can't do and who to contact instead (honest scope builds trust) | Must read clearly at low literacy levels; test at a glance on a cheap phone |
| `/our-story` | Founding story, faith-and-welcome statement, the people | |
| `/how-to-help` | Donate (placeholder button per §2), give goods (renders `content/settings/needs.md` as the live "what we need now" list), volunteer, spread the word. Include the radical-transparency block (~£15k/year `[CONFIRM]`) | |
| `/news` | Post index | |
| `/news/[slug]` | Individual post | Canonical URLs used in social captions |
| `/contact` | One address story (help = Thomson Street; post = registered address `[CONFIRM]`), one phone, one email, one Facebook link | |
| `/feed.xml` | RSS 2.0 via route handler — full items, absolute URLs | Keeps the zero-code Buffer/Zapier fallback alive forever |

Also: sitemap.xml, robots.txt, OpenGraph + Twitter meta on every page (posts use their image), favicon set, JSON-LD `Organization` + `NGO` schema with the charity number.

### Design direction
- Mobile-first. Assume a cheap Android on a slow connection. Aim Lighthouse ≥95 on all four scores; the site should ship near-zero client-side JS on content pages (server components; no client components without a reason).
- Warm, generous, unfussy. Big readable type (18px+ body), high contrast (WCAG 2.1 AA minimum — verify all colour pairs), teal-forward palette as a quiet nod to the charity's "Welcome" sheet, with a warm accent. Propose the exact palette in Phase 1 and record it in `tailwind.config.ts` with comments.
- The "I need help" pathway must be reachable in one tap from every page (persistent header link, visually distinct).
- Accessibility: semantic HTML, skip-link, focus states, alt text on everything, no text in images, honour `prefers-reduced-motion`.

---

## 8. Content model (the frontmatter contract)

Posts live at `content/posts/YYYY-MM-DD-slug.md`. Validate with zod in `src/lib/content.ts`; the site build and the town crier share this parser. Invalid frontmatter fails CI with a plain-English error message.

```yaml
---
title: "What we need this week"          # required
publishAt: 2026-07-09T10:00:00Z          # required, ISO 8601 UTC.
                                          # Site hides + crier ignores until reached.
status: published                         # required: draft | published
image: /images/posts/coats.jpg            # optional. Required for Instagram.
imageAlt: "Folded winter coats on a table" # required when image present
categories: [weekly-needs]                # optional: weekly-needs | thank-you |
                                          # volunteer-voices | story | seasonal | update
social:
  text: >                                 # optional. The handwritten social caption.
    Cold snap coming. Men's coats, size 9+
    boots and sleeping bags needed this week.
    Drop-off Sunday 5pm.
  channels: [facebook, instagram]         # optional. Default: [facebook, instagram]
                                          # Empty list [] = website-only post.
---
Body in markdown. The full, warm website version.
```

Rules the code must enforce:
- `social.text` empty → Facebook caption falls back to `title` + post URL; Instagram falls back to `title` + "Link in bio" phrasing + post URL as trailing text (IG captions can't hyperlink).
- `image` absent but `instagram` in channels → skip Instagram for that post, record `"instagram": {"skipped": "no-image"}` in state, note it in the run summary. Never fail the run for this.
- Post URL: `https://<site>/news/<slug>` where slug = filename minus date prefix.
- Times display in Europe/London on the site; store UTC.

---

## 9. Pages CMS specification (`.pages.yml`)

Configure so a volunteer sees a form, not a schema:

- **Content type "News & posts"** → `content/posts`: Title · Body (rich text) · Photo (upload → `public/images/posts`, ~1600px max width guidance in the field description) · Photo description (maps to `imageAlt`, described as "describe the photo for people who can't see it") · "When should this go live?" (datetime → `publishAt`) · "How should this read on Facebook/Instagram?" (textarea → `social.text`, description: "Short and friendly. If you leave this blank we'll use the title.") · Channel toggles → `social.channels` · Status (Draft / Published).
- **Content type "What we need now"** → `content/settings/needs.md`: a simple editable list.
- **Content type "Page copy"** → `content/pages/*`: title + body per static page so wording never needs a developer.

Write field labels and descriptions in the tone of voice — the CMS *is* a volunteer-facing product. Document sign-up/invite steps (GitHub-account-free if the plan allows; otherwise document the lightweight GitHub account path) in `docs/RUNBOOK.md`.

---

## 10. Town crier specification (`.github/workflows/town-crier.yml` + `scripts/town-crier/`)

**Triggers:** `push` to `main` (paths: `content/posts/**`) AND `schedule` cron `17 * * * *` (hourly, off-peak minute — GitHub cron is best-effort, fine here) AND `workflow_dispatch` (manual button with an `override_dry_run: false` default input for testing).

**Concurrency:** `group: town-crier`, `cancel-in-progress: false` — runs queue, never overlap. This plus the state file is the double-post guarantee.

**Algorithm (implement in TypeScript in `scripts/town-crier/`, run via `npx tsx`, unit-test the pure parts):**
1. Load all posts via the shared parser. Filter: `status: published`, `publishAt <= now`, has at least one channel.
2. Load `.social/state.json`. Diff → the to-do list. Schema:
   ```json
   { "posts": { "<slug>": {
       "facebook":  { "id": "…", "postedAt": "…" },
       "instagram": { "id": "…", "postedAt": "…" }
   } } }
   ```
3. **Liveness gate:** for each candidate, `GET` the post's public URL (and image URL if present) and require HTTP 200. Not live yet (Vercel still building)? Defer silently — the hourly cron retries. This ordering matters most for Instagram, which fetches `image_url` server-side from our deployed site.
4. **Token health check first:** `GET /me` on the Graph API. On auth failure: open/refresh a pinned issue titled **"⚠️ Social posting is broken — token needs attention"** with a link to the fix steps in `RUNBOOK.md`, then exit non-zero. This makes token death loud within an hour, not silent for weeks.
5. Post per channel, per post:
   - **Facebook** — image: `POST /{page-id}/photos` `{ url, caption: social.text + "\n\n" + postUrl }`; no image: `POST /{page-id}/feed` `{ message, link: postUrl }`.
   - **Instagram** — `POST /{ig-user-id}/media` `{ image_url, caption }` → poll container `status_code` until `FINISHED` (timeout 2 min) → `POST /{ig-user-id}/media_publish` `{ creation_id }`.
   - Pin the Graph API version: check the latest stable at build time, set it as a single constant, note the chosen version in `RUNBOOK.md` with a yearly-review reminder.
6. Record each success in state immediately (write after every channel call, not at the end — a crash mid-run must not cause re-posts).
7. One channel failing never blocks other channels or posts. Collect failures.
8. Commit `.social/state.json` if changed: author `town-crier[bot]`, message `chore(social): record cross-posts [skip ci]` (`[skip ci]` stops a pointless Vercel rebuild; pushes made with the default `GITHUB_TOKEN` don't retrigger workflows, so no loop).
9. Any failures → create a GitHub issue labelled `cross-post-failure` (post slug, channel, sanitised API error — **never echo tokens**, strip query strings from logged URLs), then exit non-zero so the run shows red.

**DRY_RUN (repository variable, default `"true"`):** everything runs — parsing, diffing, liveness — but Graph API writes are replaced by a printed summary of exactly what would post where, and state is not committed. The workflow prints `🏜 DRY RUN` loudly at the top. Flipping to live = the human sets the repo variable to `"false"`; document this as the final launch step.

**Secrets (GitHub Actions Secrets — instruct the human, never ask them to paste values to you):** `META_ACCESS_TOKEN` (System User token), `META_PAGE_ID`, `META_IG_USER_ID`. That is the entire configuration surface. The workflow must fail with a friendly explanation if any are missing while `DRY_RUN=false`.

---

## 11. The Meta side — what the human must do (you write the guide)

You cannot create Facebook pages or Meta apps. What you CAN do is make it painless. In Phase 3, write `docs/META_SETUP.md`: a precise, click-by-click walkthrough (verify each step against current Meta docs while writing — their UI moves), covering:

1. Create a **Meta Business Portfolio** for the charity (none exists — starting from zero).
2. Create the **new Facebook Page** (suggest name: "Stockport Loaves and Fishes"; note the two legacy pages exist and will be publicly deprecated later — comms task, out of repo scope).
3. Create the **Instagram Business account** and link it to the new Page.
4. Create a **Meta app** (Business type) inside the portfolio. It only ever posts to the charity's own assets, so it stays in Development Mode with the owner as app admin — **no App Review needed**; say so explicitly in the guide because it's the step that scares people.
5. Create a **System User** (admin), assign the Page + IG account as assets, generate a **non-expiring System User token** with scopes: `pages_manage_posts`, `pages_read_engagement`, `instagram_basic`, `instagram_content_publish`, `business_management`.
6. Retrieve **Page ID** and **IG User ID** (give the exact Graph Explorer calls).
7. Store the three values as GitHub Actions Secrets (exact `gh secret set` commands AND the web UI path).
8. **Create a throwaway test Page + IG account first** and run the full pipeline against them with `DRY_RUN=false` before ever pointing at the real assets. The guide must present this as mandatory, not optional.

Every step gets a checkbox. Assume the reader has never seen developers.facebook.com.

---

## 12. Build phases (work in this order; STOP = wait for human)

Do **not** ask permission to proceed within a phase. Do STOP at phase boundaries with a short plain-English summary and a demo link where applicable.

**Phase 0 — Bootstrap.** `git init`; scaffold Next.js (TS strict, Tailwind, App Router, ESLint + Prettier); `.gitignore` incl. `.env*`; CI workflow (typecheck, lint, test, build on PRs and main); create the **public** GitHub repo via `gh repo create stockport-loaves-and-fishes --public --source=. --push` (confirm the account with `gh auth status` first); link Vercel via CLI to team `adamwarburtons-projects`, project `stockport-loaves-and-fishes`, and connect the Git integration so pushes to `main` deploy. Verify one end-to-end deploy. Commit this CLAUDE.md as the first commit. **STOP: share the vercel.app URL.**

**Phase 1 — Site + content engine.** Shared markdown parser with zod validation; all routes from §7 with real draft copy in the §6 voice (log every `[CONFIRM]` fact); 3–4 seed posts exercising every frontmatter permutation (image/no-image, scheduled-future, website-only, draft); RSS; SEO/meta/schema; palette proposal; Lighthouse pass. **STOP: human reviews copy and design on the preview URL.**

**Phase 2 — CMS.** `.pages.yml` per §9; connect repo at app.pagescms.org (walk the human through the one OAuth click); test the full loop: edit in CMS → commit → deploy → visible. Write the CMS section of `RUNBOOK.md` with the volunteer in mind. **STOP: human publishes a test post themselves, unaided, using only your written instructions. That's the acceptance test.**

**Phase 3 — Town crier (dry run).** Implement §10 fully; unit tests for parsing, diffing, caption fallbacks, state transitions; `docs/META_SETUP.md` per §11; run the workflow in DRY_RUN and show the human exactly what would have posted. **STOP: human completes META_SETUP.md against throwaway assets, adds secrets.**

**Phase 4 — Live test → real launch.** `DRY_RUN=false` against throwaway page/IG; verify image posts, no-image posts, scheduled posts, deliberate-failure issue creation, token-death alarm (test by temporarily invalidating the token). Then swap secrets to the real (new) Page/IG. Finish `RUNBOOK.md` ("post didn't appear", "token needs attention", "how to skip social for one post", "who to call") and `HANDOVER.md` (transfer GitHub/Vercel/Meta ownership to the charity, add-a-second-admin-everywhere checklist). **STOP: launch decision is the human's.**

---

## 13. Conventions

- TypeScript strict everywhere, including `scripts/`. No `any`.
- Conventional commits (`feat:`, `fix:`, `chore:`, `docs:`). Small, reviewable commits.
- Tests: Vitest. The town crier's pure logic (parsing, diffing, fallbacks, state) must be tested; API modules get thin, mockable wrappers. Don't chase coverage on UI.
- Every error message a human might see (CI failures on bad frontmatter, workflow failures, GitHub issues) is written in plain English with the fix, not just the fault.
- Comment the *why*, not the *what* — the next reader is a volunteer developer years from now.
- British English in all copy and docs.

## 14. Never do

- Add a database, auth system, paid service, analytics that needs a cookie banner, or any recurring obligation. (Vercel's built-in Web Analytics on Hobby is permitted, optional.)
- Post to any real social channel while `DRY_RUN=true` is not explicitly, humanly flipped.
- Copy text from the charity's old website (unknown provenance) or reproduce the "Welcome" sheet verbatim (it's a widely shared text — our voice is *inspired by* it; §6 lines are the sanctioned versions).
- Reference charity number 1180286, the legacy Facebook pages, or invent statistics, quotes, or names.
- Include imagery of identifiable people. Log a token, secret, or full callback URL anywhere.
- Touch DNS for stockportloavesandfishes.org.

## 15. Session discipline

Start every session by reading this file and `git log --oneline -15`. Keep a `docs/PROGRESS.md` updated at the end of each session: phase status, what's done, what's next, open questions for the human. If you're ever unsure whether something violates a Prime Directive, it does — ask first.

The measure of success: a busy person can stand this up in a few evenings, a non-technical volunteer can run it indefinitely, and a charity that feeds people on £15k a year never gets a bill, a breakage, or a surprise. Build accordingly.
