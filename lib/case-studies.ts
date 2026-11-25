/**
 * Case study content.
 *
 * The entries below are ILLUSTRATIVE EXAMPLES (illustrative: true) so the
 * pages have something to render. Replace them with real client projects —
 * or set `illustrative: false` once an entry describes real work — before
 * publishing. Illustrative entries show a visible "Illustrative example"
 * label on the site.
 */

export type ServiceLine = "Project Development" | "AI Solutions" | "IT Consulting";

export interface CaseStudy {
  slug: string;
  title: string;
  client: string;
  industry: string;
  service: ServiceLine;
  duration: string;
  image: string;
  summary: string;
  challenge: string[];
  approach: { title: string; description: string }[];
  solution: string[];
  results: { value: string; label: string }[];
  technologies: string[];
  featured?: boolean;
  illustrative: boolean;
}

export const serviceLines: ServiceLine[] = [
  "Project Development",
  "AI Solutions",
  "IT Consulting",
];

const img = (id: string) =>
  `https://images.unsplash.com/${id}?q=80&w=1600&auto=format&fit=crop`;

export const caseStudies: CaseStudy[] = [
  {
    slug: "ai-customer-support-ecommerce",
    title: "An AI support assistant that answers customers in seconds",
    client: "Online fashion retailer",
    industry: "Retail & E-commerce",
    service: "AI Solutions",
    duration: "10 weeks",
    image: img("photo-1556742049-0cfed4f6a45d"),
    summary:
      "We built a retrieval-augmented support assistant that resolves order, sizing and returns questions instantly, and hands complex cases to human agents with full context.",
    challenge: [
      "Support volume tripled during seasonal sales, and customers were waiting more than a day for replies to simple questions about orders, sizing and returns.",
      "The team had tried an off-the-shelf chatbot, but it gave generic answers, couldn't see order data and frustrated customers.",
    ],
    approach: [
      {
        title: "Ticket analysis",
        description:
          "Classified 12 months of tickets to find the questions that could be safely automated.",
      },
      {
        title: "Knowledge grounding",
        description:
          "Connected the assistant to the product catalogue, policies and order system so every answer cites a real source.",
      },
      {
        title: "Human handoff",
        description:
          "Designed escalation rules so sensitive or uncertain cases reach an agent with a summary attached.",
      },
      {
        title: "Measured rollout",
        description:
          "Launched to 10% of traffic first, reviewed transcripts daily, then scaled up.",
      },
    ],
    solution: [
      "A chat assistant embedded in the storefront and help centre, powered by a large language model with retrieval over approved content.",
      "Live order lookups through a secure API, so customers get personalised answers without logging into a portal.",
      "A dashboard for the support lead showing resolution rates, escalations and topics customers ask about most.",
    ],
    results: [
      { value: "68%", label: "of conversations resolved without an agent" },
      { value: "< 10s", label: "average first response time" },
      { value: "4.6/5", label: "customer satisfaction score" },
    ],
    technologies: ["OpenAI", "LangChain", "Next.js", "PostgreSQL", "pgvector"],
    featured: true,
    illustrative: true,
  },
  {
    slug: "logistics-dispatch-platform",
    title: "Rebuilding a dispatch platform for a growing logistics fleet",
    client: "Regional logistics operator",
    industry: "Logistics",
    service: "Project Development",
    duration: "5 months",
    image: img("photo-1586528116311-ad8dd3c8310d"),
    summary:
      "We replaced spreadsheets and phone calls with a real-time web and mobile platform for planning routes, assigning drivers and tracking deliveries.",
    challenge: [
      "Dispatchers planned hundreds of daily deliveries in spreadsheets and coordinated drivers by phone, which caused missed slots and no visibility for customers.",
      "The business wanted to double its fleet without doubling its operations team.",
    ],
    approach: [
      {
        title: "Shadowing dispatchers",
        description:
          "Spent a week with the operations team to map how work really flowed.",
      },
      {
        title: "Clickable prototype",
        description:
          "Validated the dispatch board and driver app with real users before writing production code.",
      },
      {
        title: "Iterative delivery",
        description:
          "Shipped in two-week sprints, starting with the highest-value workflow: assigning jobs.",
      },
    ],
    solution: [
      "A web dispatch board with drag-and-drop job assignment and live driver locations.",
      "A cross-platform driver app with offline support, turn-by-turn navigation and proof-of-delivery photos.",
      "Automatic SMS and email updates that tell customers when their delivery is on the way.",
    ],
    results: [
      { value: "35%", label: "less time spent planning routes" },
      { value: "2×", label: "fleet size supported by the same team" },
      { value: "92%", label: "of deliveries on time" },
    ],
    technologies: ["React", "React Native", "Node.js", "PostgreSQL", "Google Maps API"],
    illustrative: true,
  },
  {
    slug: "cloud-migration-professional-services",
    title: "Moving a professional services firm to a secure cloud setup",
    client: "Accounting and advisory firm",
    industry: "Professional Services",
    service: "IT Consulting",
    duration: "3 months",
    image: img("photo-1504384308090-c894fdcc538d"),
    summary:
      "We audited an ageing on-premise setup, designed a cloud roadmap and led the migration with zero unplanned downtime during tax season.",
    challenge: [
      "The firm relied on an ageing office server for files and email. Remote work was slow, backups were manual and nobody knew what would happen if the server failed.",
      "Client data had to stay confidential and compliant throughout any change.",
    ],
    approach: [
      {
        title: "IT health check",
        description:
          "Inventoried devices, software, accounts and data flows, and ranked risks by impact.",
      },
      {
        title: "Roadmap",
        description:
          "Agreed a phased plan and budget with the partners, prioritising security and continuity.",
      },
      {
        title: "Phased migration",
        description:
          "Moved email, then files, then line-of-business apps, with rollback plans at every step.",
      },
      {
        title: "Training",
        description:
          "Ran short sessions so staff were comfortable with the new tools on day one.",
      },
    ],
    solution: [
      "Cloud email and file storage with multi-factor authentication and role-based access.",
      "Automated, tested backups with documented recovery procedures.",
      "Device management so lost or stolen laptops can be locked and wiped remotely.",
    ],
    results: [
      { value: "0", label: "hours of unplanned downtime" },
      { value: "100%", label: "of staff using multi-factor authentication" },
      { value: "30%", label: "lower monthly IT running costs" },
    ],
    technologies: ["Microsoft 365", "Azure", "Intune", "Entra ID"],
    illustrative: true,
  },
  {
    slug: "document-processing-fintech",
    title: "Automating loan document checks with machine learning",
    client: "Digital lending company",
    industry: "Financial Services",
    service: "AI Solutions",
    duration: "4 months",
    image: img("photo-1554224155-6726b3ff858f"),
    summary:
      "We built a document intelligence pipeline that reads bank statements and IDs, extracts key data and flags anomalies for human review.",
    challenge: [
      "Analysts manually reviewed every uploaded bank statement and ID, which slowed approvals to several days and limited how many applications the team could handle.",
      "Any automation had to be auditable and keep a human in the loop for final decisions.",
    ],
    approach: [
      {
        title: "Data audit",
        description:
          "Sampled thousands of anonymised documents to understand formats, quality and edge cases.",
      },
      {
        title: "Model development",
        description:
          "Combined OCR with custom extraction models and rules tuned for local bank formats.",
      },
      {
        title: "Review workflow",
        description:
          "Designed a review screen where analysts confirm low-confidence fields instead of retyping everything.",
      },
    ],
    solution: [
      "An extraction service that turns uploaded documents into structured data in under a minute.",
      "Anomaly checks that flag edited documents, mismatched names and unusual transaction patterns.",
      "A full audit trail recording what the model extracted and what analysts changed.",
    ],
    results: [
      { value: "80%", label: "less manual data entry" },
      { value: "Same day", label: "decisions instead of 3–4 days" },
      { value: "97%", label: "field-level extraction accuracy" },
    ],
    technologies: ["Python", "PyTorch", "Tesseract", "FastAPI", "AWS"],
    illustrative: true,
  },
  {
    slug: "patient-booking-app-healthcare",
    title: "A patient booking app for a multi-site clinic network",
    client: "Private clinic network",
    industry: "Healthcare",
    service: "Project Development",
    duration: "4 months",
    image: img("photo-1576091160399-112ba8d25d1d"),
    summary:
      "We designed and built a mobile app and web portal that let patients book, reschedule and prepare for appointments across every clinic.",
    challenge: [
      "Patients could only book by phone during office hours, and reception teams spent much of the day managing calls and no-shows.",
      "The clinics needed a solution that protected patient data and worked with their existing scheduling system.",
    ],
    approach: [
      {
        title: "Patient journeys",
        description:
          "Interviewed patients and front-desk staff to map booking, reminders and check-in.",
      },
      {
        title: "Integration first",
        description:
          "Built a secure integration layer to the clinics' scheduling system before any UI.",
      },
      {
        title: "Accessible design",
        description:
          "Tested with older patients to make sure the app was easy to use for everyone.",
      },
    ],
    solution: [
      "iOS and Android apps plus a web portal for booking, rescheduling and cancellations at any time.",
      "Automatic reminders and pre-visit forms that patients complete before they arrive.",
      "An admin view for each clinic to manage availability and see upcoming demand.",
    ],
    results: [
      { value: "55%", label: "of bookings made online" },
      { value: "40%", label: "fewer missed appointments" },
      { value: "4.8★", label: "average app store rating" },
    ],
    technologies: ["Flutter", "Next.js", "Node.js", "PostgreSQL", "Twilio"],
    illustrative: true,
  },
  {
    slug: "security-review-education",
    title: "Strengthening security for a fast-growing education provider",
    client: "Online education provider",
    industry: "Education",
    service: "IT Consulting",
    duration: "8 weeks",
    image: img("photo-1522202176988-66273c2fd55f"),
    summary:
      "We ran a security review across cloud infrastructure, apps and staff practices, then helped the team fix the highest-risk issues first.",
    challenge: [
      "Rapid growth had left the provider with inconsistent access controls, unpatched servers and no clear incident response plan.",
      "Enterprise customers were starting to ask for security questionnaires the team couldn't confidently answer.",
    ],
    approach: [
      {
        title: "Assessment",
        description:
          "Reviewed cloud configuration, application security, access management and policies.",
      },
      {
        title: "Risk register",
        description:
          "Ranked every finding by likelihood and impact, with a clear owner and fix for each.",
      },
      {
        title: "Hands-on remediation",
        description:
          "Worked alongside the engineering team to fix critical issues within the first month.",
      },
    ],
    solution: [
      "Least-privilege access controls and single sign-on across internal tools.",
      "Automated patching, logging and alerting for cloud infrastructure.",
      "A written incident response plan and security policies ready for customer due diligence.",
    ],
    results: [
      { value: "100%", label: "of critical findings resolved" },
      { value: "6 weeks", label: "from assessment to remediation" },
      { value: "3", label: "enterprise security reviews passed" },
    ],
    technologies: ["AWS", "Cloudflare", "Okta", "Terraform"],
    illustrative: true,
  },
];

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return caseStudies.find((study) => study.slug === slug);
}

/** Other case studies, same service line first. */
export function getRelatedCaseStudies(slug: string, limit = 3): CaseStudy[] {
  const current = getCaseStudy(slug);
  if (!current) return caseStudies.slice(0, limit);
  const others = caseStudies.filter((study) => study.slug !== slug);
  const sameService = others.filter((study) => study.service === current.service);
  const rest = others.filter((study) => study.service !== current.service);
  return [...sameService, ...rest].slice(0, limit);
}
