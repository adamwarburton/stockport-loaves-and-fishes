# Project progress

_Last updated: 6 July 2026 (end of Phase 1 session)._

## Where we are

| Phase                     | Status                     |
| ------------------------- | -------------------------- |
| 0 — Bootstrap             | ✅ Done                    |
| 1 — Site + content engine | ✅ Done — awaiting review  |
| 2 — CMS                   | ⏳ Not started             |
| 3 — Town crier (dry run)  | ⏳ Not started             |
| 4 — Live test → launch    | ⏳ Not started             |

## Phase 1 — what was done

- **Content engine** (`src/lib/content.ts`): one shared markdown parser with zod
  validation — the site build and (later) the town crier both use it. Invalid
  frontmatter fails tests/CI/build with a plain-English message naming the file,
  the field, and the fix. 14 unit tests cover parsing, defaults, visibility
  rules and the real content files.
- **All routes from CLAUDE.md §7** with real draft copy in the §6 voice:
  `/` (three doors), `/help`, `/our-story`, `/how-to-help` (needs list + donate
  placeholder + transparency block), `/news`, `/news/[slug]`, `/contact`,
  plus `/feed.xml` (RSS 2.0, full items, absolute URLs), sitemap.xml, robots.txt,
  a friendly 404, favicon (SVG + apple-icon PNG), OpenGraph/Twitter meta, and
  JSON-LD NGO/Organization schema carrying charity number 1200660.
- **Seed content**: five posts exercising every frontmatter permutation —
  image + social text (happy path), no-image + no social text (caption fallback,
  Instagram skip), scheduled-future (hidden until September), website-only
  (`channels: []`), and a draft. Two placeholder illustrations (bowl, pot — no
  people, no text) stand in until the charity provides real photos.
- **Palette** recorded and commented in `tailwind.config.ts` (loaded into
  Tailwind v4 via `@config`): teal-forward brand + warm amber accent on warm
  paper, every colour pairing contrast-checked to WCAG 2.1 AA. Type: Fraunces
  for headings, Geist for body, 18px base.
- **Accessibility & performance**: semantic HTML, skip link, visible focus
  styles, `prefers-reduced-motion` honoured, "I need help" button in the sticky
  header on every page. Content pages ship no client-side JS beyond the Next.js
  runtime. Lighthouse (mobile): `/` 96/100/100/100, `/help` 98/100/100/100,
  post page 98/100/100/100.
- **Freshness without rebuilds**: pages revalidate hourly (ISR), so a scheduled
  post appears within the hour it goes live — no rebuild, no cron, free tier.
- `docs/FACTS_TO_CONFIRM.md` logs every `[CONFIRM]` fact used in copy, the
  signposting numbers (looked up 6 July 2026, sources linked), and the open
  placeholders (donation platform, Facebook link, registered postal address).

## What's next

- **Human review** of copy and design on the live URL — that's the Phase 1 STOP.
- **Phase 2 (after go-ahead)**: `.pages.yml` for Pages CMS, connect the repo at
  app.pagescms.org, write the volunteer-facing CMS instructions in
  `docs/RUNBOOK.md`. Acceptance test: a human publishes a test post unaided.

## Open questions / actions for the human

1. **Review `docs/FACTS_TO_CONFIRM.md`** — every unverified fact used in the
   draft copy is listed there with where it appears.
2. **Old GitHub repo**: the pre-existing empty `adamwarburton/stockport_loaves_and_fishes`
   (underscores) repo can be deleted whenever convenient; nothing depends on it.
3. **GitHub CLI auth**: `gh` works via the keychain token passed as `GH_TOKEN`
   (the token lacks `read:org`, which persistent `gh auth login` insists on).
4. **Donation platform decision** is the biggest outstanding content blocker —
   the donate button is a clearly-marked placeholder until then.
