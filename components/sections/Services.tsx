"use client";

import { motion } from "framer-motion";
import { SERVICES, SERVICES_SUBHEADING } from "@/lib/constants";
import { SectionReveal } from "@/components/ui/SectionReveal";

function ServiceVisual({ type }: { type: "tower" | "interior" | "bridge" }) {
  if (type === "tower") {
    return (
      <svg viewBox="0 0 160 160" className="h-full w-full" aria-hidden>
        <rect x="64" y="20" width="32" height="108" fill="#D9B45A" opacity="0.15" />
        <rect x="68" y="24" width="24" height="100" fill="#1b5ca3" />
        <rect x="74" y="12" width="12" height="12" fill="#C6922E" />
        <line x1="80" y1="4" x2="80" y2="12" stroke="#D9B45A" strokeWidth="2" />
        <rect x="36" y="64" width="24" height="64" fill="#0a3a72" opacity="0.85" />
        <rect x="104" y="76" width="20" height="52" fill="#0a3a72" opacity="0.75" />
        <line x1="24" y1="132" x2="136" y2="132" stroke="#C6922E" strokeWidth="1.2" />
      </svg>
    );
  }

  if (type === "interior") {
    return (
      <svg viewBox="0 0 160 160" className="h-full w-full" aria-hidden>
        <rect x="28" y="36" width="104" height="76" fill="none" stroke="#A9ADB3" strokeWidth="1.5" />
        <line x1="28" y1="68" x2="132" y2="68" stroke="#C6922E" strokeWidth="1.2" />
        <rect x="40" y="80" width="28" height="24" fill="#1b5ca3" opacity="0.35" />
        <rect x="80" y="80" width="40" height="8" fill="#A9ADB3" />
        <circle cx="116" cy="52" r="6" fill="#D9B45A" opacity="0.7" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 160 160" className="h-full w-full" aria-hidden>
      <path d="M16 108 L52 68 L108 68 L144 108" fill="none" stroke="#A9ADB3" strokeWidth="2" />
      <path d="M16 108 L52 74 L108 74 L144 108" fill="none" stroke="#C6922E" strokeWidth="1.4" />
      <line x1="80" y1="74" x2="80" y2="124" stroke="#A9ADB3" strokeWidth="2" />
      <line x1="28" y1="124" x2="132" y2="124" stroke="#062B5C" strokeWidth="1.2" />
    </svg>
  );
}

export function Services() {
  return (
    <section
      id="services"
      className="relative overflow-hidden bg-navy-900 section-pad"
      aria-labelledby="services-heading"
    >
      <div className="architectural-grid pointer-events-none absolute inset-0 opacity-15" aria-hidden />
      <div className="container-site relative">
        <SectionReveal>
          <div className="mb-14 max-w-2xl">
            <p data-reveal className="eyebrow text-gold-400">
              Capabilities
            </p>
            <h2
              id="services-heading"
              data-reveal
              className="mt-4 font-display text-[clamp(2rem,4.5vw,3.5rem)] text-warm-white"
            >
              What We Build
            </h2>
            <p
              data-reveal
              className="mt-5 text-base leading-relaxed text-warm-white/65 md:text-lg"
            >
              {SERVICES_SUBHEADING}
            </p>
          </div>

          <div className="grid gap-5 lg:grid-cols-3">
            {SERVICES.map((service) => (
              <motion.article
                key={service.id}
                data-reveal
                whileHover={{ y: -8, rotateX: 2, rotateY: -2 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                style={{ transformPerspective: 800 }}
                className="group relative border border-gold-500/15 bg-navy-950/50 p-7 backdrop-blur-sm transition-shadow duration-300 hover:border-gold-500/40 hover:shadow-[0_24px_60px_rgba(0,0,0,0.35)]"
                data-cursor="EXPLORE"
              >
                <div className="mb-8 flex h-36 w-full items-center justify-center overflow-hidden bg-navy-800/40 transition-transform duration-500 group-hover:scale-[1.04]">
                  <div className="h-32 w-32">
                    <ServiceVisual type={service.visual} />
                  </div>
                </div>

                <p className="font-display text-4xl text-warm-white/20 transition-colors duration-300 group-hover:text-gold-500">
                  {service.number}
                </p>
                <h3 className="mt-3 font-sans text-sm font-semibold uppercase tracking-[0.2em] text-warm-white">
                  {service.title}
                </h3>
                <div className="mt-4 h-px w-8 origin-left bg-gold-500 transition-all duration-500 group-hover:w-20" />
                <p className="mt-5 text-sm leading-relaxed text-warm-white/65">
                  {service.description}
                </p>
              </motion.article>
            ))}
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}
