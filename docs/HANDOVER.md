# Handover — transferring everything to the charity

This is the checklist for moving ownership of the website and its accounts
from the project lead (Adam) to Stockport Loaves and Fishes itself. The aim:
**no single person is ever a point of failure**, and the charity can sack,
lose, or simply outlive any individual — including the person who built this
— without losing its website or social media.

It's written to be done in an afternoon, with the charity's chosen "digital
trustee" (any reasonably confident computer user) sitting next to whoever
currently holds the accounts.

**The golden rule of this document: two admins on everything.** Every
account below ends up with at least two people who can get in, and the
passwords in a shared password manager the trustees control.

---

## 0. Before starting

- [ ] 0.1 The charity picks a **digital trustee** (primary) and a **deputy**.
- [ ] 0.2 Set up a charity password manager (Bitwarden's free tier is fine)
      owned by the digital trustee, shared with the deputy. Every credential
      created below goes in it, immediately, as you go.
- [ ] 0.3 Create (or confirm) a charity-controlled email address that isn't
      any one person's personal inbox — info@stockportloavesandfishes.org —
      and make sure two people can read it. Every account below uses it.

## 1. GitHub (the code and content)

- [ ] 1.1 Create a GitHub **organisation** owned by the charity (free plan):
      suggested name `stockport-loaves-and-fishes`. Owner: the digital
      trustee's GitHub account. Add the deputy and Adam as owners too (Adam
      can be removed later — see §6).
- [ ] 1.2 Transfer the repository: repo **Settings → General → Danger Zone →
      Transfer ownership** → to the new organisation.
- [ ] 1.3 After the transfer, re-check the plumbing that hangs off the repo: - [ ] GitHub Actions **secrets** (`META_ACCESS_TOKEN`, `META_PAGE_ID`,
      `META_IG_USER_ID`) and the **variable** `DRY_RUN` — these
      transfer with the repo, but verify them under Settings. - [ ] **Vercel**: reconnect the Git integration to the new repo
      location (Vercel project → Settings → Git). - [ ] **Pages CMS**: sign in at app.pagescms.org, install the Pages
      CMS GitHub App on the organisation/repo, and re-invite the
      volunteer editors (RUNBOOK §2).
- [ ] 1.4 Confirm a test edit in the CMS still deploys to the site.

## 2. Vercel (the hosting)

Vercel Hobby is a personal plan, so "transfer" means moving the project to a
charity-owned account:

- [ ] 2.1 Create a new Vercel account (Hobby, free) signed up with the
      charity email / the trustee's GitHub org identity.
- [ ] 2.2 Move the project: Vercel dashboard → project **Settings →
      Transfer Project** to the new account (or, if transfer isn't offered
      on Hobby at the time: create the project fresh on the new account by
      importing the GitHub repo — same name `stockport-loaves-and-fishes` —
      and delete the old project afterwards; the site is rebuilt entirely
      from the repo, so nothing is lost).
- [ ] 2.3 Verify: push a trivial change; the site deploys; the
      `stockport-loaves-and-fishes.vercel.app` URL serves it.
- [ ] 2.4 When the real domain is eventually pointed here (a separate,
      human task), it's this Vercel account that will hold it.

## 3. Meta (Facebook Page, Instagram, the app, the token)

The Business Portfolio from `META_SETUP.md` is the container — hand over the
container, not the pieces:

- [ ] 3.1 In business.facebook.com → **Settings → Users → People**, add the
      digital trustee (their personal Facebook account) with **full control
      (admin)** of the portfolio. Add the deputy as admin too.
- [ ] 3.2 The trustee accepts, signs in, and confirms they can see the Page,
      the Instagram account, the app, and the **town-crier** system user.
- [ ] 3.3 Add the trustee and deputy as admins **directly on the Facebook
      Page** as well (Page → Settings → Page access) — belt and braces.
- [ ] 3.4 Instagram: store the account password in the charity password
      manager; add the trustee's phone as the recovery/2FA method.
- [ ] 3.5 The System User token doesn't change hands — it lives only in the
      GitHub secret and keeps working regardless of which humans come and
      go. If it ever needs regenerating, RUNBOOK §10 (any portfolio admin
      can do it).

## 4. Pages CMS (the volunteer editor)

- [ ] 4.1 The trustee signs in at app.pagescms.org with GitHub (they're an
      org owner now) and confirms they can see and edit the site.
- [ ] 4.2 Re-invite the volunteer editors by email (RUNBOOK §2) and remove
      any invitations that belonged to the old setup.

## 5. Paper trail

- [ ] 5.1 Update RUNBOOK §9 ("Who to call") with the real names and contact
      details of the digital trustee, deputy, and any developer the charity
      keeps on friendly terms.
- [ ] 5.2 Note in the charity's records (trustee minutes) that the website,
      social accounts and the accounts listed here are charity property,
      with the password manager as the key store.
- [ ] 5.3 Set a yearly diary reminder (July): RUNBOOK §12 — check the Graph
      API version, re-verify the signposting numbers on the "I need help"
      page, and check both admins can still get into everything.

## 6. Removing the project lead (whenever the charity is ready)

No offence taken — this is the point of the whole exercise:

- [ ] 6.1 GitHub: remove Adam from the organisation.
- [ ] 6.2 Vercel: confirm the project lives on the charity account and
      Adam's account has no access.
- [ ] 6.3 Meta: remove Adam from the portfolio's People list (after
      confirming both trustee and deputy have admin and have logged in).
- [ ] 6.4 Pages CMS: remove Adam as a collaborator.
- [ ] 6.5 Change any password in the password manager that Adam ever knew.

When every box in this file is ticked, the charity owns its digital home
outright. 🎉
