import { WaveBottom } from "@/components/Decor";

/**
 * The warm, textured banner every interior page opens with. A tinted, dotted
 * band that curves into the page body — so no page starts as a bare headline on
 * white. Keep the title in the display serif; keep straplines short.
 */
export function PageHeader({
  eyebrow,
  title,
  strapline,
  icon,
}: {
  eyebrow?: string;
  title: string;
  strapline?: string;
  icon?: React.ReactNode;
}) {
  return (
    <header className="relative bg-brand-50 texture-dots">
      <div className="mx-auto max-w-5xl px-4 pb-16 pt-12 sm:pt-14">
        {eyebrow && (
          <p className="eyebrow text-brand-700">
            {icon}
            {eyebrow}
          </p>
        )}
        <h1 className="mt-3 font-[family-name:var(--font-display)] text-4xl font-semibold text-brand-900 sm:text-5xl">
          {title}
        </h1>
        {strapline && <p className="mt-4 max-w-2xl text-xl text-ink/80">{strapline}</p>}
      </div>
      <WaveBottom fill="text-paper" />
    </header>
  );
}
