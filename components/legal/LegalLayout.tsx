import React from "react";
import Link from "next/link";
import {
  CalendarIcon,
  CookieIcon,
  FileTextIcon,
  MailIcon,
  ShieldCheckIcon,
} from "lucide-react";
import PageHero from "@/components/shared/PageHero";
import LegalToc from "@/components/legal/LegalToc";
import { company, legalLastUpdated } from "@/lib/company";

export interface LegalSection {
  id: string;
  title: string;
  content: React.ReactNode;
}

interface LegalLayoutProps {
  badge: string;
  titleBefore?: string;
  highlight: string;
  intro: string;
  sections: LegalSection[];
  current: "privacy" | "terms" | "cookies";
}

const legalPages = [
  {
    key: "privacy",
    label: "Privacy Policy",
    href: "/privacy-policy",
    icon: ShieldCheckIcon,
  },
  {
    key: "terms",
    label: "Terms of Service",
    href: "/terms-of-service",
    icon: FileTextIcon,
  },
  {
    key: "cookies",
    label: "Cookie Policy",
    href: "/cookie-policy",
    icon: CookieIcon,
  },
] as const;

/** Shared shell for Privacy, Terms and Cookie pages. */
const LegalLayout = ({
  badge,
  titleBefore,
  highlight,
  intro,
  sections,
  current,
}: LegalLayoutProps) => {
  return (
    <main>
      <PageHero
        badge={badge}
        titleBefore={titleBefore}
        highlight={highlight}
        description={intro}
        compact
      >
        <div className="flex flex-wrap items-center gap-3 mt-8 text-sm">
          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-secondary-charcoal/50 border border-secondary-silver/10 text-secondary-silver">
            <CalendarIcon size={16} className="text-accent" aria-hidden="true" />
            Last updated: <span className="text-white">{legalLastUpdated}</span>
          </span>
          {/* Sibling legal pages */}
          <nav aria-label="Legal pages" className="flex flex-wrap gap-2">
            {legalPages
              .filter((page) => page.key !== current)
              .map((page) => (
                <Link
                  key={page.key}
                  href={page.href}
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md border border-accent/20 text-secondary-silver hover:text-accent hover:border-accent/50 transition-colors"
                >
                  <page.icon size={16} aria-hidden="true" />
                  {page.label}
                </Link>
              ))}
          </nav>
        </div>
      </PageHero>

      <section className="relative py-16 md:py-20 bg-secondary-charcoal/40">
        <div className="absolute inset-0 bg-neural-pattern opacity-5" aria-hidden="true"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-[280px_minmax(0,1fr)] gap-10 lg:gap-16">
            <aside>
              <LegalToc
                items={sections.map(({ id, title }) => ({ id, title }))}
              />
            </aside>

            <div className="max-w-3xl min-w-0">
              {sections.map((section, index) => (
                <section
                  key={section.id}
                  id={section.id}
                  className="scroll-mt-28 pb-10 mb-10 border-b border-secondary-silver/10 last:border-b-0"
                >
                  <h2 className="flex items-baseline gap-4 text-2xl md:text-3xl font-bold mb-5">
                    <span className="text-base font-semibold text-accent tabular-nums">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    {section.title}
                  </h2>
                  <div className="prose prose-invert max-w-none prose-p:text-secondary-silver prose-li:text-secondary-silver prose-li:marker:text-accent prose-strong:text-white prose-a:text-accent prose-a:no-underline hover:prose-a:underline prose-h3:text-white prose-h3:text-lg prose-th:text-white prose-td:text-secondary-silver prose-table:text-sm">
                    {section.content}
                  </div>
                </section>
              ))}

              {/* Contact card */}
              <div className="bg-secondary-charcoal/50 backdrop-blur-md rounded-2xl p-8 border border-accent/20 shadow-xl shadow-accent/5 flex flex-col sm:flex-row sm:items-center gap-6">
                <div className="p-3 bg-primary/40 rounded-lg self-start">
                  <MailIcon size={28} className="text-accent" aria-hidden="true" />
                </div>
                <div className="flex-1">
                  <h2 className="text-xl font-semibold mb-1">
                    Questions about this page?
                  </h2>
                  <p className="text-secondary-silver">
                    Email us at{" "}
                    <a
                      href={`mailto:${company.privacyEmail}`}
                      className="text-accent hover:underline"
                    >
                      {company.privacyEmail}
                    </a>{" "}
                    and we’ll get back to you.
                  </p>
                </div>
                <Link
                  href="/contact"
                  className="px-6 py-3 bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-white rounded-md border border-accent/20 hover:border-accent transition-all shadow-lg shadow-accent/10 text-center"
                >
                  Contact us
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default LegalLayout;
