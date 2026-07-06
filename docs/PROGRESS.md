# Project progress

_Last updated: 6 July 2026 (end of Phase 2 session)._

## Where we are

| Phase                     | Status                                          |
| ------------------------- | ----------------------------------------------- |
| 0 — Bootstrap             | ✅ Done                                         |
| 1 — Site + content engine | ✅ Done — copy review still open                |
| 2 — CMS                   | 🟡 Built — human must connect + acceptance-test |
| 3 — Town crier (dry run)  | ⏳ Not started                                  |
| 4 — Live test → launch    | ⏳ Not started                                  |

## Phase 2 — what was done

- **`.pages.yml`** written per CLAUDE.md §9 — three content types: "News &
  posts" (full post form incl. photo upload to `public/images/posts`, photo
  description, go-live datetime, social text, channel ticks, draft/published),
  "What we need now" (`content/settings/needs.md`), and "Page copy"
  (`content/pages/*`, with create/rename/delete disabled so volunteers can't
  break routes). All labels and hints in the house voice.
- **Validated against the real Pages CMS schema**: their config-schema source
  was downloaded from the pages-cms repo and run (zod v3 + stubbed field
  registry) against our file — it passes. Field options (date `time`, select
  `multiple`, media path swapping, `operations`) were all verified from source,
  not guessed.
- **UK-time handling for CMS dates**: the CMS date picker saves bare local
  timestamps (`2026-07-09T10:00`). The shared parser now interprets bare
  timestamps as Europe/London wall time (what a volunteer means) and converts
  to UTC; explicit `Z`/offset timestamps are untouched. Covered by 3 new unit
  tests (summer/BST, winter/GMT, explicit UTC) — 17 tests total.
- **`docs/RUNBOOK.md`** written for volunteers: access by email invitation (no
  GitHub account needed), publishing/scheduling/drafting posts, updating the
  needs list, editing page copy, photo dignity rules, "my change isn't showing
  up" checklist, and who to call.

### Phase 2 — what the human must do (the STOP)

1. Sign in at app.pagescms.org with GitHub (`adamwarburton`), install/authorise
   the Pages CMS GitHub App on the `stockport-loaves-and-fishes` repo — the one
   OAuth click.
2. **Acceptance test:** publish a test post end-to-end using only
   `docs/RUNBOOK.md` §3, unaided. Then check it appears on the live site
   (2–3 min build + it must have status Published and a past go-live time).
3. Report anything confusing in the form labels or the runbook — those are
   product defects in this phase, not user error.

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

- **Human**: connect the repo at app.pagescms.org and run the Phase 2
  acceptance test (see "what the human must do" above). Copy/design feedback
  from the Phase 1 review can land any time — it's all CMS-editable now.
- **Phase 3 (after go-ahead)**: the town crier — `scripts/town-crier/`,
  `.github/workflows/town-crier.yml` (DRY_RUN=true), unit tests, and
  `docs/META_SETUP.md`, the click-by-click Meta walkthrough.

## Open questions / actions for the human

1. **Review `docs/FACTS_TO_CONFIRM.md`** — every unverified fact used in the
   draft copy is listed there with where it appears.
2. **Old GitHub repo**: the pre-existing empty `adamwarburton/stockport_loaves_and_fishes`
   (underscores) repo can be deleted whenever convenient; nothing depends on it.
3. **GitHub CLI auth**: `gh` works via the keychain token passed as `GH_TOKEN`
   (the token lacks `read:org`, which persistent `gh auth login` insists on).
4. **Donation platform decision** is the biggest outstanding content blocker —
   the donate button is a clearly-marked placeholder until then.
