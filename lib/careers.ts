/**
 * Careers content.
 *
 * The roles below are PLACEHOLDERS showing the format. Edit, remove or add
 * roles to match real openings before publishing. If `openRoles` is empty,
 * the page shows a "no open roles right now" message and still accepts
 * general applications.
 */

export interface JobRole {
  id: string;
  title: string;
  team: "Engineering" | "AI" | "Consulting" | "Design" | "Operations";
  location: string;
  type: "Full-time" | "Part-time" | "Contract" | "Internship";
  summary: string;
  responsibilities: string[];
  requirements: string[];
  niceToHave?: string[];
}

export const openRoles: JobRole[] = [
  {
    id: "full-stack-engineer",
    title: "Full-Stack Engineer (Next.js / Node.js)",
    team: "Engineering",
    location: "Remote",
    type: "Full-time",
    summary:
      "Build fast, reliable web applications for clients across industries, from first commit to production.",
    responsibilities: [
      "Design and build features across the front end and back end of client projects.",
      "Turn product requirements into clean, tested, well-documented code.",
      "Work directly with clients to clarify needs and demo progress.",
      "Review code and help raise the bar for quality across the team.",
    ],
    requirements: [
      "3+ years of professional experience with TypeScript, React and Node.js.",
      "Experience with relational databases and designing REST or GraphQL APIs.",
      "Comfortable owning features end to end in a remote team.",
      "Clear written and spoken English.",
    ],
    niceToHave: [
      "Experience with Next.js App Router and server components.",
      "Familiarity with cloud platforms such as AWS, Azure or Vercel.",
    ],
  },
  {
    id: "machine-learning-engineer",
    title: "Machine Learning Engineer",
    team: "AI",
    location: "Remote",
    type: "Full-time",
    summary:
      "Design, train and ship AI systems — from LLM-powered assistants to custom models — that solve real business problems.",
    responsibilities: [
      "Build retrieval-augmented generation and agent workflows on top of modern LLMs.",
      "Train, evaluate and deploy custom models where off-the-shelf ones fall short.",
      "Set up evaluation, monitoring and guardrails for AI in production.",
      "Explain trade-offs clearly to technical and non-technical stakeholders.",
    ],
    requirements: [
      "Strong Python skills and hands-on experience with PyTorch or TensorFlow.",
      "Experience shipping at least one ML or LLM system to production.",
      "Solid understanding of data pipelines, evaluation and model quality.",
    ],
    niceToHave: [
      "Experience with vector databases and frameworks such as LangChain.",
      "Background in NLP or document understanding.",
    ],
  },
  {
    id: "it-infrastructure-consultant",
    title: "IT Infrastructure Consultant",
    team: "Consulting",
    location: "Remote",
    type: "Contract",
    summary:
      "Help clients modernise their infrastructure, move to the cloud and strengthen their security posture.",
    responsibilities: [
      "Assess client environments and produce clear, prioritised roadmaps.",
      "Plan and lead cloud migrations with minimal disruption.",
      "Implement identity, backup and device management best practices.",
      "Document systems and train client teams.",
    ],
    requirements: [
      "4+ years in IT infrastructure, systems administration or cloud engineering.",
      "Hands-on experience with Microsoft 365, Azure or AWS.",
      "Confident presenting recommendations to business owners.",
    ],
    niceToHave: [
      "Certifications such as AZ-104, AWS Solutions Architect or Security+.",
    ],
  },
];
