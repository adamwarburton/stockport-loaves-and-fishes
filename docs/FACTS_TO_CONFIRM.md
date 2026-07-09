# Facts to confirm before launch

Every fact below is **used in draft copy on the site but not yet verified by
the charity**. Nothing launches until each row is ticked off by someone who
knows (a trustee or long-standing volunteer). When a fact is confirmed or
corrected, fix it in `src/lib/site.ts` / the relevant `content/` file and tick
it here.

## Charity facts (from CLAUDE.md §5, all marked [CONFIRM] there)

- [ ] **Meal times: every Sunday, 5:00–6:30pm** — used on every page (`src/lib/site.ts`).
- [ ] **Venue: Stockport Baptist Church, Thomson Street, Stockport SK3 9DR** — used on every page (`src/lib/site.ts`).
- [ ] **Email: info@stockportloavesandfishes.org** — used on /contact, /how-to-help, footer.
- [ ] **Phone: 07429 567402** — used on /contact, /how-to-help, footer.
- [ ] **Scale: roughly 30–50 people eat each Sunday; more at Christmas** — written around as "dozens of guests… more again at Christmas" on /our-story.
- [ ] **Founded 2012 or 2013** — sources conflict, so all copy says "over a decade ago" (/our-story). Confirm the year if the charity wants it stated.
- [ ] **Run entirely by volunteers, no paid staff** — used on /our-story and /how-to-help ("Nobody is paid").
- [ ] **Annual running cost ~£15,000** — used on /our-story and /how-to-help ("We run on roughly £15,000 a year. That's not a typo.").
- [ ] **Registered (postal) address** — unknown, so /contact deliberately says "email us first" instead of printing an address. Get the registered address from the Charity Commission record and add it to /contact.

## Signposting (looked up 6 July 2026 — a volunteer must re-verify before launch, then yearly)

- [ ] **The Wellspring** — Harvey Street, Stockport SK1 1YD · 0161 477 6344 · https://thewellspring.co.uk · described as "open every day". Sources: [thewellspring.co.uk/contact-us](https://www.thewellspring.co.uk/contact-us/), [Stockport Council directory](https://www.stockport.gov.uk/directories/entry/the-wellspring).
- [ ] **Stockport Homes housing options team (council homelessness service)** — 0161 217 6016 · out-of-hours emergency 0161 474 2818 · https://www.stockport.gov.uk/homeless-advice. Sources: [stockport.gov.uk/homeless-advice](https://www.stockport.gov.uk/homeless-advice), [stockporthomes.org homeless advice](https://www.stockporthomes.org/find-a-home/homelessness/homeless-advice/).
- [ ] **999 for immediate danger** — no verification needed, listed for completeness.

## Placeholders that need a decision, not just confirmation

- [ ] **Donation platform** — not yet chosen. /how-to-help shows a clearly-marked "Donate online — coming soon" placeholder with an email fallback. When the platform is chosen, replace the placeholder with a link (one change in `src/app/how-to-help/page.tsx`).
- [x] **Facebook page link** — done. The new page is live at https://www.facebook.com/profile.php?id=61591566191491, stored in `src/lib/site.ts` (`site.facebook`) and linked from /contact and the footer. The town crier posts to it. The two legacy pages are never linked. _If the page gets a vanity username, swap the URL in `site.ts` (one place)._
- [ ] **"What we need right now" list** (`content/settings/needs.md`) — currently a plausible example list written by the developer. The volunteers should replace it with this week's real list as their first CMS edit.
- [ ] **Seed news posts** (`content/posts/`) — the five posts are written as real, publishable copy but describe themselves as test posts where relevant. Review before launch: keep, edit, or replace them.
- [ ] **Placeholder images** — the two post images are illustrations (a bowl, a pot). Real photos come later, from the charity, with consent, never showing identifiable people experiencing homelessness.
