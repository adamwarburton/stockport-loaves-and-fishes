/**
 * Every photo slot on the site, in ONE place.
 *
 * The site ships with tasteful, on-brand illustrated placeholders (SVGs in
 * public/images/site/) so it looks complete on day one with zero photography.
 * When the charity has real photos, you don't touch any page code — you swap a
 * path here and drop the file in public/images/site/. The full step-by-step is
 * in docs/IMAGES.md.
 *
 * Dignity rule (CLAUDE.md §1.8): never a photo of an identifiable person
 * experiencing homelessness. Food, hands, tables, the building, warmth. Real
 * photos come from the charity, with consent.
 *
 * `w`/`h` are the intrinsic aspect ratio the slot is designed around — match it
 * when you supply a real photo so nothing crops badly.
 */
export type ImageSlot = {
  /** Path under /public. Swap this to a real photo, e.g. "/images/site/hero.jpg". */
  src: string;
  /** Alt text. Rewrite this to describe the real photo when you add one. */
  alt: string;
  /** Design aspect ratio (also the ideal upload size in px). */
  w: number;
  h: number;
  /** True while this is still the shipped illustration, not a real photo. */
  placeholder: boolean;
};

export const images = {
  /** Homepage hero backdrop — wide, warm, behind the welcome. */
  hero: {
    src: "/images/site/hero.svg",
    alt: "A long table laid with steaming bowls of food, ready for Sunday dinner",
    w: 1600,
    h: 1000,
    placeholder: true,
  },
  /** Our Story — the boot-of-a-car beginning. */
  story: {
    src: "/images/site/story.svg",
    alt: "The back of a car with its boot open and hot food ready to serve",
    w: 1200,
    h: 1200,
    placeholder: true,
  },
  /** How to help — the big pan. "Small charity. Big pan." */
  pan: {
    src: "/images/site/pan.svg",
    alt: "A big cooking pot on the go in the kitchen",
    w: 1200,
    h: 900,
    placeholder: true,
  },
  /** Help page — a bowl handed across the table. */
  welcome: {
    src: "/images/site/welcome.svg",
    alt: "A bowl of hot food being passed from one pair of hands to another",
    w: 1200,
    h: 900,
    placeholder: true,
  },
} satisfies Record<string, ImageSlot>;

export type ImageName = keyof typeof images;
