/**
 * Decorative section transitions. Pure SVG, no JS. A soft curved edge between
 * coloured bands stops the page reading as stacked rectangles and gives it the
 * warm, hand-made feel of a good charity site.
 *
 * `fill` is a Tailwind text-colour class (the wave is drawn in currentColor);
 * set it to the colour of the section the wave should blend *into*.
 */

/** Gentle curve sitting at the BOTTOM of a coloured band, curving into the next. */
export function WaveBottom({ fill = "text-paper" }: { fill?: string }) {
  return (
    <div className={`pointer-events-none -mb-px ${fill}`} aria-hidden="true">
      <svg
        viewBox="0 0 1440 90"
        preserveAspectRatio="none"
        className="block h-[42px] w-full sm:h-[70px]"
      >
        <path d="M0 90V40c180 34 420 46 720 20S1260 6 1440 34V90Z" fill="currentColor" />
      </svg>
    </div>
  );
}

/** Curve sitting at the TOP of a coloured band (mirror of WaveBottom). */
export function WaveTop({ fill = "text-paper" }: { fill?: string }) {
  return (
    <div className={`pointer-events-none -mt-px ${fill}`} aria-hidden="true">
      <svg
        viewBox="0 0 1440 90"
        preserveAspectRatio="none"
        className="block h-[42px] w-full sm:h-[70px]"
      >
        <path d="M0 0v50c180-34 420-46 720-20S1260 84 1440 56V0Z" fill="currentColor" />
      </svg>
    </div>
  );
}

/** Three little rising strokes of steam — a warm full stop for section headings. */
export function Steam({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 40 28"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.4}
      strokeLinecap="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M12 26c0-5 3-5 3-10s-3-5-3-10" />
      <path d="M20 26c0-5.5 3.4-5.5 3.4-11S20 9.5 20 4" />
      <path d="M28 26c0-5 3-5 3-10s-3-5-3-10" />
    </svg>
  );
}
