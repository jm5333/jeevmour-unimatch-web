/**
 * A clearly labelled placeholder for photography.
 *
 * UniMatch should use authentic, licensed campus photos. Until those exist,
 * this component reserves the space, describes the intended shot, and
 * provides the alt text so the layout never looks broken or fake.
 * Replace it with next/image once real photos are licensed.
 */
type Tone = "lavender" | "coral" | "plum" | "ivory";

const tones: Record<Tone, string> = {
  lavender: "bg-lavender-200 text-plum",
  coral: "bg-coral-100 text-plum",
  plum: "bg-plum-700 text-ivory",
  ivory: "bg-ivory-200 text-plum",
};

export function PhotoSlot({
  shot,
  tone = "lavender",
  className = "",
  ratio = "aspect-[4/5]",
  captionClassName = "inset-x-4",
  shortCaptionOnMobile = false,
}: {
  /** Show only "Photo placeholder" on small screens (description stays in the label). */
  shortCaptionOnMobile?: boolean;
  /** Override caption placement, e.g. when something overlaps the slot. */
  captionClassName?: string;
  /** Description of the photo that belongs here. Also used as alt text. */
  shot: string;
  tone?: Tone;
  className?: string;
  ratio?: string;
}) {
  return (
    <figure
      role="img"
      aria-label={`Photo placeholder: ${shot}`}
      className={`relative overflow-hidden rounded-[var(--radius-panel)] ${tones[tone]} ${ratio} ${className}`}
    >
      {/* Subtle linework so the slot reads as intentional, not empty */}
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.16]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(125deg, currentColor 0 1px, transparent 1px 16px)",
        }}
      />
      <figcaption className={`absolute bottom-4 ${captionClassName} rounded-2xl bg-ivory/95 p-3 text-left text-[0.8rem] leading-snug text-plum shadow-sm`}>
        <span className="block font-semibold">Photo placeholder</span>
        <span className={`text-muted ${shortCaptionOnMobile ? "hidden sm:inline" : ""}`}>{shot}</span>
      </figcaption>
    </figure>
  );
}
