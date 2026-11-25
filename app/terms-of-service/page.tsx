import React from "react";
import Link from "next/link";
import type { Metadata } from "next";
import LegalLayout, { LegalSection } from "@/components/legal/LegalLayout";
import { company } from "@/lib/company";
import {
  generateBreadcrumbSchema,
  generateWebPageSchema,
  getJsonLdProps,
} from "@/lib/schema";

const description =
  "The terms that govern your use of the Alphorax website and how they relate to the agreements we sign for software, AI and IT consulting projects.";

export const metadata: Metadata = {
  title: "Terms of Service",
  description,
  alternates: { canonical: "/terms-of-service" },
  openGraph: {
    title: "Terms of Service | Alphorax",
    description,
    url: "/terms-of-service",
    siteName: "Alphorax",
    type: "website",
  },
};

const sections: LegalSection[] = [
  {
    id: "agreement",
    title: "Agreement to these terms",
    content: (
      <>
        <p>
          These Terms of Service (“Terms”) apply to your use of{" "}
          {company.website} (the “Website”), operated by{" "}
          {company.legalName} (“{company.name}”, “we”,
          “us”). By using the Website you agree to these Terms. If you
          don’t agree, please don’t use it.
        </p>
        <p>
          If you use the Website on behalf of a company, you confirm that you
          are authorised to accept these Terms for it.
        </p>
      </>
    ),
  },
  {
    id: "our-services",
    title: "Our services and project agreements",
    content: (
      <>
        <p>
          The Website describes our software development, AI and IT consulting
          services. Information on the Website is general and doesn’t form
          an offer or a contract.
        </p>
        <p>
          Any project we carry out is governed by a separate written agreement,
          such as a master services agreement, statement of work or signed
          proposal. If that agreement conflicts with these Terms, the agreement
          wins.
        </p>
      </>
    ),
  },
  {
    id: "acceptable-use",
    title: "Acceptable use",
    content: (
      <>
        <p>When using the Website, you agree not to:</p>
        <ul>
          <li>break any law or infringe anyone’s rights;</li>
          <li>
            try to gain unauthorised access to the Website, its servers or
            connected systems;
          </li>
          <li>upload or send malware or other harmful code;</li>
          <li>
            scrape, crawl or overload the Website in a way that harms its
            performance;
          </li>
          <li>
            send spam, or impersonate any person or organisation through our
            forms;
          </li>
          <li>copy or resell the Website’s content without permission.</li>
        </ul>
      </>
    ),
  },
  {
    id: "intellectual-property",
    title: "Intellectual property",
    content: (
      <p>
        The Website’s content, including text, graphics, logos, code and
        design, belongs to {company.name} or its licensors and is protected by
        intellectual property laws. You may view and share pages for personal
        or internal business purposes. Any other use needs our written
        permission. The {company.name} name and logo are our trademarks.
      </p>
    ),
  },
  {
    id: "client-deliverables",
    title: "Project deliverables",
    content: (
      <p>
        Ownership of software, models, designs and other deliverables we create
        for clients is set out in the relevant project agreement. Unless that
        agreement says otherwise, ownership of custom deliverables passes to the
        client once they’ve been paid for in full, and {company.name} keeps
        ownership of its pre-existing tools, libraries, methods and know-how.
      </p>
    ),
  },
  {
    id: "quotes-payments",
    title: "Quotes, proposals and payment",
    content: (
      <p>
        Estimates, timelines and prices shared through the Website, by email or
        in calls are for guidance only. They become binding only when included
        in a signed agreement. Payment terms, milestones and invoicing are
        defined in that agreement.
      </p>
    ),
  },
  {
    id: "ai-solutions",
    title: "AI-powered solutions",
    content: (
      <p>
        AI and machine learning systems can produce output that is inaccurate,
        incomplete or biased. Where we build or integrate AI for you, you are
        responsible for reviewing its output before relying on it, especially
        for legal, medical, financial or other high-stakes decisions, and for
        making sure your use complies with applicable laws.
      </p>
    ),
  },
  {
    id: "your-submissions",
    title: "Information you send us",
    content: (
      <p>
        When you contact us, subscribe or apply for a role, you confirm that the
        information you provide is accurate and that you’re allowed to share
        it. We handle it as described in our{" "}
        <Link href="/privacy-policy">Privacy Policy</Link>. Please don’t
        send confidential or sensitive information through the Website’s
        forms; we’re happy to sign an NDA before you share it.
      </p>
    ),
  },
  {
    id: "third-party",
    title: "Third-party services and links",
    content: (
      <p>
        The Website uses or links to services run by others, including Calendly
        for scheduling and WhatsApp for messaging. Your use of those services is
        governed by their own terms and policies, and we aren’t responsible
        for their content or availability.
      </p>
    ),
  },
  {
    id: "disclaimers",
    title: "Disclaimers",
    content: (
      <p>
        The Website is provided “as is” and “as available”.
        We work to keep it accurate and online, but we don’t guarantee that
        it will be error-free, secure or uninterrupted, or that its content is
        complete or current. Case studies and blog posts are for general
        information and aren’t professional advice for your specific
        situation.
      </p>
    ),
  },
  {
    id: "liability",
    title: "Limitation of liability",
    content: (
      <p>
        To the fullest extent the law allows, {company.name} is not liable for
        any indirect, incidental, special or consequential loss, or for loss of
        profits, revenue, data or goodwill, arising from your use of the
        Website. Nothing in these Terms limits liability that cannot be limited
        by law. Liability for project work is governed by the relevant project
        agreement.
      </p>
    ),
  },
  {
    id: "indemnity",
    title: "Indemnity",
    content: (
      <p>
        You agree to compensate {company.name} for claims, losses and reasonable
        costs that result from your breach of these Terms or your misuse of the
        Website.
      </p>
    ),
  },
  {
    id: "governing-law",
    title: "Governing law and disputes",
    content: (
      <p>
        These Terms are governed by the laws of {company.governingLaw}. We’d
        always prefer to resolve concerns informally, so please contact us
        first. If a dispute can’t be resolved that way, it will be handled
        by the competent courts of {company.governingLaw}.
      </p>
    ),
  },
  {
    id: "changes",
    title: "Changes to these terms",
    content: (
      <p>
        We may update these Terms from time to time. The latest version will
        always be on this page, with the “Last updated” date changed.
        Continuing to use the Website after an update means you accept the new
        Terms.
      </p>
    ),
  },
  {
    id: "contact",
    title: "Contact us",
    content: (
      <p>
        Questions about these Terms? Email{" "}
        <a href={`mailto:${company.email}`}>{company.email}</a> or reach us
        through our <Link href="/contact">contact page</Link>.
      </p>
    ),
  },
];

export default function TermsOfServicePage() {
  const pageSchema = generateWebPageSchema(
    "Terms of Service",
    description,
    "/terms-of-service",
  );
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Terms of Service", url: "/terms-of-service" },
  ]);

  return (
    <>
      <script {...getJsonLdProps(pageSchema)} />
      <script {...getJsonLdProps(breadcrumbSchema)} />
      <LegalLayout
        badge="Legal"
        titleBefore="Terms of"
        highlight="Service"
        intro="The ground rules for using our website, and how they fit with the agreements we sign for client projects."
        sections={sections}
        current="terms"
      />
    </>
  );
}
