# Project progress

_Last updated: 6 July 2026 (end of Phase 0 session)._

## Where we are

| Phase                             | Status         |
| --------------------------------- | -------------- |
| 0 — Bootstrap                     | ✅ Done        |
| 1 — Site + content engine         | ⏳ Not started |
| 2 — CMS                           | ⏳ Not started |
| 3 — Town crier (dry run)          | ⏳ Not started |
| 4 — Live test → launch            | ⏳ Not started |

## Phase 0 — what was done

- Git repository initialised; CLAUDE.md (the project brief) is the first commit.
- Next.js scaffolded: latest stable (16.x), App Router, TypeScript strict, Tailwind CSS v4,
  ESLint, Prettier, Vitest.
- `.gitignore` covers `.env*` and `.vercel` from the first scaffold commit — no secrets can
  be committed by accident.
- CI workflow (`.github/workflows/ci.yml`): lint, typecheck, tests and build on every pull
  request and every push to `main`.
- Public GitHub repo created: `adamwarburton/stockport-loaves-and-fishes`.
- Vercel project `stockport-loaves-and-fishes` created under team `adamwarburtons-projects`
  and connected to the GitHub repo — every push to `main` deploys automatically.
- End-to-end deploy verified at <https://stockport-loaves-and-fishes.vercel.app>.

Notes:

- `tailwind.config.ts` is deliberately deferred to Phase 1: Tailwind v4 is configured in
  CSS, and CLAUDE.md says the palette is proposed and recorded in that file in Phase 1 —
  creating an empty one now would just be dead config.
- The site currently shows the default Next.js placeholder page. Real pages and copy are
  Phase 1 work.

## What's next (Phase 1 — needs human go-ahead)

Site + content engine: shared markdown parser with zod validation, all routes from
CLAUDE.md §7 with real draft copy in the §6 voice, seed posts covering every frontmatter
permutation, RSS feed, SEO/meta/JSON-LD schema, palette proposal, Lighthouse pass.

## Open questions / actions for the human

1. **Old GitHub repo:** a pre-existing empty repo `adamwarburton/stockport_loaves_and_fishes`
   (underscores) exists on GitHub — the local folder's git remote originally pointed at it.
   The project now lives in `stockport-loaves-and-fishes` (hyphens, per the brief). Consider
   deleting the underscore repo to avoid confusion. Nothing depends on it.
2. **GitHub token scope:** the `gh` CLI isn't persistently logged in (the keychain token
   lacks the `read:org` scope `gh auth login` insists on). Commands work by passing the
   keychain token as `GH_TOKEN`. If that token is ever revoked, run `gh auth login`.
3. All copy facts marked `[CONFIRM]` in CLAUDE.md §5 will be logged in
   `docs/FACTS_TO_CONFIRM.md` when Phase 1 writes the first real copy.
