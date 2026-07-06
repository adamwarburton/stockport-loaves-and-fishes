# Stockport Loaves and Fishes — website

This is the website for **Stockport Loaves and Fishes** (registered charity 1200660),
a volunteer-run charity that serves a hot meal every Sunday evening to people who are
homeless or struggling in Stockport — plus coats, sleeping bags, tents, food parcels
and friendship.

Everyone's welcome at the table.

## What this repository is

Everything the charity's website needs lives in this one place:

- **The website itself** — built with Next.js, hosted free on Vercel at
  [stockport-loaves-and-fishes.vercel.app](https://stockport-loaves-and-fishes.vercel.app).
- **The words and photos** — stored as simple text files in the `content/` folder.
  Volunteers edit them through a friendly web form ([Pages CMS](https://app.pagescms.org)),
  never by touching code.
- **The town crier** — a small robot that automatically shares new website posts to
  the charity's Facebook page and Instagram, so nobody has to post the same thing
  three times.

It is deliberately built to cost **£0 per month, forever**, with nothing to renew,
no database, and no server to look after.

## I'm a volunteer — how do I update the website?

You don't need anything in this repository. See `docs/RUNBOOK.md` for plain-English
instructions (written as part of the project build; if it's not there yet, the project
is still being set up).

## I'm a developer — how do I run it?

```bash
npm install
npm run dev        # local site at http://localhost:3000
npm run lint       # code style checks
npm run typecheck  # TypeScript checks
npm test           # unit tests
npm run build      # production build (same as Vercel runs)
```

The project brief, architecture and rules live in [CLAUDE.md](./CLAUDE.md) — read that
first. Progress and current status are tracked in `docs/PROGRESS.md`.

## Ownership

The site, this repository and the connected accounts are held in trust for the charity
and will be transferred to it — see `docs/HANDOVER.md` (written before launch).
