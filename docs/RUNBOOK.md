# Runbook — how to run the website (no computer skills required)

This guide is for the volunteers of Stockport Loaves and Fishes. It explains
how to update the website, and what to do when something looks wrong. You
don't need to understand code, and nothing you do by following this guide can
break the website in a way that can't be undone.

**The one-line version:** you edit the website through a friendly editing page
called **Pages CMS**. You type, you press Save, and a couple of minutes later
the website updates itself.

---

## 1. How it all fits together (30 seconds, no jargon)

- The website's words and photos live in a safe storage place on the internet
  (called GitHub — you never need to look at it).
- **Pages CMS** (app.pagescms.org) is the friendly editing page that reads and
  writes that storage for you. It shows you forms, not code.
- Every time you save, the website rebuilds itself automatically. This takes
  **2–3 minutes** — a save is never instant, so don't panic.
- Every change is kept forever in the history, so anything can be undone by
  someone technical. You cannot permanently destroy anything from the editor.

---

## 2. Getting access (one-off, per person)

Access is by invitation. A volunteer does **not** need a GitHub account —
invitations work with just an email address.

**If you're the person being invited:**

1. You'll get an email inviting you to Pages CMS. Open it and follow the link.
2. Sign in with your email address — it sends you a login link or code. No
   password to remember.
3. You'll see "Stockport Loaves and Fishes" in your list. Click it. That's it —
   you're in.

**If you're the person doing the inviting (needs the admin/GitHub login):**

1. Sign in at [app.pagescms.org](https://app.pagescms.org) with the GitHub
   account that owns the site.
2. Open the Stockport Loaves and Fishes site, go to **Settings →
   Collaborators**.
3. Add the volunteer's email address. Done.

---

## 3. Publishing a news post (the thing you'll do most)

1. Go to [app.pagescms.org](https://app.pagescms.org) and sign in.
2. Click **News & posts** in the left-hand menu.
3. Click **Add an entry** (top right).
4. Fill in the form — each box has its own hint underneath, but in short:
   - **Title** — short and warm. "What we need this week" beats
     "Announcement regarding donations".
   - **When should this go live?** — UK date and time. Pick a time that's
     already passed to publish immediately, or a future time to schedule it.
     The post stays invisible until that moment.
   - **Status** — leave as **Draft** while you're writing (drafts are
     completely invisible). Switch to **Published** when it's ready.
   - **Photo** — optional, but Instagram won't share a post without one.
     Please: food, hands, tables, the building — never identifiable faces of
     our guests.
   - **Photo description** — one sentence describing the photo for people who
     can't see it. Needed whenever there's a photo.
   - **How should this read on Facebook/Instagram?** — a short, friendly
     version for social media. Leave it blank and we'll just use the title.
   - **Where should we share it?** — Facebook and Instagram are ticked by
     default. Untick both for website-only posts.
   - **The post itself** — the full version for the website.
5. Click **Save**.
6. Wait 2–3 minutes, then check
   [the news page](https://stockport-loaves-and-fishes.vercel.app/news).
   If you published it (status Published, go-live time in the past), it's
   there. If not, see §7.

**Scheduling for later:** write the post now, set "When should this go live?"
to Sunday 6pm (or whenever), set status to Published, save. It will appear on
the website within the hour after that time passes. No further action needed.

**Editing or unpublishing:** open the post in News & posts, change what you
need (or switch status back to Draft to hide it), save. Same 2–3 minute wait.

---

## 4. Updating "What we need now"

This is the list on the [How to help](https://stockport-loaves-and-fishes.vercel.app/how-to-help)
page. Keeping it current is genuinely one of the most useful five-minute jobs
in the charity.

1. Sign in at app.pagescms.org and click **What we need now**.
2. Edit the list — one item per bullet point. Add what's short, remove what
   the cellar is full of.
3. Save. It's live in 2–3 minutes.

---

## 5. Changing the wording on the main pages

The words on the Home, I need help, Our story, How to help and Contact pages
can all be edited under **Page copy**. Pick the page, change the wording, save.

Two gentle rules:

- The **I need help** page is written to be readable by someone exhausted, on
  a cracked phone screen, in a hurry. Short words, short sentences. If in
  doubt, make it simpler.
- Don't add promises we can't keep. Honest and small beats impressive and
  wrong.

(You can't create or delete pages from the editor — that's deliberate, so
nothing can break. If a whole new page is needed, that's a developer job.)

---

## 6. Photos: the two rules

1. **Dignity first.** Never upload a photo where a guest is identifiable,
   even accidentally in the background. Food, hands, tables, pans, the
   building — always fine. When real people appear, we need their genuine OK
   first.
2. **Size.** Photos straight off a phone are fine. If you're resizing,
   aim for about 1600 pixels wide — big enough for any screen, small enough
   to load fast on a cheap phone.

---

## 7. "My change isn't showing up"

Work down this list — it's nearly always the first three:

1. **Wait 3 minutes.** Saves are never instant. Make a brew.
2. **Check the status.** Is the post still set to Draft?
3. **Check the go-live time.** Is "When should this go live?" still in the
   future? (Scheduled posts appear within the hour after their time passes.)
4. **Hard-refresh the page.** Phones and browsers cache pages. Pull down to
   refresh, or try a private/incognito window.
5. **Still nothing after 15 minutes?** Something may have genuinely gone
   wrong with the rebuild. Tell the tech contact (see §9) — nothing is lost,
   your words are saved safely either way.

---

## 8. Facebook & Instagram sharing (the "town crier")

New published posts are shared to the charity's Facebook page and Instagram
automatically by a robot we call the town crier. You control it entirely from
the post form (the social text box and the channel ticks).

- Posts without a photo are shared to Facebook only — Instagram requires a
  photo, so the town crier politely skips it and says so in its notes.
- Shares go out within the hour after a post goes live, not instantly.
- **Status right now:** the town crier is built in a later phase and switched
  off until it's been tested end-to-end. Until then, posts publish to the
  website only, whatever the ticks say. This paragraph will be updated when
  it goes live.
- When something breaks (e.g. the connection to Facebook expires), the system
  raises its own alarm — a note appears in the project's issue list and the
  tech contact deals with it. The fix steps live in a section that will be
  added in that phase.

---

## 9. Who to call

| Problem                                | Who                                                                          |
| -------------------------------------- | ---------------------------------------------------------------------------- |
| "How do I…?" questions about editing   | Any volunteer who's used the editor, then the tech contact                   |
| Website down, edit stuck, error emails | The tech contact                                                             |
| Facebook/Instagram sharing broken      | The tech contact (the system will usually have raised its own alarm already) |

**Tech contact:** the project is currently looked after by the project lead
(Adam). When ownership transfers to the charity, this section gets each
role's name and contact details — that handover checklist is in
`docs/HANDOVER.md`.

---

_Sections still to be written as the project grows: town-crier fix-it guides
("post didn't appear on Facebook", "token needs attention") arrive with
Phase 4, and the ownership handover checklist lives in `docs/HANDOVER.md`._
