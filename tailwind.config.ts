import type { Config } from "tailwindcss";

/**
 * The palette, as required by CLAUDE.md §7. Tailwind v4 is normally configured
 * in CSS, but the palette is *recorded here* (loaded via `@config` in
 * src/app/globals.css) so there is exactly one commented, reviewable source
 * of truth for colour decisions.
 *
 * Direction: teal-forward — a quiet nod to the charity's "Welcome" sheet —
 * with a warm amber accent, on warm paper rather than clinical white.
 * The site is deliberately light-only: one palette, one set of contrast
 * checks, no dark-mode surprises on cheap phones.
 *
 * Contrast (WCAG 2.1 AA needs 4.5:1 for body text, 3:1 for large text).
 * Every pairing used on the site is checked here:
 *   ink   on paper      ≈ 16.4:1  ✓ body text
 *   brand-800 on paper  ≈  7.0:1  ✓ links, headings
 *   brand-700 on white  ≈  4.8:1  ✓ small text on white cards
 *   white on brand-800  ≈  7.4:1  ✓ header, footer
 *   white on brand-900  ≈  9.6:1  ✓ hero
 *   ink on accent-300   ≈ 11.4:1  ✓ the "I need help" button
 *   ink on accent-100   ≈ 14.9:1  ✓ highlight boxes
 */
const config: Config = {
  theme: {
    extend: {
      colors: {
        // Warm near-white page background and near-black warm text.
        paper: "#fdfbf7",
        ink: "#1c1917",
        // Brand teal. Same hues as Tailwind's teal scale, named for meaning.
        brand: {
          50: "#f0fdfa",
          100: "#ccfbf1",
          200: "#99f6e4",
          600: "#0d9488",
          700: "#0f766e",
          800: "#115e59",
          900: "#134e4a",
          950: "#042f2e",
        },
        // Warm accent — used sparingly: the help button, highlights, steam.
        accent: {
          100: "#fef3c7",
          200: "#fde68a",
          300: "#fcd34d",
          400: "#fbbf24",
          700: "#b45309",
        },
      },
    },
  },
};

export default config;
