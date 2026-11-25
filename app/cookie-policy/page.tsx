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
  "Which cookies the Alphorax website uses, what they do, how long they last, and how you can control them.";

export const metadata: Metadata = {
  title: "Cookie Policy",
  description,
  alternates: { canonical: "/cookie-policy" },
  openGraph: {
    title: "Cookie Policy | Alphorax",
    description,
    url: "/cookie-policy",
    siteName: "Alphorax",
    type: "website",
  },
};

// GA4 names its session cookie after the measurement ID without the "G-" prefix.
const gaSessionCookie = `_ga_${company.gaMeasurementId.replace(/^G-/, "")}`;

const cookies = [
  {
    name: "_ga",
    provider: "Google Analytics",
    purpose: "Distinguishes unique visitors so we can count them anonymously.",
    duration: "2 years",
    type: "Analytics",
  },
  {
    name: gaSessionCookie,
    provider: "Google Analytics",
    purpose: "Keeps track of your current session and page views.",
    duration: "2 years",
    type: "Analytics",
  },
  {
    name: "_fbp",
    provider: "Meta (Facebook)",
    purpose:
      "Set by the Meta Pixel. Identifies your browser so Meta can measure our Facebook and Instagram ads and show them to people who have visited our site.",
    duration: "90 days",
    type: "Marketing",
  },
  {
    name: "Calendly cookies",
    provider: "Calendly",
    purpose:
      "Make the meeting scheduler work and remember your booking progress. Set only when you open the scheduler on our contact page.",
    duration: "Session to 1 year",
    type: "Functional (third-party)",
  },
];

const browserGuides = [
  {
    name: "Google Chrome",
    href: "https://support.google.com/chrome/answer/95647",
  },
  {
    name: "Mozilla Firefox",
    href: "https://support.mozilla.org/kb/clear-cookies-and-site-data-firefox",
  },
  {
    name: "Safari",
    href: "https://support.apple.com/guide/safari/manage-cookies-sfri11471/mac",
  },
  {
    name: "Microsoft Edge",
    href: "https://support.microsoft.com/microsoft-edge/delete-cookies-in-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09",
  },
];

const sections: LegalSection[] = [
  {
    id: "what-are-cookies",
    title: "What are cookies?",
    content: (
      <p>
        Cookies are small text files that a website stores in your browser.
        They let the site recognise your device, remember choices and measure
        how pages are used. Some are set by the site you’re visiting
        (first-party); others are set by services embedded in it
        (third-party).
      </p>
    ),
  },
  {
    id: "how-we-use",
    title: "How we use cookies",
    content: (
      <>
        <p>
          We keep cookies to a minimum, and {company.website} doesn’t sell
          cookie data. We use cookies for three purposes:
        </p>
        <ul>
          <li>
            <strong>Analytics</strong> — Google Analytics helps us understand
            which pages are useful and how visitors find us, so we can improve
            the site.
          </li>
          <li>
            <strong>Marketing</strong> — the Meta Pixel tells us whether our
            Facebook and Instagram ads lead to visits, and lets us show our ads
            to people who have already visited our site.
          </li>
          <li>
            <strong>Functional (third-party)</strong> — Calendly sets cookies
            when you use the meeting scheduler so your booking works.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "cookie-list",
    title: "Cookies we use",
    content: (
      <>
        <div className="not-prose overflow-x-auto rounded-xl border border-secondary-silver/10">
          <table className="w-full text-sm text-left">
            <thead className="bg-primary/40 text-white">
              <tr>
                <th scope="col" className="px-4 py-3 font-semibold">Cookie</th>
                <th scope="col" className="px-4 py-3 font-semibold">Provider</th>
                <th scope="col" className="px-4 py-3 font-semibold">Purpose</th>
                <th scope="col" className="px-4 py-3 font-semibold whitespace-nowrap">Duration</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-secondary-silver/10">
              {cookies.map((cookie) => (
                <tr key={cookie.name} className="bg-secondary-charcoal/30 align-top">
                  <td className="px-4 py-3">
                    <code className="text-accent text-xs bg-secondary-charcoal/60 px-1.5 py-0.5 rounded">
                      {cookie.name}
                    </code>
                    <div className="text-xs text-secondary-silver/70 mt-1">
                      {cookie.type}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-secondary-silver whitespace-nowrap">
                    {cookie.provider}
                  </td>
                  <td className="px-4 py-3 text-secondary-silver min-w-[220px]">
                    {cookie.purpose}
                  </td>
                  <td className="px-4 py-3 text-secondary-silver whitespace-nowrap">
                    {cookie.duration}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p>
          Clicking our WhatsApp button or social media links takes you to those
          platforms, which may set their own cookies under their own policies.
        </p>
      </>
    ),
  },
  {
    id: "managing-cookies",
    title: "Managing cookies",
    content: (
      <>
        <p>
          You can block or delete cookies in your browser settings. Blocking
          analytics or marketing cookies won’t affect how the site works for
          you. Guides for popular browsers:
        </p>
        <ul>
          {browserGuides.map((guide) => (
            <li key={guide.name}>
              <a href={guide.href} target="_blank" rel="noopener noreferrer">
                {guide.name}
              </a>
            </li>
          ))}
        </ul>
        <p>
          To opt out of Google Analytics on every website, install the{" "}
          <a
            href="https://tools.google.com/dlpage/gaoptout"
            target="_blank"
            rel="noopener noreferrer"
          >
            Google Analytics Opt-out Browser Add-on
          </a>
          .
        </p>
        <p>
          To control how Meta uses information from websites like ours to show
          you ads, open the ad preferences in your Facebook or Instagram
          settings.
        </p>
      </>
    ),
  },
  {
    id: "changes",
    title: "Changes to this policy",
    content: (
      <p>
        If we add or change the cookies we use, we’ll update this page and
        the “Last updated” date above.
      </p>
    ),
  },
  {
    id: "more-information",
    title: "More information",
    content: (
      <p>
        For more on how we handle personal information, read our{" "}
        <Link href="/privacy-policy">Privacy Policy</Link>. Questions? Email{" "}
        <a href={`mailto:${company.privacyEmail}`}>{company.privacyEmail}</a>.
      </p>
    ),
  },
];

export default function CookiePolicyPage() {
  const pageSchema = generateWebPageSchema(
    "Cookie Policy",
    description,
    "/cookie-policy",
  );
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Cookie Policy", url: "/cookie-policy" },
  ]);

  return (
    <>
      <script {...getJsonLdProps(pageSchema)} />
      <script {...getJsonLdProps(breadcrumbSchema)} />
      <LegalLayout
        badge="Legal"
        titleBefore="Cookie"
        highlight="Policy"
        intro="A plain-language look at the cookies on our website, what they do, and how to switch them off."
        sections={sections}
        current="cookies"
      />
    </>
  );
}
