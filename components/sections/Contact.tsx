"use client";

import { FormEvent, useState } from "react";
import { COMPANY, CONTACT_CONTENT } from "@/lib/constants";
import { Button } from "@/components/ui/Button";
import { SectionReveal } from "@/components/ui/SectionReveal";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";

const fieldClass =
  "w-full rounded-[2px] border border-navy-800/15 bg-warm-white px-4 py-3.5 text-sm text-navy-900 outline-none transition-colors placeholder:text-subtle-grey focus:border-gold-500";

export function Contact() {
  const [submitted, setSubmitted] = useState(false);

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
  };

  return (
    <section
      id="contact"
      className="surface-light relative section-pad"
      aria-labelledby="contact-heading"
    >
      <div className="container-site">
        <SectionReveal>
          <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
            <div>
              <p data-reveal className="eyebrow text-gold-600">
                Contact
              </p>
              <h2
                id="contact-heading"
                data-reveal
                className="mt-4 font-display text-[clamp(2rem,4.5vw,3.5rem)] text-navy-900"
              >
                {CONTACT_CONTENT.heading}
              </h2>
              <p
                data-reveal
                className="mt-6 max-w-md text-base leading-relaxed text-muted"
              >
                {CONTACT_CONTENT.message}
              </p>

              <ol
                data-reveal
                className="mt-8 space-y-4 border-l border-gold-500/40 pl-4"
              >
                {CONTACT_CONTENT.nextSteps.map((step, index) => (
                  <li key={step.title}>
                    <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-gold-600">
                      {String(index + 1).padStart(2, "0")} · {step.title}
                    </p>
                    <p className="mt-1 text-sm leading-relaxed text-muted">
                      {step.text}
                    </p>
                  </li>
                ))}
              </ol>

              <dl data-reveal className="mt-10 space-y-5 text-sm">
                <div>
                  <dt className="eyebrow text-navy-800/50">Mobile</dt>
                  <dd className="mt-2 flex flex-wrap items-center gap-3">
                    <a
                      href={`tel:${COMPANY.phoneTel}`}
                      className="text-navy-900 transition-colors hover:text-gold-600"
                    >
                      {COMPANY.phone}
                    </a>
                    <a
                      href={COMPANY.whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-[2px] border border-[#25D366]/40 bg-[#25D366]/10 px-2.5 py-1.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#128C7E] transition-colors hover:bg-[#25D366]/20"
                      aria-label={`WhatsApp ${COMPANY.phone}`}
                    >
                      <WhatsAppIcon className="h-3.5 w-3.5" />
                      WhatsApp
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="eyebrow text-navy-800/50">Email</dt>
                  <dd className="mt-2">
                    <a
                      href={`mailto:${COMPANY.email}`}
                      className="text-navy-900 transition-colors hover:text-gold-600"
                    >
                      {COMPANY.email}
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="eyebrow text-navy-800/50">Address</dt>
                  <dd className="mt-2 max-w-sm text-navy-900 leading-relaxed">
                    {COMPANY.address}
                  </dd>
                </div>
              </dl>
            </div>

            <form
              data-reveal
              onSubmit={onSubmit}
              className="border border-navy-800/10 bg-warm-grey/40 p-6 md:p-8"
              noValidate
            >
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block sm:col-span-1">
                  <span className="mb-2 block text-[10px] font-semibold uppercase tracking-[0.2em] text-navy-800/60">
                    Name
                  </span>
                  <input
                    name="name"
                    type="text"
                    required
                    autoComplete="name"
                    className={fieldClass}
                    placeholder="Your name"
                  />
                </label>
                <label className="block sm:col-span-1">
                  <span className="mb-2 block text-[10px] font-semibold uppercase tracking-[0.2em] text-navy-800/60">
                    Company
                  </span>
                  <input
                    name="company"
                    type="text"
                    autoComplete="organization"
                    className={fieldClass}
                    placeholder="Company name"
                  />
                </label>
                <label className="block sm:col-span-2">
                  <span className="mb-2 block text-[10px] font-semibold uppercase tracking-[0.2em] text-navy-800/60">
                    Email
                  </span>
                  <input
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    className={fieldClass}
                    placeholder="you@example.com"
                  />
                </label>
                <label className="block sm:col-span-2">
                  <span className="mb-2 block text-[10px] font-semibold uppercase tracking-[0.2em] text-navy-800/60">
                    Project Type
                  </span>
                  <select
                    name="projectType"
                    required
                    defaultValue=""
                    className={fieldClass}
                  >
                    <option value="" disabled>
                      Select a project type
                    </option>
                    {CONTACT_CONTENT.projectTypes.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </label>
                <label className="block sm:col-span-2">
                  <span className="mb-2 block text-[10px] font-semibold uppercase tracking-[0.2em] text-navy-800/60">
                    Message
                  </span>
                  <textarea
                    name="message"
                    required
                    rows={5}
                    className={`${fieldClass} resize-y`}
                    placeholder="Tell us about your vision"
                  />
                </label>
              </div>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
                <Button type="submit" variant="primary">
                  Send Enquiry
                </Button>
                {submitted && (
                  <p className="text-sm text-navy-800/70" role="status">
                    Enquiry captured locally. Connect a form endpoint to deliver
                    messages.
                  </p>
                )}
              </div>
            </form>
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}
