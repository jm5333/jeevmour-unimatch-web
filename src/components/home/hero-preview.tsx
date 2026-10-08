import { ProfileCard } from "@/components/demo/profile-card";
import { PhotoSlot } from "@/components/ui/photo-slot";
import { demoProfiles } from "@/lib/demo/profiles";

/** Hero composition: campus photo slot + fictional app preview. */
export function HeroPreview() {
  const andre = demoProfiles.find((p) => p.id === "andre")!;
  return (
    <div className="relative mx-auto min-h-[500px] w-full max-w-[540px] sm:min-h-0 sm:pb-0">
      <PhotoSlot
        tone="lavender"
        ratio="aspect-[4/5]"
        className="w-[80%]"
        captionClassName="left-4 right-[48%] sm:right-[30%]"
        shortCaptionOnMobile
        shot="Two students laughing on campus steps at golden hour, one using a wheelchair. Candid, not posed."
      />
      <div className="absolute left-5 top-5 rounded-2xl bg-plum px-4 py-3 text-ivory shadow-lg">
        <p className="font-display text-lg italic leading-none">It&apos;s mutual.</p>
        <p className="mt-1 text-xs text-on-plum-muted">Demo preview</p>
      </div>
      <div className="animate-float absolute bottom-0 right-0 w-[56%] min-w-[210px] sm:bottom-4">
        <div className="rounded-[2rem] border-[7px] border-plum bg-ivory p-2 shadow-[0_24px_60px_rgba(36,19,47,0.28)]">
          <div className="h-[400px]">
            <ProfileCard profile={andre} compact />
          </div>
        </div>
        <p className="mt-2 text-center text-xs text-muted">Fictional demo profile</p>
      </div>
    </div>
  );
}
