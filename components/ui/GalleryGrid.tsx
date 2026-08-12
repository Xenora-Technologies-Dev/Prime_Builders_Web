"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { GALLERY_ITEMS } from "@/lib/constants";
import { MediaFrame } from "@/components/ui/MediaFrame";

type GalleryItem = (typeof GALLERY_ITEMS)[number];

export function GalleryGrid({ items }: { items: readonly GalleryItem[] }) {
  const [active, setActive] = useState<GalleryItem | null>(null);

  useEffect(() => {
    if (!active) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActive(null);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [active]);

  return (
    <>
      <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item, index) => (
          <li key={item.id}>
            <button
              type="button"
              onClick={() => setActive(item)}
              className="w-full text-left"
              aria-label={`Open ${item.title}`}
            >
              <MediaFrame
                src={item.src}
                alt={item.alt}
                type={item.type}
                poster={item.poster}
                priority={index < 2}
                showPlay={item.type === "video"}
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
              <div className="mt-4 px-1">
                <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-gold-600">
                  {item.category}
                </p>
                <h3 className="mt-1.5 font-display text-2xl text-navy-900">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {item.caption}
                </p>
              </div>
            </button>
          </li>
        ))}
      </ul>

      <AnimatePresence>
        {active && (
          <motion.div
            className="fixed inset-0 z-[90] flex items-center justify-center bg-navy-950/88 p-4 backdrop-blur-md sm:p-8"
            data-lenis-prevent
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActive(null)}
            role="dialog"
            aria-modal="true"
            aria-label={active.title}
          >
            <motion.div
              className="relative w-full max-w-4xl"
              initial={{ y: 16, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 12, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                onClick={() => setActive(null)}
                className="absolute -top-10 right-0 text-[11px] font-semibold uppercase tracking-[0.2em] text-warm-white/80 hover:text-gold-400"
              >
                Close
              </button>
              <div className="overflow-hidden ring-1 ring-gold-500/30">
                {active.type === "video" ? (
                  <video
                    className="max-h-[72vh] w-full bg-navy-950 object-contain"
                    poster={active.poster}
                    controls
                    autoPlay
                    playsInline
                  >
                    <source src={active.src} type="video/mp4" />
                  </video>
                ) : (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={active.src}
                    alt={active.alt}
                    className="max-h-[72vh] w-full object-contain bg-navy-950"
                  />
                )}
              </div>
              <p className="mt-4 text-[10px] font-semibold uppercase tracking-[0.22em] text-gold-400">
                {active.category}
              </p>
              <p className="mt-1 font-display text-2xl text-warm-white">
                {active.title}
              </p>
              <p className="mt-2 text-sm text-warm-white/70">{active.caption}</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
