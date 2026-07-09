/**
 * Every site-wide fact lives here, once. When the charity confirms a detail
 * or the domain moves, this is the only file that changes.
 *
 * Facts marked [CONFIRM] are draft-usable but unverified — the running log
 * is docs/FACTS_TO_CONFIRM.md. Nothing launches until that file is resolved.
 */
export const site = {
  name: "Stockport Loaves and Fishes",
  // The real domain (stockportloavesandfishes.org) cuts over later — a human
  // task. Until then everything, including RSS and social post URLs, uses this.
  url: "https://stockport-loaves-and-fishes.vercel.app",
  description:
    "A free hot meal and a warm welcome every Sunday evening in Stockport, " +
    "for anyone who's homeless or struggling. No referral. No form. Just come.",
  charityNumber: "1200660",

  email: "info@stockportloavesandfishes.org", // [CONFIRM]
  phone: "07429 567402", // [CONFIRM]
  phoneHref: "tel:+447429567402",

  // The charity's Facebook page — the new page the town crier posts to. The
  // two legacy pages are deliberately never linked. Swap this for a vanity URL
  // (facebook.com/…) here, once, if the page gets a username.
  facebook: "https://www.facebook.com/profile.php?id=61591566191491",

  venue: {
    name: "Stockport Baptist Church", // [CONFIRM]
    street: "Thomson Street",
    town: "Stockport",
    postcode: "SK3 9DR",
  },

  mealTimes: "Every Sunday, 5:00–6:30pm", // [CONFIRM]

  // Where to send people who need help before Sunday. We're honest that we
  // only open Sunday evenings, so these must always be current — verify
  // against docs/FACTS_TO_CONFIRM.md before launch and yearly after.
  urgentHelp: [
    {
      name: "The Wellspring",
      what: "Open every day for food, showers and advice.",
      where: "Harvey Street, Stockport SK1 1YD",
      phone: "0161 477 6344",
      phoneHref: "tel:+441614776344",
      url: "https://thewellspring.co.uk",
    },
    {
      name: "Stockport Homes housing options team",
      what: "The council's homelessness service — advice and emergency housing.",
      where: "Out of office hours, call 0161 474 2818.",
      phone: "0161 217 6016",
      phoneHref: "tel:+441612176016",
      url: "https://www.stockport.gov.uk/homeless-advice",
    },
  ],
} as const;

/** The public URL for a post — the same one the town crier puts in captions. */
export function postUrl(slug: string): string {
  return `${site.url}/news/${slug}`;
}
