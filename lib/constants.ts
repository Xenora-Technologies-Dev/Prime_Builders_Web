export const COMPANY = {
  legalName: "Prime Plus Builders And Developers Pvt Ltd",
  shortName: "Prime Plus Builders",
  displayName: "Prime Plus Builders & Developers",
  tagline: "Construction • Interior • Infrastructure",
  email: "info@primebuilderindia.com",
  phone: "0091 9699882255",
  phoneTel: "+919699882255",
  whatsappUrl: "https://wa.me/919699882255",
  address:
    "1st Floor, Palakkulam Building, Koyilandy Taluk, Kozhikode, Kerala, Pin : 673307",
  websiteUrl: "https://www.primeplusbuilders.example",
} as const;

export const NAV_LINKS = [
  { label: "Services", href: "#services" },
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Approach", href: "#approach" },
  { label: "Contact", href: "#contact" },
] as const;

export const FOOTER_LINKS = [
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Projects", href: "#projects" },
  { label: "Approach", href: "#approach" },
  { label: "Contact", href: "#contact" },
] as const;

export const HERO_CONTENT = {
  brandLabel: "Prime Plus Builders & Developers",
  categoryLabel: "Construction • Interior • Infrastructure",
  headline: ["Building", "Beyond", "Expectations."],
  supporting:
    "Creating spaces, structures and environments built to stand the test of time.",
  primaryCta: {
    label: "Explore Our Projects",
    href: "#projects",
  },
  secondaryCta: {
    label: "Let's Build Together",
    href: "#contact",
  },
} as const;

export const INTRO_CONTENT = {
  heading: ["Built with Purpose.", "Designed to Last."],
  body: "Prime Plus Builders and Developers Pvt Ltd brings together construction, interior and infrastructure under one vision — creating spaces and structures that combine functionality, quality and thoughtful design.",
} as const;

export const SERVICES = [
  {
    id: "construction",
    number: "01",
    title: "Construction",
    description:
      "Strong foundations. Precise execution. Spaces built to last.",
    visual: "tower" as const,
  },
  {
    id: "interior",
    number: "02",
    title: "Interior",
    description:
      "Thoughtful design. Refined spaces. Built around how people live and work.",
    visual: "interior" as const,
  },
  {
    id: "infrastructure",
    number: "03",
    title: "Infrastructure",
    description:
      "Connecting places, supporting growth and shaping what comes next.",
    visual: "bridge" as const,
  },
] as const;

export const SERVICES_SUBHEADING =
  "From structure to space, we bring construction, interior and infrastructure together under one vision.";

export const ABOUT_CONTENT = {
  heading: ["More Than Builders.", "We Create What Lasts."],
  body: "Prime Plus Builders and Developers brings together construction, interior and infrastructure with a focus on thoughtful planning, quality execution and purposeful design.",
  principles: [
    {
      title: "Quality",
      description: "Every detail matters.",
    },
    {
      title: "Precision",
      description: "Built with purpose and attention.",
    },
    {
      title: "Vision",
      description: "Designed for what comes next.",
    },
  ],
} as const;

export const PORTFOLIO_CONTENT = {
  label: "Projects • Spaces • Infrastructure",
  heading: ["What We're", "Building Next."],
  supporting:
    "Our portfolio is taking shape. Explore this space soon as we unveil the projects, spaces and infrastructure that define the Prime Plus vision.",
  comingSoonLabel: "Project Portfolio",
  categories: [
    {
      id: "construction",
      title: "Construction",
      visual: "tower" as const,
    },
    {
      id: "interior",
      title: "Interior",
      visual: "interior" as const,
    },
    {
      id: "infrastructure",
      title: "Infrastructure",
      visual: "bridge" as const,
    },
  ],
} as const;

export const APPROACH_STEPS = [
  {
    number: "01",
    title: "Vision",
    description: "Understanding the purpose behind every project.",
  },
  {
    number: "02",
    title: "Planning",
    description: "Turning ideas into clear and practical direction.",
  },
  {
    number: "03",
    title: "Build",
    description: "Bringing the plan to life with precision and care.",
  },
  {
    number: "04",
    title: "Deliver",
    description: "Creating spaces ready for people and purpose.",
  },
] as const;

export const WHY_PRIME_PLUS = {
  heading: ["Built on Trust.", "Defined by Quality."],
  subheading: "Built around quality. Driven by purpose.",
  principles: [
    {
      number: "01",
      title: "Quality",
      description:
        "A commitment to craftsmanship and materials that uphold lasting standards.",
    },
    {
      number: "02",
      title: "Precision",
      description:
        "Careful planning and execution that respect structure, schedule and detail.",
    },
    {
      number: "03",
      title: "Integrity",
      description:
        "Clear communication and responsible delivery at every stage of the process.",
    },
    {
      number: "04",
      title: "Innovation",
      description:
        "Thoughtful methods and design choices that look beyond the immediate brief.",
    },
  ],
} as const;

export const CTA_CONTENT = {
  heading: ["Have a Vision?", "Let's Build It."],
  supporting:
    "Let's discuss your next construction, interior or infrastructure project.",
  primaryCta: {
    label: "Start a Conversation",
    href: "#contact",
  },
  secondaryCta: {
    label: "Explore Our Services",
    href: "#services",
  },
} as const;

export const CONTACT_CONTENT = {
  heading: "Let's Build Something Meaningful.",
  message:
    "Share a few details about your project and we will respond with the next steps.",
  projectTypes: ["Construction", "Interior", "Infrastructure", "Other"] as const,
} as const;
