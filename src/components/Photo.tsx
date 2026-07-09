import { images, type ImageName } from "@/lib/images";

/**
 * A framed image tied to a slot in src/lib/images.ts. While a slot still holds
 * its shipped illustration it gets a soft "artwork" frame so it reads as an
 * intentional graphic, not a missing photo. The day you point the slot at a
 * real photograph (see docs/IMAGES.md), the same frame flatters the photo and
 * the placeholder styling drops away automatically.
 *
 * Plain <img>: these are small local assets on zero-JS server-rendered pages,
 * so next/image would only add weight.
 */
export function Photo({
  name,
  className = "",
  rounded = "rounded-3xl",
  priority = false,
}: {
  name: ImageName;
  className?: string;
  rounded?: string;
  priority?: boolean;
}) {
  const img = images[name];
  return (
    <figure
      className={`relative overflow-hidden ${rounded} ${
        img.placeholder ? "bg-brand-50 ring-1 ring-brand-100" : ""
      } ${className}`}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={img.src}
        alt={img.alt}
        width={img.w}
        height={img.h}
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : undefined}
        className="h-full w-full object-cover"
      />
    </figure>
  );
}
