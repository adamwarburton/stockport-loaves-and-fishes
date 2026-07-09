# Go live — straight to production (the fast path)

This is the condensed guide for turning the town crier on **against the real
Facebook Page and Instagram account**, skipping the throwaway-account test.

**Read this first — what you're trading away.** The full process
(`docs/META_SETUP.md` + `docs/LIVE_TEST.md`) rehearses everything against a
scrap page nobody follows before touching the real one. Skipping that is a
deliberate decision to save an hour. It's defensible **because the charity's
new page starts with no followers** — but it means two steps below are no
longer optional, they're your entire safety net:

- **Step 4 (dry run against the real accounts)** — posts nothing, but proves
  the token works and prints the exact captions that would go out.
- **Step 3 (tidy the content)** — or the very first live run will post the
  leftover test posts, including one literally captioned "Test test test", to
  the charity's real audience.

Do not skip 3 or 4. Everything else is genuinely quick.

Total time: about an hour, most of it waiting for Meta's forms.

---

## Step 1 — Create the real Meta assets

Do this once. (This is the same as `META_SETUP.md` steps 1–6, pointed at the
real accounts instead of throwaways — reproduced here so you don't have to
cross-reference.)

- [ ] **1.1 Business Portfolio.** Go to **business.facebook.com**, sign in
      with your personal Facebook account, and create a business portfolio
      named **Stockport Loaves and Fishes** (contact:
      info@stockportloavesandfishes.org). Your personal login is just the key
      — nothing posts as you; ownership moves to the charity later
      (`docs/HANDOVER.md`).
- [ ] **1.2 The Facebook Page.** In the portfolio: **Settings → Accounts →
      Pages → Add → Create a new Facebook Page.** Name **Stockport Loaves and
      Fishes**, category **Charity organisation**. Add the description,
      address (Stockport Baptist Church, Thomson Street, SK3 9DR), website
      URL, and a profile picture (charity artwork — never a photo of a
      guest). Leave the two legacy pages alone.
- [ ] **1.3 The Instagram account.** On your phone, make a new Instagram
      account (suggested **@stockportloavesandfishes**), then **Settings →
      Account type and tools → Switch to professional account → Business.**
      Link it to the new Page (Instagram: **Edit profile → Page**). Back in
      business.facebook.com, **Settings → Accounts → Instagram → Add** and
      connect it so the portfolio owns it.
- [ ] **1.4 The app.** At **developers.facebook.com**, register as a
      developer (free), then **My apps → Create app → Business type**,
      connected to the **Stockport Loaves and Fishes** portfolio. Name it
      **SLF Town Crier**. **Do not add products and do not submit for App
      Review** — you don't need it; the app only posts to your own accounts,
      so Development Mode is enough forever.
- [ ] **1.5 The system user + token.** business.facebook.com → **Settings →
      Users → System users → Add**, name **town-crier**, role **Admin**.
      Then **Assign assets** three times — the **Page** (full control), the
      **Instagram account** (full control), and the **SLF Town Crier app**
      (manage). Then **Generate token**: app **SLF Town Crier**, expiration
      **Never**, and tick exactly these five permissions:
      `pages_manage_posts`, `pages_read_engagement`, `instagram_basic`,
      `instagram_content_publish`, `business_management`. **Copy the token
      straight into GitHub (step 2) — it's shown only once.**
- [ ] **1.6 The two IDs.** At **developers.facebook.com/tools/explorer**,
      pick the **SLF Town Crier** app and a Page token for the new Page, then
      run `me?fields=id,name` (the `id` is your **Page ID**) and
      `me?fields=instagram_business_account` (the inner `id` is your
      **Instagram user ID**). Both are long numbers.

## Step 2 — Put the three secrets into GitHub

GitHub → the **stockport-loaves-and-fishes** repo → **Settings → Secrets and
variables → Actions → New repository secret.** Add all three:

- [ ] 2.1 `META_ACCESS_TOKEN` — the token from 1.5.
- [ ] 2.2 `META_PAGE_ID` — the Page ID from 1.6.
- [ ] 2.3 `META_IG_USER_ID` — the Instagram user ID from 1.6.

The `DRY_RUN` repository variable is already set to `true`, so nothing can
post yet. Good.

## Step 3 — Tidy the content (do NOT skip)

With the ledger empty, the first live run posts **every** eligible post at
once. As of now that list includes leftover test content. Fix each of these
in the CMS (app.pagescms.org → News & posts) before launch:

- [ ] 3.1 **"Test" post** ("Test test test", with the _Petrol Side_ photo) —
      **delete it**, or set its status to Draft. This must not reach the real
      accounts.
- [ ] 3.2 **"Thank you, from the kitchen"** — real, keepable content, but its
      last line calls itself "one of our test posts". Edit that parenthetical
      out (the website body is what people see when they click through from
      Facebook), or set it to Draft if you'd rather not launch with it.
- [ ] 3.3 **"What we need this week"** — this one is clean and genuinely
      useful; keep it, or update it to this week's real needs.
- [ ] 3.4 Decide about the rest: "Our new website" is website-only (won't
      post), "Getting ready for autumn" is scheduled for September (won't post
      until then), and the drafts stay hidden. Nothing to do unless you want
      to change them.

> Tell the developer/assistant if you'd like this tidy done for you — it's a
> couple of commits and fully reversible.

## Step 4 — Dry run against the real accounts (do NOT skip)

This is the rehearsal that replaces the throwaway page. It posts **nothing**.

- [ ] 4.1 GitHub → **Actions → Town crier → Run workflow**, leave
      **override_dry_run unticked**, run it.
- [ ] 4.2 Read the run's summary. Confirm: - **"🔑 Token health check: OK"** — your token and secrets work. - The **"would post"** lines show only the content you actually want
      out, with captions that read well. (If you still see "Test test
      test", go back to step 3.) - No warning that a photo isn't a JPEG (Instagram only accepts JPEG).
- [ ] 4.3 If anything looks wrong, fix it and re-run 4.1. Only move on when
      the summary is exactly what you want to appear on the real accounts.

## Step 5 — Launch (your decision, your hand on the switch)

- [ ] 5.1 GitHub → repo **Settings → Secrets and variables → Actions →
      Variables** tab → set **`DRY_RUN`** to **`false`**.
- [ ] 5.2 Trigger the first real run: **Actions → Town crier → Run
      workflow** (leave override unticked — with `DRY_RUN=false` it now posts
      for real). Or just wait: it also runs hourly and on the next published
      post.

## Step 6 — Immediately after launch

- [ ] 6.1 Check the real Facebook Page and Instagram — the posts from your
      step-4 summary should be there, once each.
- [ ] 6.2 Check the run committed the ledger (`.social/state.json` now lists
      what went out) — this is what stops anything posting twice.
- [ ] 6.3 Add the new Facebook Page link to the website's Contact page (it
      has a placeholder waiting) and tick off the Facebook item in
      `docs/FACTS_TO_CONFIRM.md`.

### If something goes out wrong

1. Set the `DRY_RUN` variable back to **`true`** — stops all further posting
   immediately.
2. Delete the bad post manually on Facebook/Instagram.
3. The post stays recorded in the ledger, so it won't repost. Fix the content
   in the CMS, then set `DRY_RUN` back to `false` when you're ready.

Nothing here can harm the website itself — it runs completely separately.
