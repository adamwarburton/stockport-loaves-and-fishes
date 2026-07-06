# Phase 4 live test — the script

Run this **after** completing `docs/META_SETUP.md` with the **throwaway**
Page and Instagram account, with the three GitHub secrets pointing at the
throwaway assets. Do the steps in order; each has an expected result. If any
expected result doesn't happen, stop and investigate before continuing —
that's the point of the throwaway.

Safety recap: the repository variable `DRY_RUN` stays `true` throughout.
Live posting happens only via the manual **override_dry_run** tick, run by
run, on purpose. Nothing here touches the real Page.

**Where things are:** GitHub → **Actions → Town crier → Run workflow** is
"the button". Ticking **override_dry_run** makes that one run post for real.

---

## Before you start

- [ ] 0.1 The three secrets (`META_ACCESS_TOKEN`, `META_PAGE_ID`,
      `META_IG_USER_ID`) point at the **throwaway** assets.
- [ ] 0.2 Decide what the crier's backlog should post. Right now the ledger
      is empty, so the first live run will post every eligible post — the
      seed posts _and_ anything you've made in the CMS (e.g. the `Test`
      post). Unpublish (switch to Draft) anything you don't want in the test,
      or leave it all — it's a throwaway page.

## Test 1 — Dry run sanity check (posts nothing)

- [ ] 1.1 Press the button **without** ticking override.
- [ ] 1.2 **Expect:** green run; summary says "🏜 DRY RUN", "Token health
      check: OK" (proves the secrets work), and lists what _would_ post.
      Nothing appears on the throwaway page.

## Test 2 — Image post + no-image post (the first live fire)

- [ ] 2.1 Press the button **with override_dry_run ticked**.
- [ ] 2.2 **Expect:** green run. On the throwaway Facebook Page: a photo
      post for each eligible post with an image, and a plain link post for
      each without. On the throwaway Instagram: only the posts with JPEG
      photos, with "link in bio" phrasing where no social text was written.
- [ ] 2.3 **Expect:** a new commit on main by `town-crier[bot]`:
      "chore(social): record cross-posts [skip ci]" — the ledger now lists
      each post/channel with ids. Posts without images show
      `"instagram": {"skipped": "no-image"}`.
- [ ] 2.4 Press the button again **with override ticked**.
      **Expect:** green run, "0 with work to do", and **no duplicates** on
      the page. This is the double-post guarantee working.

## Test 3 — Scheduled post

- [ ] 3.1 In the CMS, create a post: status **Published**, go-live time
      about **30–40 minutes from now**, with a JPEG photo. Save.
- [ ] 3.2 Run the button (override ticked) **before** the go-live time.
      **Expect:** the new post is _not_ posted ("0 with work to do" for it —
      it isn't eligible yet).
- [ ] 3.3 Wait for the go-live time to pass, then either wait for the hourly
      run (:17 past the hour — note: the hourly cron runs in DRY_RUN, so for
      this test press the button with override after the time passes).
      **Expect:** the post appears on the website first (within the hour),
      then posts to the throwaway page on the next override run. The
      liveness gate may defer it one run if Vercel hasn't rebuilt yet —
      that's correct behaviour, not a failure.

## Test 4 — Deliberate failure → issue

- [ ] 4.1 Break something on purpose: edit the `META_PAGE_ID` secret to
      `12345` (keep the real value in your clipboard/notes).
- [ ] 4.2 Publish a quick new CMS post (any title, no photo needed), then
      press the button (override ticked).
- [ ] 4.3 **Expect:** red run; an issue appears labelled
      `cross-post-failure`, naming the post and channel, with a sanitised
      error and a link to the runbook. No token or URL query strings
      anywhere in it.
- [ ] 4.4 Restore the correct `META_PAGE_ID`. Re-run with override.
      **Expect:** green; the failed post now posts; close the issue.

## Test 5 — Token-death alarm

- [ ] 5.1 Edit the `META_ACCESS_TOKEN` secret to `broken-on-purpose`.
- [ ] 5.2 Press the button (override ticked — with a dead token nothing can
      post anyway).
- [ ] 5.3 **Expect:** red run that stops at the health check; an issue
      titled **"⚠️ Social posting is broken — token needs attention"**
      appears, linking to RUNBOOK §10.
- [ ] 5.4 Restore the real token. Re-run. **Expect:** green, "Token health
      check: OK". Close the issue.

## Test 6 — Website-only post

- [ ] 6.1 In the CMS, publish a post with **both channel ticks off**.
- [ ] 6.2 Run with override. **Expect:** it never appears in the plan, on
      the page, or in the ledger. It's on the website only.

## After the test — switching to the real assets

- [ ] 7.1 Delete the test posts from the CMS (or set them to Draft), and
      clean the ledger: the tech contact resets `.social/state.json` to
      `{ "posts": {} }` in a commit, so the real page gets a fresh start.
      **Decide deliberately** which historical posts should be announced on
      the real page on day one — anything already in the ledger won't be;
      anything eligible and not in the ledger will be.
- [ ] 7.2 Repeat META_SETUP.md steps 5.6–7 with the **real** Page and
      Instagram IDs and a fresh token; delete the throwaway Page/account.
- [ ] 7.3 Run the button **without** override. **Expect:** dry-run summary
      showing exactly what the first real posts would be. Read it carefully.
- [ ] 7.4 **The launch decision — a human's, made deliberately:** set the
      repository variable `DRY_RUN` to `false`. From then on the crier posts
      for real, hourly and on every publish. (RUNBOOK §8's status paragraph
      gets updated at this point.)
