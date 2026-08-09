import { COMPANY, FOOTER_LINKS } from "@/lib/constants";
import { Logo } from "@/components/ui/Logo";
import { Button } from "@/components/ui/Button";

export function Footer() {
  return (
    <footer className="border-t border-gold-500/20 bg-navy-950" role="contentinfo">
      <div className="container-site section-pad !py-16">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_1fr_auto]">
          <div>
            <Logo variant="footer" />
            <p className="mt-6 max-w-xs font-sans text-sm uppercase tracking-[0.16em] text-warm-white/80">
              Prime Plus
              <br />
              Builders and Developers Pvt Ltd
            </p>
            <p className="mt-4 text-[11px] uppercase tracking-[0.22em] text-gold-400">
              {COMPANY.tagline}
            </p>
          </div>

          <nav aria-label="Footer">
            <p className="eyebrow text-steel">Navigate</p>
            <ul className="mt-5 space-y-3">
              {FOOTER_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-warm-white/70 transition-colors hover:text-gold-400"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex flex-col items-start gap-5 lg:items-end">
            <Button href="#contact" variant="secondary">
              Start a Conversation
            </Button>
            <div className="text-left text-sm text-warm-white/55 lg:text-right">
              <a
                href={`mailto:${COMPANY.email}`}
                className="transition-colors hover:text-gold-400"
              >
                {COMPANY.email}
              </a>
              <p className="mt-1">{COMPANY.address}</p>
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-gold-500/15 pt-6 text-[11px] uppercase tracking-[0.16em] text-steel sm:flex-row sm:items-center sm:justify-between">
          <p>
            © 2026 {COMPANY.legalName}. All rights reserved.
          </p>
          <p>Construction • Interior • Infrastructure</p>
        </div>
      </div>
    </footer>
  );
}
