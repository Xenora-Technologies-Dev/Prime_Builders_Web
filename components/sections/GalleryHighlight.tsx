"use client";

import { GALLERY_HIGHLIGHTS } from "@/lib/constants";
import { MediaFrame } from "@/components/ui/MediaFrame";
import { Button } from "@/components/ui/Button";
import { SectionReveal } from "@/components/ui/SectionReveal";

export function GalleryHighlight() {
  return (
    <section
      id="gallery-preview"
      className="relative overflow-hidden bg-navy-900 section-pad"
      aria-labelledby="gallery-preview-heading"
    >
      <div className="architectural-grid pointer-events-none absolute inset-0 opacity-15" aria-hidden />
      <div className="container-site relative">
        <SectionReveal>
          <div className="mb-10 flex flex-col gap-6 md:mb-12 md:flex-row md:items-end md:justify-between">
            <div className="max-w-xl">
              <p data-reveal className="eyebrow text-gold-400">
                Gallery
              </p>
              <h2
                id="gallery-preview-heading"
                data-reveal
                className="mt-4 font-display text-[clamp(2rem,5vw,3.5rem)] text-warm-white"
              >
                Recent works
              </h2>
              <p
                data-reveal
                className="mt-4 max-w-lg text-base leading-relaxed text-warm-white/65 md:text-lg"
              >
                A look at construction currently underway — structure, finishing
                and site progress from our live projects.
              </p>
            </div>
            <div data-reveal className="shrink-0">
              <Button href="/gallery" variant="secondary" dataCursor="EXPLORE">
                View more
              </Button>
            </div>
          </div>

          <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {GALLERY_HIGHLIGHTS.map((item, index) => (
              <li key={item.id} data-reveal>
                <a href="/gallery" className="block" data-cursor="EXPLORE">
                  <MediaFrame
                    src={item.src}
                    alt={item.alt}
                    type={item.type}
                    poster={item.poster}
                    priority={index === 0}
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  <p className="mt-4 text-[10px] font-semibold uppercase tracking-[0.22em] text-gold-400">
                    {item.category}
                  </p>
                  <h3 className="mt-1.5 font-display text-2xl text-warm-white">
                    {item.title}
                  </h3>
                </a>
              </li>
            ))}
          </ul>
        </SectionReveal>
      </div>
    </section>
  );
}
