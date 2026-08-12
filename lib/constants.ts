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
  { label: "Services", href: "/#services" },
  { label: "About", href: "/#about" },
  { label: "Projects", href: "/#projects" },
  { label: "Gallery", href: "/gallery" },
  { label: "Approach", href: "/#approach" },
  { label: "Contact", href: "/#contact" },
] as const;

export const FOOTER_LINKS = [
  { label: "About", href: "/#about" },
  { label: "Services", href: "/#services" },
  { label: "Projects", href: "/#projects" },
  { label: "Gallery", href: "/gallery" },
  { label: "Approach", href: "/#approach" },
  { label: "Contact", href: "/#contact" },
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
  points: [
    {
      title: "One team. Three disciplines.",
      text: "Construction, interior and infrastructure planned together so the finished space works as a whole.",
    },
    {
      title: "Clarity from first conversation.",
      text: "We listen to the brief, map the practical path, and keep communication clear through every stage.",
    },
    {
      title: "Built for Kerala’s context.",
      text: "From Koyilandy and Kozhikode outward — structures shaped around climate, site and lasting use.",
    },
  ],
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
  label: "Current Projects",
  heading: ["What We're", "Building Now."],
  supporting:
    "Active work across education, residential and commercial spaces — each project moving from structure to finished environment.",
} as const;

export const CURRENT_PROJECTS = [
  {
    id: "school",
    title: "School",
    status: "In progress",
    category: "Education",
    icon: "school" as const,
    description:
      "An educational facility taking shape with a focus on durable structure, clear planning and spaces built for learning.",
  },
  {
    id: "house",
    title: "House",
    status: "In progress",
    category: "Residential",
    icon: "house" as const,
    description:
      "A residential home advancing through construction and finishing — planned for comfort, function and lasting quality.",
  },
  {
    id: "supermarket",
    title: "Super Market",
    status: "In progress",
    category: "Commercial",
    icon: "supermarket" as const,
    description:
      "A commercial supermarket project in development, designed to support daily use, circulation and long-term performance.",
  },
] as const;

export type GalleryMediaType = "image" | "video";

export const GALLERY_ITEMS = [
  {
    id: "gallery-house-finishing",
    type: "image" as GalleryMediaType,
    src: "/images/gallery/house-finishing.png",
    poster: "/images/gallery/house-finishing.png",
    title: "Residential House",
    category: "House",
    caption: "Exterior taking form — plastered structure and joinery in place.",
    alt: "Two-storey residential house under construction with plastered walls",
  },
  {
    id: "gallery-house-progress",
    type: "image" as GalleryMediaType,
    src: "/images/gallery/house-progress.png",
    poster: "/images/gallery/house-progress.png",
    title: "Structure Rising",
    category: "House",
    caption: "Frame, masonry and site work progressing beside the roadside plot.",
    alt: "Multi-storey house under construction with laterite walls and scaffolding",
  },
  {
    id: "gallery-house-structure",
    type: "image" as GalleryMediaType,
    src: "/images/gallery/house-structure.png",
    poster: "/images/gallery/house-structure.png",
    title: "On-Site Construction",
    category: "Construction",
    caption: "Active site with structural work, scaffolding and weather protection.",
    alt: "Building under construction with laterite brickwork and tarps",
  },
  {
    id: "gallery-site-video",
    type: "video" as GalleryMediaType,
    src: "/videos/site-progress.mp4",
    poster: "/images/gallery/house-progress.png",
    title: "Site Progress",
    category: "Works",
    caption: "A closer look at work underway on site.",
    alt: "Video of construction work in progress",
  },
] as const;

export const GALLERY_HIGHLIGHTS = GALLERY_ITEMS.filter(
  (item) => item.type === "image",
).slice(0, 3);

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
    href: "/#contact",
  },
  secondaryCta: {
    label: "Explore Our Services",
    href: "/#services",
  },
} as const;

export const CONTACT_CONTENT = {
  heading: "Let's Build Something Meaningful.",
  message:
    "Share a few details about your project and we will respond with the next steps.",
  projectTypes: ["Construction", "Interior", "Infrastructure", "Other"] as const,
  nextSteps: [
    {
      title: "Share the brief",
      text: "Tell us the type of work, the site, and what you need the space to do.",
    },
    {
      title: "We review the scope",
      text: "We look at the practical path — structure, interior or infrastructure — and what comes first.",
    },
    {
      title: "Talk through next steps",
      text: "We reply with a clear conversation on how to move the project forward.",
    },
  ],
} as const;
