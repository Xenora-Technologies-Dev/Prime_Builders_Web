"use client";

/**
 * Mobile / reduced-motion fallback:
 * Logo mark silhouette without white background plate.
 */
export function HeroVisualFallback() {
  return (
    <div className="absolute inset-0 overflow-hidden" aria-hidden>
      <div className="absolute inset-0 bg-[#061830]" />
      <div className="architectural-grid absolute inset-0 opacity-30" />
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 55% at 72% 40%, rgba(198,146,46,0.28) 0%, transparent 55%), radial-gradient(ellipse 50% 45% at 65% 70%, rgba(6,43,92,0.85) 0%, transparent 70%)",
        }}
      />

      {/* 3D-style logo mark (no white box) */}
      <div className="absolute inset-0 flex items-center justify-center md:justify-end md:pr-[8%]">
        <div className="relative flex w-[min(58vw,280px)] flex-col items-center opacity-95">
          <div className="relative h-[200px] w-[160px]">
            {/* P stem */}
            <div className="absolute bottom-6 left-6 h-[150px] w-[34px] bg-[#062B5C]" />
            {/* P bowl */}
            <div className="absolute left-[34px] top-6 h-[88px] w-[72px] rounded-r-full border-[34px] border-l-0 border-[#062B5C]" />
            {/* Tower */}
            <div className="absolute bottom-10 left-[48px] flex h-[130px] w-[22px]">
              <div className="h-full w-1/2 bg-[#d8dde3]" />
              <div className="h-full w-1/2 bg-gold-500" />
            </div>
            <div className="absolute left-[56px] top-1 h-5 w-1.5 bg-gold-400" />
            {/* Bridge */}
            <div className="absolute left-0 top-[108px] h-[14px] w-full rotate-[-4deg] bg-[#062B5C]">
              <div className="absolute inset-x-0 top-0 h-[3px] bg-gold-500" />
            </div>
          </div>
          <p className="mt-1 text-center text-[10px] font-semibold uppercase tracking-[0.2em] text-gold-400">
            Prime Plus Builders
          </p>
          <p className="mt-1 text-center text-[8px] uppercase tracking-[0.18em] text-steel">
            And Developers Pvt Ltd
          </p>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-44 bg-gradient-to-t from-navy-950 to-transparent" />
      <div className="gold-line absolute bottom-[15%] left-[8%] right-[8%] opacity-60" />
    </div>
  );
}
