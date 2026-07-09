# Adding real photos to the site

The site ships with hand-drawn **illustrations** in the key picture spots — the
homepage hero, the help page, the how-to-help page and the our-story page. They
are there so the site looks warm and finished on day one, with zero photography.

When the charity has real photos, you swap them in. This guide is the whole job.
You do **not** need to touch any page code — every picture spot is wired to one
small settings file.

---

## The golden rule (read this first)

**Never use a photo of an identifiable person who is homeless or struggling.**
It's in the charity's DNA and it's rule 1 of the project (`CLAUDE.md` §1.8).

Good, safe subjects:

- Food: a pan on the go, bowls of dinner, a laid table, bread.
- Hands: serving, stirring, carrying, passing a plate (faces not needed).
- The place: the church hall, the door, tables and chairs being set up.
- Warmth: steam, candles, string lights, a full kitchen.

If you have a photo **with** people in it and they've happily agreed to be shown
(volunteers, say), that's fine — consent is the test. When in doubt, leave it out
and use a photo of the food.

---

## The four picture spots

| Spot      | Where it shows                           | Ideal size (px)                      | Good subject                                        |
| --------- | ---------------------------------------- | ------------------------------------ | --------------------------------------------------- |
| `hero`    | Homepage, big picture beside the welcome | **1600 × 1000** (landscape)          | A laid table, bowls of dinner, the hall ready to go |
| `welcome` | Help page, beside "Every Sunday…"        | **1200 × 900** (landscape)           | A bowl handed across the table; hands serving       |
| `pan`     | How-to-help page, beside "Give money"    | **1200 × 900** (landscape)           | The big pan on the stove, a ladle, steam            |
| `story`   | Our-story page, big picture at the top   | **1200 × 1200** (square-ish is fine) | The kitchen, a full table, an evening scene         |

Match the shape roughly and nothing will crop badly. A phone photo is plenty —
you don't need a fancy camera. Aim for good light and get in close.

---

## How to swap one in (about two minutes)

**1. Put your photo in the folder.**
Save it into `public/images/site/` with a simple lower-case name and no spaces,
e.g. `hero.jpg`, `pan.jpg`. JPG or PNG both work.

**2. Point the spot at it.**
Open `src/lib/images.ts`. Find the spot you're changing (e.g. `hero`) and edit
two lines:

```ts
hero: {
  src: "/images/site/hero.jpg",          // ← was hero.svg; point it at your file
  alt: "Volunteers laying out bowls of stew on the long table",  // ← describe YOUR photo
  w: 1600,
  h: 1000,
  placeholder: false,                     // ← flip to false: it's a real photo now
},
```

- `src` — the path to your file, always starting `/images/site/`.
- `alt` — a short, plain sentence describing what's in the photo, for people using
  a screen reader. Describe what you'd say on the phone: _"a big pan of curry with
  a ladle resting in it."_ Don't write "photo of…"; just say what it is.
- `placeholder: false` — this drops the soft "artwork" frame so your photo shows
  cleanly. (Leave it `true` only while it's still a drawing.)

**3. Save, commit, done.** Push to `main` and Vercel rebuilds the site with your
photo in place. Nothing else changes.

> Prefer not to touch code at all? You can also just **overwrite the illustration
> with a same-named file** — e.g. drop a `hero.svg` that is actually your exported
> image — but editing `images.ts` is cleaner and lets you write proper alt text,
> so it's the recommended way.

---

## News-post photos are separate

Photos **inside a news post** are added the easy way, in the CMS, when you write
the post ("Photo" and "Photo description" fields). Those live in
`public/images/posts/` and don't need this file at all. This guide is only for the
four fixed illustrations above.

---

## If a picture looks stretched or cut off

You've probably used a very different shape from the table above (e.g. a tall
portrait photo in a wide spot). Either crop your photo to roughly the ideal shape
before uploading, or update the `w` and `h` numbers in `images.ts` to match your
photo's real width and height in pixels. The site always keeps the whole spot
filled; matching the shape just stops it cropping the bits you wanted to keep.
