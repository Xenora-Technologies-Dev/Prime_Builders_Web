import type { Metadata } from "next";
import { GALLERY_ITEMS } from "@/lib/constants";
import { GalleryGrid } from "@/components/ui/GalleryGrid";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Gallery",
  description:
    "A showcase of Prime Plus Builders works — construction in progress across house, school and commercial projects.",
};

export default function GalleryPage() {
  return (
    <div className="bg-warm-white text-navy-900">
      <header className="relative overflow-hidden bg-navy-950 pt-[calc(var(--spacing-nav)+2.5rem)] pb-16 text-warm-white sm:pb-20">
        <div className="architectural-grid pointer-events-none absolute inset-0 opacity-20" aria-hidden />
        <div className="container-site relative">
          <p className="eyebrow text-gold-400">Our works</p>
          <h1 className="mt-4 max-w-3xl font-display text-[clamp(2.4rem,7vw,4.5rem)] leading-[0.98]">
            Project
            <span className="block text-gold-400">Gallery.</span>
          </h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-warm-white/70 md:text-lg">
            Photographs and site footage from work currently underway. Each
            frame is a record of construction — structure, finishing and
            progress on the ground.
          </p>
        </div>
      </header>

      <section className="section-pad pb-28 sm:pb-24" aria-label="Project gallery">
        <div className="container-site">
          <GalleryGrid items={GALLERY_ITEMS} />
          <div className="mt-12 flex flex-col gap-4 border-t border-navy-800/10 pt-8 sm:flex-row sm:items-center sm:justify-between">
            <p className="max-w-md text-sm leading-relaxed text-muted">
              Have a similar project in mind? We would be glad to discuss
              construction, interior or infrastructure work.
            </p>
            <Button href="/#contact" variant="secondary-light">
              Start a conversation
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
