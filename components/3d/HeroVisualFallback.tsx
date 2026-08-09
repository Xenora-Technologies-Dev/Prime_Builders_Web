"use client";

/**
 * Animated architectural fallback for mobile / tablet / reduced-motion.
 * Designed as a living composition — not a static placeholder.
 */
export function HeroVisualFallback() {
  return (
    <div className="absolute inset-0 overflow-hidden" aria-hidden>
      <div className="absolute inset-0 bg-[#061830]" />
      <div className="architectural-grid absolute inset-0 opacity-25 motion-safe:animate-[gridDrift_28s_linear_infinite]" />

      <div
        className="absolute inset-0 motion-safe:animate-[glowPulse_6s_ease-in-out_infinite]"
        style={{
          background:
            "radial-gradient(ellipse 70% 55% at 70% 42%, rgba(198,146,46,0.32) 0%, transparent 55%), radial-gradient(ellipse 55% 50% at 60% 75%, rgba(6,43,92,0.9) 0%, transparent 70%)",
        }}
      />

      {/* Rising skyline */}
      <div className="absolute bottom-[18%] right-0 flex h-[55%] w-[88%] items-end justify-end gap-1.5 pr-4 sm:w-[70%] sm:pr-10">
        {[
          { h: "42%", d: "0s" },
          { h: "68%", d: "0.08s" },
          { h: "88%", d: "0.16s" },
          { h: "55%", d: "0.24s" },
          { h: "72%", d: "0.12s" },
          { h: "40%", d: "0.2s" },
        ].map((b, i) => (
          <div
            key={i}
            className="relative w-[11%] origin-bottom bg-gradient-to-t from-[#041A35] via-[#0a3a72] to-[#1a5ca0]/85 motion-safe:animate-[riseIn_1.1s_ease-out_both]"
            style={{ height: b.h, animationDelay: b.d }}
          >
            {i === 2 && (
              <>
                <div className="absolute left-1/2 top-0 h-6 w-1 -translate-x-1/2 -translate-y-full bg-gold-500 motion-safe:animate-[spireGlow_2.8s_ease-in-out_infinite]" />
                <div className="absolute left-[-95%] top-[42%] h-[3px] w-[290%] origin-left bg-gradient-to-r from-transparent via-gold-500 to-transparent motion-safe:animate-[bridgeDraw_1.4s_ease-out_0.5s_both]" />
              </>
            )}
            <div className="absolute inset-x-1 top-3 bottom-4 grid grid-cols-2 gap-0.5 opacity-35">
              {Array.from({ length: 8 }).map((_, w) => (
                <div
                  key={w}
                  className="bg-gold-200/40 motion-safe:animate-[windowFlicker_3.5s_ease-in-out_infinite]"
                  style={{ animationDelay: `${(i + w) * 0.15}s` }}
                />
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Logo mark — compact, no white plate */}
      <div className="absolute right-[6%] top-[22%] scale-90 opacity-90 motion-safe:animate-[floatMark_5s_ease-in-out_infinite] sm:top-[18%] sm:scale-100 md:right-[10%]">
        <div className="relative h-[120px] w-[96px]">
          <div className="absolute bottom-4 left-3 h-[92px] w-[22px] bg-[#062B5C]" />
          <div className="absolute left-[22px] top-3 h-[54px] w-[46px] rounded-r-full border-[22px] border-l-0 border-[#062B5C]" />
          <div className="absolute bottom-6 left-[30px] flex h-[80px] w-[14px]">
            <div className="h-full w-1/2 bg-[#d8dde3]" />
            <div className="h-full w-1/2 bg-gold-500" />
          </div>
          <div className="absolute left-0 top-[62px] h-[9px] w-full rotate-[-4deg] bg-[#062B5C]">
            <div className="absolute inset-x-0 top-0 h-[2px] bg-gold-500" />
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-navy-950 via-navy-950/80 to-transparent" />
      <div className="gold-line absolute bottom-[12%] left-[8%] right-[8%] opacity-50" />
    </div>
  );
}
