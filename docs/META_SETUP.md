# Meta setup — the one-time walkthrough

This guide walks you through the Facebook/Meta side of the social pipeline:
creating the charity's new Facebook Page and Instagram account, and giving
the "town crier" robot permission to post to them. **You do not need to have
seen developers.facebook.com before.** Every step is a checkbox — do them in
order, tick as you go.

Steps were verified against Meta's current documentation in July 2026. Meta
moves buttons around occasionally; if a label doesn't match exactly, look for
the nearest equivalent — the _sequence_ stays the same.

**Time needed:** about an hour, in two sittings if you like (steps 1–3, then 4–8).

**You'll need:** your personal Facebook login, your phone (for the Instagram
app), and access to this GitHub repository.

---

## ⚠️ Read this first: the golden rule

**Everything gets tested against throwaway accounts before it touches the
real ones.** Step 8 creates a scrap Facebook Page and Instagram account, and
the pipeline is run against those with real posts until you've seen it work.
Only then do the real Page's details go into GitHub. This is not optional —
it's the difference between "oops, a test post on a page nobody follows" and
"oops, a test post in front of the charity's whole audience".

Also: **never paste the access token anywhere except the GitHub secret box**
(step 7). Not in a document, not in an email, not in a chat to yourself.

---

## Step 1 — Create a Meta Business Portfolio

The portfolio (Meta also calls it "Business Manager") is the container that
will own the Page, the Instagram account and the app. The charity has none
yet — you're starting from zero, which is the easy case.

- [ ] 1.1 Go to **business.facebook.com** and sign in with your personal
      Facebook account. (Your personal account is just the key that opens the
      door — nothing is posted as you, and ownership transfers to the charity
      later; that's covered in `docs/HANDOVER.md`.)
- [ ] 1.2 Click **Create a business portfolio** (on the landing page, or under
      the **Settings** gear if you already see a dashboard).
- [ ] 1.3 Name: **Stockport Loaves and Fishes**. Your name and the charity
      email (info@stockportloavesandfishes.org) as contact details.
- [ ] 1.4 Confirm via the verification email if Meta sends one.

## Step 2 — Create the new Facebook Page

The charity's two old Facebook pages have unknown admins — we deliberately
leave them alone. This is a brand-new Page that the portfolio owns from
birth.

- [ ] 2.1 In the portfolio, open **Settings → Accounts → Pages**.
- [ ] 2.2 Click **Add → Create a new Facebook Page**.
- [ ] 2.3 Name: **Stockport Loaves and Fishes**. Category: **Charity
      organisation** (or "Non-profit organisation" if that's what's offered).
- [ ] 2.4 Fill in the basics: the description from the website's homepage, the
      address (Stockport Baptist Church, Thomson Street, SK3 9DR), the website
      URL, and the profile picture (use the site favicon artwork or the
      charity's existing artwork — no photos of guests, ever).
- [ ] 2.5 Don't announce it anywhere yet. It can sit quietly until launch.
      (Deprecating the two legacy pages publicly is a comms task for later —
      it's deliberately out of scope here.)

## Step 3 — Create the Instagram Business account and link it

- [ ] 3.1 On your phone, install Instagram and create a **new account** —
      suggested handle: **@stockportloavesandfishes** (or the nearest
      available). Use the charity email.
- [ ] 3.2 In the Instagram app: **Settings → Account type and tools →
      Switch to professional account → Business**. (Free. Skip any upsells.)
- [ ] 3.3 Link it to the new Page: in the Instagram app, **Edit profile →
      Page** (or **Settings → Business tools and controls → Connect a
      Facebook Page**) and choose the new **Stockport Loaves and Fishes**
      Page.
- [ ] 3.4 Back at business.facebook.com: **Settings → Accounts → Instagram →
      Add** and connect the new Instagram account, so the portfolio owns it
      too.

## Step 4 — Create the Meta app

The "app" is just Meta's word for a set of API credentials. It never appears
publicly.

- [ ] 4.1 Go to **developers.facebook.com** and click **Get started** (top
      right) to register as a developer with your same Facebook login. Accept
      the terms. (Free, instant.)
- [ ] 4.2 Go to **My apps → Create app**.
- [ ] 4.3 If asked for a use case / app type, choose the one labelled
      **Business** (sometimes phrased "Manage everything on your Page" or
      "Other → Business"). If asked to connect a business portfolio, pick
      **Stockport Loaves and Fishes** — this matters, it's what lets the
      system user use the app.
- [ ] 4.4 App name: **SLF Town Crier**. Contact email: the charity's.
- [ ] 4.5 That's it. **Do not add products, do not submit for App Review.**

> **"Don't I need App Review? Everyone says you need App Review."**
> No — and this is the step that scares people, so here it is in plain terms:
> App Review is for apps that other people's accounts will use. This app only
> ever posts to the charity's **own** Page and Instagram account, using a
> token generated by the charity's **own** business portfolio. For that, an
> app in **Development Mode** with **Standard Access** is enough, forever.
> Nothing needs Meta's approval, nobody needs to submit screencasts.

## Step 5 — Create the System User and its token

A System User is a robot member of the business portfolio. Its token doesn't
expire when a human changes their password, goes on holiday, or leaves — this
is what makes the pipeline maintenance-free.

- [ ] 5.1 In **business.facebook.com → Settings**, go to **Users → System
      users**. Click **Add**.
- [ ] 5.2 Name: **town-crier**. Role: **Admin**. Create.
- [ ] 5.3 With the **town-crier** system user selected, click **Assign
      assets**, category **Pages** → tick **Stockport Loaves and Fishes** →
      give **Full control** (or at minimum "Content: publish").
- [ ] 5.4 **Assign assets** again, category **Instagram accounts** → tick the
      new Instagram account → **Full control** (or at minimum content
      publishing).
- [ ] 5.5 **Assign assets** once more, category **Apps** → tick **SLF Town
      Crier** → **Full control** ("Manage app").
- [ ] 5.6 Click **Generate token** (still on the system user's page). App:
      **SLF Town Crier**. Token expiration: **Never**.
- [ ] 5.7 Permissions — tick exactly these five: `pages_manage_posts`,
      `pages_read_engagement`, `instagram_basic`,
      `instagram_content_publish`, `business_management`.
- [ ] 5.8 Generate, then **copy the token straight into the GitHub secret**
      (step 7.2) — it's shown only once. If you lose it, generate a new one;
      nothing breaks.

## Step 6 — Find the two IDs

The pipeline needs the Page's ID and the Instagram account's ID. The Graph
API Explorer is a query tool built into the developer site.

- [ ] 6.1 Go to **developers.facebook.com/tools/explorer**.
- [ ] 6.2 In the app dropdown (top right), pick **SLF Town Crier**. In the
      user/token dropdown, pick **Get Page access token** and select the new
      Page (approve the login popup if one appears).
- [ ] 6.3 In the query box, enter exactly `me?fields=id,name` and press
      Submit. The `id` in the answer is the **Page ID**. Copy it.
- [ ] 6.4 Now query `me?fields=instagram_business_account`. The `id` inside
      `instagram_business_account` is the **Instagram user ID**. Copy it.
      _(If this comes back empty, the Instagram account isn't linked to the
      Page — redo step 3.3 and try again.)_
- [ ] 6.5 Sanity check: both IDs are long strings of digits, and they are
      different numbers.

## Step 7 — Put the three values into GitHub

These are stored as GitHub Actions **secrets** — encrypted, never shown
again, never in the code.

**Web UI path:** GitHub → the `stockport-loaves-and-fishes` repository →
**Settings → Secrets and variables → Actions → New repository secret.**

- [ ] 7.1 Secret name `META_PAGE_ID` — value: the Page ID from 6.3.
- [ ] 7.2 Secret name `META_ACCESS_TOKEN` — value: the token from 5.4.
- [ ] 7.3 Secret name `META_IG_USER_ID` — value: the Instagram user ID from 6.4.

Or, if you prefer the command line:

```bash
gh secret set META_PAGE_ID --repo adamwarburton/stockport-loaves-and-fishes
gh secret set META_ACCESS_TOKEN --repo adamwarburton/stockport-loaves-and-fishes
gh secret set META_IG_USER_ID --repo adamwarburton/stockport-loaves-and-fishes
```

(Each command prompts you to paste the value — it never appears on screen.)

## Step 8 — The mandatory throwaway test

**Do steps 2–7 twice.** The first time, instead of the real Page and
Instagram account, create:

- a Facebook Page called something like **SLF Pipeline Test** (leave it
  unpublished/invisible if the option exists), and
- a scrap Instagram account (any free handle).

Point the three GitHub secrets at the _throwaway_ IDs and token first. Then:

- [ ] 8.1 Run the town crier by hand: GitHub → **Actions → Town crier →
      Run workflow**, leaving the override box unticked. Read the run's
      summary: it shows exactly what _would_ post. Check the captions read
      well.
- [ ] 8.2 Live-fire at the throwaway: run it again with **override_dry_run
      ticked**. Real posts should appear on the test Page (and Instagram, for
      posts with a JPEG photo).
- [ ] 8.3 Work through the Phase 4 test checklist with the project developer
      (image post, no-image post, scheduled post, deliberate failure, token
      alarm).
- [ ] 8.4 Only when all of that behaves: repeat steps 5.4–7 with the **real**
      Page and Instagram IDs and a fresh token, and delete the throwaway
      Page/account.
- [ ] 8.5 The very final launch step (a human decision, made deliberately):
      set the repository **variable** `DRY_RUN` to `false` — GitHub →
      Settings → Secrets and variables → Actions → **Variables** tab.

---

## Ownership note

Everything you created here (portfolio, Page, Instagram, app, system user)
currently hangs off your personal Facebook login. That's fine for now and
expected — transferring it all to the charity (and adding a second admin so
no single person is a point of failure) is the `docs/HANDOVER.md` checklist,
done before launch.
