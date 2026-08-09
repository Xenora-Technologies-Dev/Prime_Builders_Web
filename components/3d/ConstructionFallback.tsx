"use client";

/**
 * Non-WebGL fallback: bottom-to-top floor stack.
 * When autoPlay is on, CSS drives a continuous rise loop for mobile.
 */
export function ConstructionFallback({
  progress = 1,
  autoPlay = false,
}: {
  progress?: number;
  autoPlay?: boolean;
}) {
  const floors = 12;
  const visible = Math.max(0, Math.round(progress * floors));

  return (
    <div
      className="relative flex h-full w-full items-end justify-center pb-10 pt-8"
      aria-hidden
    >
      <div className="blueprint-grid absolute inset-0 opacity-30" />
      <div
        className={[
          "relative flex w-full max-w-[200px] flex-col-reverse items-center gap-[3px] sm:max-w-[220px]",
          autoPlay ? "motion-safe:animate-[buildLoop_5.5s_ease-in-out_infinite]" : "",
        ].join(" ")}
      >
        <div
          className="mb-1 h-3 w-[140%] bg-navy-900/80 transition-opacity duration-300"
          style={{ opacity: progress > 0.02 || autoPlay ? 1 : 0.2 }}
        />
        {Array.from({ length: floors }).map((_, i) => {
          const on = autoPlay ? true : i < visible;
          return (
            <div
              key={i}
              className={[
                "relative w-full origin-bottom transition-all duration-300",
                autoPlay
                  ? "motion-safe:animate-[floorPop_5.5s_ease-in-out_infinite]"
                  : "",
              ].join(" ")}
              style={{
                height: "20px",
                opacity: on ? 1 : 0.12,
                transform: on
                  ? "scaleY(1) translateY(0)"
                  : "scaleY(0.15) translateY(6px)",
                background: "linear-gradient(180deg, #0a3a72 0%, #062B5C 100%)",
                boxShadow: on ? "inset 0 -2px 0 #C6922E" : "none",
                animationDelay: autoPlay ? `${i * 0.12}s` : undefined,
              }}
            >
              <div
                className="absolute inset-x-[12%] top-[30%] h-[38%] bg-gold-200/25"
                style={{
                  opacity: on && (autoPlay || progress > 0.68) ? 0.7 : 0.25,
                }}
              />
            </div>
          );
        })}
        {(progress > 0.85 || autoPlay) && (
          <div className="absolute -top-2 h-3 w-12 bg-gold-500" />
        )}
      </div>
    </div>
  );
}
