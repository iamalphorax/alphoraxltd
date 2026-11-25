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
  "How Alphorax collects, uses, shares and protects personal information when you visit our website, contact us, subscribe to our newsletter or apply for a role.";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description,
  alternates: { canonical: "/privacy-policy" },
  openGraph: {
    title: "Privacy Policy | Alphorax",
    description,
    url: "/privacy-policy",
    siteName: "Alphorax",
    type: "website",
  },
};

const mail = (
  <a href={`mailto:${company.privacyEmail}`}>{company.privacyEmail}</a>
);

const sections: LegalSection[] = [
  {
    id: "who-we-are",
    title: "Who we are",
    content: (
      <>
        <p>
          {company.legalName} (“{company.name}”, “we”,
          “us”) builds custom software, AI solutions and provides IT
          consulting to businesses worldwide. This policy explains how we handle
          personal information collected through {company.website} and the
          conversations that start there.
        </p>
        <p>
          We are responsible for the personal information described here. Work
          we carry out for clients under a contract is covered by that contract
          and any data processing agreement attached to it.
        </p>
      </>
    ),
  },
  {
    id: "information-we-collect",
    title: "Information we collect",
    content: (
      <>
        <h3>Information you give us</h3>
        <ul>
          <li>
            <strong>Contact form</strong> — your name, email address, phone
            number, company, subject, message and the services you’re
            interested in.
          </li>
          <li>
            <strong>Newsletter</strong> — your email address.
          </li>
          <li>
            <strong>Job applications</strong> — your name, email, location, the
            role you’re applying for, links to your CV, portfolio or
            LinkedIn profile, and anything you tell us in your message.
          </li>
          <li>
            <strong>Meeting bookings</strong> — when you book a call through our
            Calendly scheduler, Calendly collects your name, email and any
            details you add, and shares them with us.
          </li>
          <li>
            <strong>Direct messages</strong> — anything you send us by email,
            phone or WhatsApp.
          </li>
        </ul>
        <h3>Information collected automatically</h3>
        <ul>
          <li>
            <strong>Analytics</strong> — we use Google Analytics to understand
            how the site is used: pages viewed, time on page, referring website,
            device and browser type, and approximate location derived from your
            IP address. See our <Link href="/cookie-policy">Cookie Policy</Link>{" "}
            for details.
          </li>
          <li>
            <strong>Advertising</strong> — we use the Meta Pixel to measure how
            well our Facebook and Instagram ads work and to show our ads to people
            who have visited our site. It records the pages you visit, your
            browser and device details, and a cookie identifier, and sends them
            to Meta. Our server also sends these events to Meta through its
            Conversions API. When you send our contact form, join our
            newsletter or book a call with us, we include a hashed (scrambled, one-way) copy of your
            email address and, if you gave them, your phone number and name, so
            Meta can match the event to an account. We don’t send job
            applicants’ contact details to Meta.
          </li>
          <li>
            <strong>Server logs</strong> — our hosting provider records
            technical data such as IP address, browser, and request times to
            keep the site secure and running.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "how-we-use-it",
    title: "How we use your information",
    content: (
      <ul>
        <li>To reply to your enquiry and prepare proposals or quotes.</li>
        <li>To schedule and hold discovery calls you book with us.</li>
        <li>To deliver and manage services we’ve agreed to provide.</li>
        <li>
          To send our newsletter, if you subscribed. Every email includes an
          unsubscribe link.
        </li>
        <li>To assess job applications and contact candidates.</li>
        <li>To measure and improve the website’s content and performance.</li>
        <li>To measure our advertising and show our ads to people interested in our services.</li>
        <li>To protect the site against abuse, fraud and security threats.</li>
        <li>To comply with legal and regulatory obligations.</li>
      </ul>
    ),
  },
  {
    id: "legal-bases",
    title: "Legal bases for processing",
    content: (
      <>
        <p>
          Where data protection laws such as the EU/UK GDPR or the Nigeria Data
          Protection Act 2023 apply, we rely on the following grounds:
        </p>
        <ul>
          <li>
            <strong>Consent</strong> — for the newsletter, and for analytics and
            advertising cookies.
            You can withdraw consent at any time.
          </li>
          <li>
            <strong>Contract</strong> — to take steps at your request before
            entering a contract, and to perform it.
          </li>
          <li>
            <strong>Legitimate interests</strong> — to answer enquiries, run and
            secure our website, and evaluate applications, where those interests
            aren’t overridden by your rights.
          </li>
          <li>
            <strong>Legal obligation</strong> — where the law requires us to keep
            or disclose information.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "sharing",
    title: "Who we share it with",
    content: (
      <>
        <p>
          We don’t sell personal information. We share it only with
          providers that help us run the business, under contracts that limit
          how they use it:
        </p>
        <ul>
          <li>
            <strong>Brevo</strong> — delivers contact-form emails and manages
            our newsletter list.
          </li>
          <li>
            <strong>Google</strong> — provides website analytics.
          </li>
          <li>
            <strong>Calendly</strong> — handles meeting scheduling.
          </li>
          <li>
            <strong>Meta</strong> — measures our Facebook and Instagram ads
            through the Meta Pixel, and runs WhatsApp if you choose to message us
            there.
          </li>
          <li>
            <strong>Hosting and media providers</strong> — serve the website and
            its images.
          </li>
        </ul>
        <p>
          We may also disclose information if required by law, to protect our
          rights or the safety of others, or as part of a merger, acquisition or
          sale of business assets.
        </p>
      </>
    ),
  },
  {
    id: "international-transfers",
    title: "International transfers",
    content: (
      <p>
        We work with a distributed team and with providers based in different
        countries, so your information may be processed outside the country
        where you live. When we transfer personal data, we use appropriate
        safeguards such as standard contractual clauses or providers that
        participate in recognised data transfer frameworks.
      </p>
    ),
  },
  {
    id: "retention",
    title: "How long we keep it",
    content: (
      <ul>
        <li>
          <strong>Enquiries</strong> — for as long as needed to respond, and up
          to 24 months after our last contact unless we start working together.
        </li>
        <li>
          <strong>Client records</strong> — for the length of the engagement and
          as long afterwards as tax and contract law require.
        </li>
        <li>
          <strong>Newsletter</strong> — until you unsubscribe.
        </li>
        <li>
          <strong>Job applications</strong> — up to 12 months after the hiring
          decision, unless you ask us to keep them longer for future roles.
        </li>
        <li>
          <strong>Analytics</strong> — according to our Google Analytics data
          retention settings (up to 14 months).
        </li>
        <li>
          <strong>Advertising</strong> — the Meta Pixel cookie expires after 90
          days. Meta keeps the data it receives under its own data policy.
        </li>
      </ul>
    ),
  },
  {
    id: "your-rights",
    title: "Your rights",
    content: (
      <>
        <p>Depending on where you live, you may have the right to:</p>
        <ul>
          <li>access the personal information we hold about you;</li>
          <li>have inaccurate information corrected;</li>
          <li>have your information deleted;</li>
          <li>restrict or object to how we process it;</li>
          <li>receive a copy in a portable format;</li>
          <li>withdraw consent you previously gave;</li>
          <li>
            complain to a data protection authority, such as the Nigeria Data
            Protection Commission or the authority in your country.
          </li>
        </ul>
        <p>
          To exercise any of these rights, email {mail}. We’ll respond
          within 30 days and may need to verify your identity first.
        </p>
      </>
    ),
  },
  {
    id: "security",
    title: "How we protect it",
    content: (
      <p>
        We use encrypted connections (HTTPS), restrict access to people who need
        it, and choose providers with strong security practices. No method of
        transmission or storage is completely secure, so please don’t send
        highly sensitive information through our website forms. If you need to
        share confidential project details, we’re happy to sign an NDA
        first.
      </p>
    ),
  },
  {
    id: "children",
    title: "Children",
    content: (
      <p>
        Our website and services are intended for businesses and are not
        directed at children under 16. We don’t knowingly collect their
        personal information. If you believe a child has sent us information,
        contact us and we’ll delete it.
      </p>
    ),
  },
  {
    id: "third-party-links",
    title: "Third-party websites",
    content: (
      <p>
        Our site links to other websites and social networks. We aren’t
        responsible for their privacy practices, so please read their policies
        before sharing information with them.
      </p>
    ),
  },
  {
    id: "changes",
    title: "Changes to this policy",
    content: (
      <p>
        We may update this policy as our services or the law change. We’ll
        post the new version on this page and update the “Last
        updated” date. For significant changes, we’ll give more
        prominent notice.
      </p>
    ),
  },
  {
    id: "contact",
    title: "Contact us",
    content: (
      <p>
        For any privacy question or request, email {mail} or use our{" "}
        <Link href="/contact">contact page</Link>.
      </p>
    ),
  },
];

export default function PrivacyPolicyPage() {
  const pageSchema = generateWebPageSchema(
    "Privacy Policy",
    description,
    "/privacy-policy",
  );
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Privacy Policy", url: "/privacy-policy" },
  ]);

  return (
    <>
      <script {...getJsonLdProps(pageSchema)} />
      <script {...getJsonLdProps(breadcrumbSchema)} />
      <LegalLayout
        badge="Legal"
        titleBefore="Privacy"
        highlight="Policy"
        intro="Your trust matters to us. Here's what personal information we collect, why we collect it, and the choices you have."
        sections={sections}
        current="privacy"
      />
    </>
  );
}
