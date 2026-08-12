import Image from "next/image";

interface MediaFrameProps {
  src: string;
  alt: string;
  type?: "image" | "video";
  poster?: string;
  className?: string;
  priority?: boolean;
  sizes?: string;
  aspect?: string;
  showPlay?: boolean;
}

/**
 * Navy + gold architectural frame for gallery photography and video.
 */
export function MediaFrame({
  src,
  alt,
  type = "image",
  poster,
  className = "",
  priority = false,
  sizes = "(max-width: 768px) 100vw, 33vw",
  aspect = "aspect-[4/5] sm:aspect-[4/3]",
  showPlay = false,
}: MediaFrameProps) {
  return (
    <div
      className={[
        "group relative overflow-hidden bg-navy-950",
        "ring-1 ring-gold-500/25",
        "shadow-[0_18px_50px_rgba(4,26,53,0.18)]",
        className,
      ].join(" ")}
    >
      <span
        className="pointer-events-none absolute inset-0 z-20 border border-gold-500/35"
        aria-hidden
      />
      <span
        className="pointer-events-none absolute inset-[7px] z-20 border border-warm-white/15"
        aria-hidden
      />
      <span className="pointer-events-none absolute left-3 top-3 z-20 h-3 w-3 border-l border-t border-gold-500" aria-hidden />
      <span className="pointer-events-none absolute right-3 top-3 z-20 h-3 w-3 border-r border-t border-gold-500" aria-hidden />
      <span className="pointer-events-none absolute bottom-3 left-3 z-20 h-3 w-3 border-b border-l border-gold-500" aria-hidden />
      <span className="pointer-events-none absolute bottom-3 right-3 z-20 h-3 w-3 border-b border-r border-gold-500" aria-hidden />

      <div className={`relative overflow-hidden ${aspect}`}>
        {type === "video" ? (
          <video
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
            poster={poster}
            muted
            playsInline
            preload="metadata"
            aria-label={alt}
          >
            <source src={src} type="video/mp4" />
          </video>
        ) : (
          <Image
            src={src}
            alt={alt}
            fill
            priority={priority}
            sizes={sizes}
            className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
          />
        )}
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-navy-950/55 via-transparent to-navy-950/10"
          aria-hidden
        />
        {(type === "video" || showPlay) && (
          <span
            className="absolute left-1/2 top-1/2 z-10 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-gold-500/50 bg-navy-950/70 text-gold-400 backdrop-blur-sm"
            aria-hidden
          >
            <svg viewBox="0 0 24 24" className="ml-0.5 h-5 w-5 fill-current">
              <path d="M8 5v14l11-7z" />
            </svg>
          </span>
        )}
      </div>
    </div>
  );
}
