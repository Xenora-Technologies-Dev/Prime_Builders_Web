"use client";

import { CURRENT_PROJECTS, PORTFOLIO_CONTENT } from "@/lib/constants";
import { ProjectIconFrame } from "@/components/ui/ProjectIcon";
import { SectionReveal } from "@/components/ui/SectionReveal";
import { Button } from "@/components/ui/Button";

export function Portfolio() {
  return (
    <section
      id="projects"
      className="relative overflow-hidden bg-warm-white section-pad"
      aria-labelledby="portfolio-heading"
    >
      <div className="blueprint-grid pointer-events-none absolute inset-0 opacity-40" aria-hidden />

      <div className="container-site relative">
        <SectionReveal>
          <div className="mb-10 max-w-2xl md:mb-12">
            <p data-reveal className="eyebrow text-gold-600">
              {PORTFOLIO_CONTENT.label}
            </p>
            <h2
              id="portfolio-heading"
              data-reveal
              className="mt-4 font-display text-[clamp(2.2rem,5vw,3.75rem)] text-navy-900"
            >
              <span className="block">{PORTFOLIO_CONTENT.heading[0]}</span>
              <span className="block text-gold-600">
                {PORTFOLIO_CONTENT.heading[1]}
              </span>
            </h2>
            <p
              data-reveal
              className="mt-6 max-w-xl text-base leading-relaxed text-muted md:text-lg"
            >
              {PORTFOLIO_CONTENT.supporting}
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {CURRENT_PROJECTS.map((project) => (
              <article
                key={project.id}
                data-reveal
                className="flex flex-col border border-navy-800/10 bg-warm-white transition-shadow duration-300 hover:shadow-[0_20px_50px_rgba(4,26,53,0.08)]"
              >
                <ProjectIconFrame name={project.icon} label={project.title} />
                <div className="flex flex-1 flex-col p-5 sm:p-6">
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-gold-600">
                      {project.category}
                    </p>
                    <span className="border border-gold-500/40 px-2 py-1 text-[9px] font-semibold uppercase tracking-[0.16em] text-navy-800">
                      {project.status}
                    </span>
                  </div>
                  <h3 className="mt-3 font-display text-[1.75rem] text-navy-900 sm:text-3xl">
                    {project.title}
                  </h3>
                  <div className="mt-3 h-px w-10 bg-gold-500" />
                  <p className="mt-4 text-sm leading-relaxed text-muted">
                    {project.description}
                  </p>
                </div>
              </article>
            ))}
          </div>

          <div data-reveal className="mt-10">
            <Button href="/gallery" variant="secondary-light">
              View project gallery
            </Button>
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}
