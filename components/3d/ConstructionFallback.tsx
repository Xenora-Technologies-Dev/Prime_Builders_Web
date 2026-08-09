"use client";

/**
 * Non-WebGL fallback: proper bottom-to-top floor stack.
 */
export function ConstructionFallback({ progress = 1 }: { progress?: number }) {
  const floors = 12;
  const visible = Math.max(0, Math.round(progress * floors));

  return (
    <div
      className="relative flex h-full w-full items-end justify-center pb-10 pt-8"
      aria-hidden
    >
      <div className="blueprint-grid absolute inset-0 opacity-30" />
      <div className="relative flex w-full max-w-[220px] flex-col-reverse items-center gap-[3px]">
        {/* Foundation */}
        <div
          className="mb-1 h-3 w-[140%] bg-navy-900/80 transition-opacity duration-300"
          style={{ opacity: progress > 0.02 ? 1 : 0.2 }}
        />
        {Array.from({ length: floors }).map((_, i) => {
          const on = i < visible;
          return (
            <div
              key={i}
              className="relative w-full origin-bottom transition-all duration-400"
              style={{
                height: "22px",
                opacity: on ? 1 : 0.12,
                transform: on ? "scaleY(1) translateY(0)" : "scaleY(0.15) translateY(6px)",
                background: "linear-gradient(180deg, #0a3a72 0%, #062B5C 100%)",
                boxShadow: on ? "inset 0 -2px 0 #C6922E" : "none",
              }}
            >
              <div
                className="absolute inset-x-[12%] top-[30%] h-[38%] bg-gold-200/25"
                style={{ opacity: on && progress > 0.68 ? 0.7 : 0.25 }}
              />
            </div>
          );
        })}
        {progress > 0.85 && (
          <div className="absolute -top-2 h-3 w-12 bg-gold-500" />
        )}
      </div>
    </div>
  );
}
