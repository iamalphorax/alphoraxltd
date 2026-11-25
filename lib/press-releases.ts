/**
 * Press releases and media kit content.
 *
 * The releases below are SAMPLE CONTENT (sample: true) written from what the
 * site already says about Alphorax, so the newsroom has something to render.
 * Their dates, quotes and announcements are placeholders — replace them with
 * real announcements, or set `sample: false` once an entry is real, before
 * publishing. Sample entries show a visible "Sample release" label on the site.
 */
import { company } from "@/lib/company";

export type PressCategory = "Company News" | "Services" | "Hiring";

export type PressBlock =
  | { type: "paragraph"; text: string }
  | { type: "heading"; text: string }
  | { type: "list"; items: string[] }
  | { type: "quote"; text: string; attribution: string };

export interface PressRelease {
  slug: string;
  title: string;
  subtitle: string;
  /** ISO date, e.g. "2026-10-14" */
  date: string;
  /** Dateline place, e.g. "Lagos, Nigeria" */
  location: string;
  category: PressCategory;
  image: string;
  imageAlt: string;
  summary: string;
  body: PressBlock[];
  sample: boolean;
}

const img = (id: string) =>
  `https://images.unsplash.com/${id}?q=80&w=1600&auto=format&fit=crop`;

/** Standard "About Alphorax" paragraph that ends every release. */
export const boilerplate = `Alphorax is a technology company that builds custom software, AI solutions and IT systems for businesses worldwide. Founded in ${company.founded}, Alphorax's mission is to make advanced AI technology accessible to businesses of all sizes. The company offers project development, AI solutions and IT consulting, helping organizations automate operations, modernize systems and scale securely. Learn more at ${company.website}.`;

const spokesperson = "Co-founder, Alphorax";

// Newest first.
export const pressReleases: PressRelease[] = [
  {
    slug: "alphorax-opens-hiring-for-remote-engineering-and-ai-roles",
    title: "Alphorax Opens Hiring for Remote Engineering, AI and IT Consulting Roles",
    subtitle:
      "The company is growing its distributed team to meet demand for custom software and production AI systems.",
    date: "2026-10-14",
    location: company.headquarters,
    category: "Hiring",
    image: img("photo-1552664730-d307ca884978"),
    imageAlt: "A team gathered around a table planning a project",
    summary:
      "Alphorax is hiring full-stack engineers, machine learning engineers and IT infrastructure consultants to join its remote-first team.",
    sample: true,
    body: [
      {
        type: "paragraph",
        text: "Alphorax, a technology company that builds custom software, AI solutions and IT systems for businesses, today announced it is hiring for several remote roles across engineering, artificial intelligence and IT consulting.",
      },
      {
        type: "paragraph",
        text: "The open roles include full-stack engineers, machine learning engineers and IT infrastructure consultants. New team members will work directly with clients across industries, taking projects from discovery through to delivery and support.",
      },
      {
        type: "quote",
        text: "Our clients want partners who can ship production systems, not just prototypes. We're looking for people who enjoy ownership, communicate clearly and care about the outcomes their work creates.",
        attribution: spokesperson,
      },
      { type: "heading", text: "What candidates can expect" },
      {
        type: "list",
        items: [
          "Remote-first work with flexible hours",
          "Real ownership of features and client relationships",
          "Hands-on work with LLM applications, custom models and automation",
          "A four-step hiring process designed to be quick and respectful",
        ],
      },
      {
        type: "paragraph",
        text: `Applications are open now at ${company.website}/careers. Candidates whose skills don't match a current opening are welcome to send a general application.`,
      },
    ],
  },
  {
    slug: "alphorax-launches-free-ai-readiness-consultations",
    title: "Alphorax Launches Free AI Readiness Consultations for Small and Mid-Sized Businesses",
    subtitle:
      "A 30-minute session helps business leaders find where AI can save time — and where it can't.",
    date: "2026-07-08",
    location: company.headquarters,
    category: "Services",
    image: img("photo-1600880292203-757bb62b4baf"),
    imageAlt: "Two people in a business consultation reviewing notes",
    summary:
      "Business owners can now book a free 30-minute consultation to identify practical, low-risk ways to use AI in their operations.",
    sample: true,
    body: [
      {
        type: "paragraph",
        text: "Alphorax today announced free AI readiness consultations for small and mid-sized businesses. The 30-minute sessions help business leaders understand where artificial intelligence can deliver value in their operations and what it takes to get started.",
      },
      {
        type: "paragraph",
        text: "Many organizations know AI could help them but aren't sure where to begin. Each consultation looks at a company's current processes, data and goals, and ends with practical next steps — whether or not the business goes on to work with Alphorax.",
      },
      {
        type: "quote",
        text: "The best AI projects start with a real business problem, not a technology. These sessions are about finding the handful of changes that will genuinely make a difference, and being honest about the ones that won't.",
        attribution: spokesperson,
      },
      { type: "heading", text: "What the consultation covers" },
      {
        type: "list",
        items: [
          "A review of repetitive, time-consuming processes that suit automation",
          "An honest look at whether the business's data is ready for AI",
          "Quick wins compared with longer-term opportunities",
          "Rough guidance on cost, timelines and risks",
        ],
      },
      {
        type: "paragraph",
        text: `Consultations can be booked online at ${company.website}/contact.`,
      },
    ],
  },
  {
    slug: "alphorax-expands-ai-solutions-llm-applications-and-automation",
    title: "Alphorax Expands AI Solutions with LLM Applications and Workflow Automation",
    subtitle:
      "New services help businesses move from AI experiments to production systems their teams can rely on.",
    date: "2026-03-17",
    location: company.headquarters,
    category: "Services",
    image: img("photo-1677442136019-21780ecad995"),
    imageAlt: "Abstract illustration of an artificial intelligence network",
    summary:
      "Alphorax now designs, builds and runs custom LLM applications, document processing and AI-powered workflow automation.",
    sample: true,
    body: [
      {
        type: "paragraph",
        text: "Alphorax today announced an expansion of its AI Solutions practice, adding services that help businesses build and run large language model (LLM) applications and AI-powered workflow automation.",
      },
      {
        type: "paragraph",
        text: "The expanded services are designed for organizations that have tried AI tools but struggle to turn them into dependable systems. Alphorax works with each client to connect AI to their existing data and software, with monitoring and human review built in from the start.",
      },
      { type: "heading", text: "New services include" },
      {
        type: "list",
        items: [
          "Custom AI assistants grounded in a company's own documents and data",
          "Document processing and data extraction",
          "Workflow automation that connects AI to the tools teams already use",
          "Ongoing monitoring, evaluation and improvement of AI systems",
        ],
      },
      {
        type: "quote",
        text: "A demo is easy. A system your team trusts every day is hard. We built this practice around the unglamorous parts — data quality, testing and monitoring — because that's what makes AI useful in the real world.",
        attribution: spokesperson,
      },
      {
        type: "paragraph",
        text: "The services are available to clients worldwide, alongside Alphorax's existing project development and IT consulting offerings.",
      },
    ],
  },
  {
    slug: "alphorax-adds-cloud-migration-and-security-reviews",
    title: "Alphorax Adds Cloud Migration and Security Reviews to IT Consulting Services",
    subtitle:
      "Businesses can now get help moving to the cloud and strengthening their security from a single partner.",
    date: "2025-11-05",
    location: company.headquarters,
    category: "Services",
    image: img("photo-1544197150-b99a580bb7a8"),
    imageAlt: "Rows of servers in a data center",
    summary:
      "Alphorax's IT Consulting practice now offers cloud migration planning and delivery, plus independent security reviews.",
    sample: true,
    body: [
      {
        type: "paragraph",
        text: "Alphorax today announced two new IT consulting services: cloud migration and security reviews. The services help growing businesses modernize their infrastructure and reduce risk without building a large in-house IT team.",
      },
      {
        type: "paragraph",
        text: "Cloud migration engagements cover assessment, planning, migration and post-move optimization. Security reviews give businesses a clear, prioritized picture of their risks, with practical recommendations their teams can act on.",
      },
      {
        type: "quote",
        text: "Infrastructure and security decisions shape everything a business builds on top of them. We want to give smaller organizations the same quality of advice that large enterprises take for granted.",
        attribution: spokesperson,
      },
      {
        type: "paragraph",
        text: `Both services are available now. Businesses can request a consultation at ${company.website}/contact.`,
      },
    ],
  },
  {
    slug: "alphorax-launches-to-make-ai-accessible",
    title: "Alphorax Launches to Make Advanced AI Accessible to Businesses of All Sizes",
    subtitle:
      "The new technology company brings custom software development, AI solutions and IT consulting under one roof.",
    date: "2025-06-02",
    location: company.headquarters,
    category: "Company News",
    image: img("photo-1451187580459-43490279c0fa"),
    imageAlt: "Planet Earth at night with glowing network connections",
    summary:
      "Founded by a team of AI researchers and software engineers, Alphorax helps businesses put advanced technology to work.",
    sample: true,
    body: [
      {
        type: "paragraph",
        text: "Alphorax today announced its launch as a technology company dedicated to making advanced AI technology accessible to businesses of all sizes.",
      },
      {
        type: "paragraph",
        text: "Alphorax was founded by a team of AI researchers and software engineers who saw that, while artificial intelligence holds enormous potential, many organizations lack the expertise and resources to put it to work effectively. The company was established to bridge that gap.",
      },
      { type: "heading", text: "Three core services" },
      {
        type: "list",
        items: [
          "Project Development — custom web, mobile and software applications",
          "AI Solutions — machine learning, automation and intelligent applications",
          "IT Consulting — strategy, infrastructure and security guidance",
        ],
      },
      {
        type: "quote",
        text: "Every business should be able to benefit from AI, not just the ones with large research teams. Our job is to make that practical, affordable and safe.",
        attribution: spokesperson,
      },
      {
        type: "paragraph",
        text: "Alphorax works with clients worldwide through remote collaboration, regular progress updates and transparent communication.",
      },
    ],
  },
];

export const pressCategories: PressCategory[] = ["Company News", "Services", "Hiring"];

export function getPressRelease(slug: string) {
  return pressReleases.find((release) => release.slug === slug);
}

export function getOtherPressReleases(slug: string, limit = 3) {
  return pressReleases.filter((release) => release.slug !== slug).slice(0, limit);
}

/** Formats an ISO date in UTC so server and browser render the same text. */
export function formatPressDate(
  iso: string,
  options: Intl.DateTimeFormatOptions = { dateStyle: "long" },
) {
  return new Intl.DateTimeFormat("en-US", { ...options, timeZone: "UTC" }).format(
    new Date(`${iso}T00:00:00Z`),
  );
}

export const brandColors = [
  { name: "Deep Blue", hex: "#003366", usage: "Primary backgrounds" },
  { name: "Accent Blue", hex: "#4D9FFF", usage: "Highlights and links" },
  { name: "Charcoal", hex: "#333333", usage: "Surfaces" },
  { name: "Silver", hex: "#B0B0B0", usage: "Body text" },
];

export const companyFacts = [
  { label: "Founded", value: company.founded },
  { label: "Headquarters", value: company.headquarters },
  { label: "Services", value: "Project Development, AI Solutions, IT Consulting" },
  { label: "Clients", value: "Businesses worldwide" },
  { label: "Website", value: company.website },
];
