/**
 * Hand-drawn-feel line icons, inline SVG so they cost zero requests and zero
 * client JS and inherit `currentColor`. Keep them simple and consistent:
 * 24×24 box, 1.7 stroke, rounded caps. Decorative by default (aria-hidden);
 * pass a `title` only when an icon is the sole carrier of meaning.
 */
type IconProps = {
  className?: string;
  title?: string;
};

function Svg({ className, title, children }: IconProps & { children: React.ReactNode }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.7}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden={title ? undefined : true}
      role={title ? "img" : undefined}
    >
      {title ? <title>{title}</title> : null}
      {children}
    </svg>
  );
}

/** Bowl with steam — a hot meal. */
export function IconBowl(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M3 12h18a9 9 0 0 1-18 0Z" />
      <path d="M3 12h18" />
      <path d="M9 6c0-1.5 1.2-1.5 1.2-3M12 5c0-1.8 1.2-1.8 1.2-3.5M15 6c0-1.5 1.2-1.5 1.2-3" />
    </Svg>
  );
}

/** Cupped hand under a heart — "I need help". */
export function IconHelpingHand(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M12 9.5c-1.6-2.4-5-1-4 1.7.7 1.9 4 3.8 4 3.8s3.3-1.9 4-3.8c1-2.7-2.4-4.1-4-1.7Z" />
      <path d="M3 16c1.6 0 2.4 1.4 4 1.4h5.5c1 0 1-1.6 0-1.6H9" />
      <path d="M3 15v5" />
    </Svg>
  );
}

/** Hand holding a coin — giving money. */
export function IconGive(props: IconProps) {
  return (
    <Svg {...props}>
      <circle cx="12" cy="7" r="3.2" />
      <path d="M12 5.8v2.4M11 7h2" />
      <path d="M3 16c1.6 0 2.4 1.4 4 1.4h5.5c1 0 1-1.6 0-1.6H9" />
      <path d="M3 15v5" />
    </Svg>
  );
}

/** Two figures — volunteering, company. */
export function IconPeople(props: IconProps) {
  return (
    <Svg {...props}>
      <circle cx="8" cy="8" r="2.6" />
      <path d="M3.5 19c0-3 2-4.6 4.5-4.6S12.5 16 12.5 19" />
      <circle cx="16.5" cy="9" r="2.2" />
      <path d="M14 14.8c2.3-.4 5 1 5 4.2" />
    </Svg>
  );
}

/** Clock — when. */
export function IconClock(props: IconProps) {
  return (
    <Svg {...props}>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7.5V12l3 2" />
    </Svg>
  );
}

/** Map pin — where. */
export function IconPin(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M12 21s6.5-5.4 6.5-10.5A6.5 6.5 0 0 0 5.5 10.5C5.5 15.6 12 21 12 21Z" />
      <circle cx="12" cy="10.3" r="2.3" />
    </Svg>
  );
}

/** Plate + cutlery — what. */
export function IconPlate(props: IconProps) {
  return (
    <Svg {...props}>
      <circle cx="12" cy="12" r="8.5" />
      <circle cx="12" cy="12" r="4" />
    </Svg>
  );
}

export function IconPhone(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M6.5 3.5 9 4l1 3.5-1.8 1.4a11 11 0 0 0 4.9 4.9L14.5 15l3.5 1 .5 2.5c0 .8-.7 1.5-1.5 1.5A15.5 15.5 0 0 1 5 5c0-.8.7-1.5 1.5-1.5Z" />
    </Svg>
  );
}

export function IconMail(props: IconProps) {
  return (
    <Svg {...props}>
      <rect x="3" y="5.5" width="18" height="13" rx="2" />
      <path d="m3.5 7 8.5 6 8.5-6" />
    </Svg>
  );
}

/** Coat — give goods. */
export function IconCoat(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M9 3.5 12 6l3-2.5 3.5 2c1 .6 1.5 1.7 1.5 2.8V20a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V8.3c0-1.1.5-2.2 1.5-2.8Z" />
      <path d="M12 6v13" />
    </Svg>
  );
}

/** Speech bubble — spread the word. */
export function IconMegaphone(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M4 10v4l11 4V6L4 10Z" />
      <path d="M4 10H3a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h1" />
      <path d="M18 8a4 4 0 0 1 0 8" />
    </Svg>
  );
}

export function IconArrowRight(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M4 12h15" />
      <path d="m13 6 6 6-6 6" />
    </Svg>
  );
}

/** Big quotation mark for pull-quotes. Filled, not stroked. */
export function IconQuote({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M9.5 6C6.5 6.7 5 9 5 12.2V18h5.6v-5.4H8.2c0-1.6.6-2.7 2-3.3L9.5 6Zm9 0c-3 .7-4.5 3-4.5 6.2V18H19.6v-5.4h-2.4c0-1.6.6-2.7 2-3.3L18.5 6Z" />
    </svg>
  );
}

/** Small heart — used in the closing band and footer mark. */
export function IconHeart(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M12 20s-7-4.4-7-9.5A3.9 3.9 0 0 1 12 8a3.9 3.9 0 0 1 7 2.5C19 15.6 12 20 12 20Z" />
    </Svg>
  );
}
