"use client";

import { COMPANY } from "@/lib/constants";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";

/**
 * Persistent bottom-right WhatsApp CTA — pulse highlight + periodic vibrate.
 */
export function FloatingWhatsApp() {
  return (
    <div className="pointer-events-none fixed bottom-5 right-5 z-[70] sm:bottom-7 sm:right-7">
      <a
        href={COMPANY.whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Chat on WhatsApp: ${COMPANY.phone}`}
        className="pointer-events-auto group relative flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_10px_30px_rgba(37,211,102,0.45)] outline-none transition-transform duration-300 hover:scale-105 focus-visible:ring-2 focus-visible:ring-[#25D366] focus-visible:ring-offset-2 focus-visible:ring-offset-navy-950 sm:h-16 sm:w-16"
      >
        {/* Soft highlight rings */}
        <span
          className="absolute inset-0 rounded-full bg-[#25D366]/40 motion-safe:animate-[waPulse_2.4s_ease-out_infinite]"
          aria-hidden
        />
        <span
          className="absolute inset-0 rounded-full bg-[#25D366]/25 motion-safe:animate-[waPulse_2.4s_ease-out_infinite]"
          style={{ animationDelay: "0.7s" }}
          aria-hidden
        />

        {/* Button face with vibrate */}
        <span className="relative z-10 flex h-full w-full items-center justify-center rounded-full bg-[#25D366] motion-safe:animate-[waVibrate_3.2s_ease-in-out_infinite] group-hover:animate-none">
          <WhatsAppIcon className="h-7 w-7 sm:h-8 sm:w-8" />
        </span>

        {/* Hover label */}
        <span className="pointer-events-none absolute right-full mr-3 hidden whitespace-nowrap rounded-[2px] bg-navy-900 px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-warm-white opacity-0 shadow-lg transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100 sm:block">
          Chat on WhatsApp
        </span>
      </a>
    </div>
  );
}
