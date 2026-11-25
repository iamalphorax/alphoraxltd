import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
  ArrowLeftIcon,
  Building2Icon,
  CalendarIcon,
  CheckCircle2Icon,
  LayersIcon,
  TargetIcon,
} from "lucide-react";
import PageCTA from "@/components/shared/PageCTA";
import CaseStudyCard, {
  IllustrativeBadge,
  serviceIcons,
} from "@/components/case-studies/CaseStudyCard";
import {
  caseStudies,
  getCaseStudy,
  getRelatedCaseStudies,
} from "@/lib/case-studies";
import {
  generateBreadcrumbSchema,
  generateWebPageSchema,
  getJsonLdProps,
} from "@/lib/schema";

interface CaseStudyPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return caseStudies.map((study) => ({ slug: study.slug }));
}

export async function generateMetadata({
  params,
}: CaseStudyPageProps): Promise<Metadata> {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) return { title: "Case Study Not Found" };

  return {
    title: `${study.title} – Case Study`,
    description: study.summary,
    alternates: { canonical: `/case-studies/${study.slug}` },
    openGraph: {
      title: study.title,
      description: study.summary,
      url: `/case-studies/${study.slug}`,
      siteName: "Alphorax",
      type: "article",
      images: [{ url: study.image }],
    },
    twitter: {
      card: "summary_large_image",
      title: study.title,
      description: study.summary,
      images: [study.image],
    },
  };
}

const SectionHeading = ({
  icon: Icon,
  children,
}: {
  icon: typeof TargetIcon;
  children: React.ReactNode;
}) => (
  <h2 className="text-3xl font-bold mb-6 flex items-center">
    <span className="p-2 bg-primary/40 rounded-lg mr-3">
      <Icon size={22} className="text-accent" aria-hidden="true" />
    </span>
    {children}
  </h2>
);

export default async function CaseStudyPage({ params }: CaseStudyPageProps) {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) notFound();

  const ServiceIcon = serviceIcons[study.service];
  const related = getRelatedCaseStudies(study.slug);

  const pageSchema = generateWebPageSchema(
    study.title,
    study.summary,
    `/case-studies/${study.slug}`,
  );
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Case Studies", url: "/case-studies" },
    { name: study.title, url: `/case-studies/${study.slug}` },
  ]);

  const snapshot = [
    { icon: Building2Icon, label: "Client", value: study.client },
    { icon: LayersIcon, label: "Industry", value: study.industry },
    { icon: ServiceIcon, label: "Service", value: study.service },
    { icon: CalendarIcon, label: "Timeline", value: study.duration },
  ];

  return (
    <>
      <script {...getJsonLdProps(pageSchema)} />
      <script {...getJsonLdProps(breadcrumbSchema)} />

      <main>
        {/* Hero */}
        <section className="relative pt-12 pb-24 overflow-hidden">
          <div className="absolute inset-0" aria-hidden="true">
            <div
              className="absolute inset-0 bg-cover bg-center opacity-25"
              style={{ backgroundImage: `url('${study.image}')` }}
            ></div>
            <div className="absolute inset-0 bg-gradient-to-b from-secondary-charcoal/90 via-secondary-charcoal/85 to-primary/95"></div>
          </div>
          <div className="container mx-auto px-4 relative z-10">
            <nav aria-label="Breadcrumb" className="mb-10">
              <Link
                href="/case-studies"
                className="inline-flex items-center text-sm text-secondary-silver hover:text-accent transition-colors"
              >
                <ArrowLeftIcon size={16} className="mr-2" aria-hidden="true" />
                All case studies
              </Link>
            </nav>
            <div className="max-w-4xl">
              <div className="flex flex-wrap items-center gap-3 mb-6">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary-charcoal/50 border border-accent/20 text-sm text-accent/90">
                  <ServiceIcon size={14} aria-hidden="true" />
                  {study.service}
                </span>
                <span className="px-3 py-1 rounded-full bg-secondary-charcoal/50 border border-secondary-silver/20 text-sm text-secondary-silver">
                  {study.industry}
                </span>
                {study.illustrative && <IllustrativeBadge className="text-xs px-3 py-1" />}
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                {study.title}
              </h1>
              <p className="text-xl md:text-2xl text-secondary-silver max-w-3xl">
                {study.summary}
              </p>
            </div>

            {/* Results */}
            <dl className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-14">
              {study.results.map((result) => (
                <div
                  key={result.label}
                  className="bg-secondary-charcoal/40 backdrop-blur-sm rounded-xl p-6 border border-accent/20"
                >
                  <dt className="sr-only">{result.label}</dt>
                  <dd>
                    <div className="text-4xl md:text-5xl font-bold text-accent mb-2">
                      {result.value}
                    </div>
                    <div className="text-secondary-silver">{result.label}</div>
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* Body — no overflow-hidden here, it would break the sticky sidebar */}
        <section className="relative py-20 bg-secondary-charcoal">
          <div className="absolute inset-0 bg-neural-pattern opacity-10" aria-hidden="true"></div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_340px] gap-12 lg:gap-16">
              <article className="space-y-16">
                <div>
                  <SectionHeading icon={TargetIcon}>The Challenge</SectionHeading>
                  <div className="space-y-4 text-lg text-secondary-silver">
                    {study.challenge.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                  </div>
                </div>

                <div>
                  <SectionHeading icon={LayersIcon}>Our Approach</SectionHeading>
                  <ol className="relative border-l border-accent/20 ml-4 space-y-8">
                    {study.approach.map((step, index) => (
                      <li key={step.title} className="pl-8 relative">
                        <span className="absolute -left-4 top-0 flex items-center justify-center w-8 h-8 rounded-full bg-primary border border-accent/40 text-sm font-semibold text-accent">
                          {index + 1}
                        </span>
                        <h3 className="text-xl font-semibold mb-1">{step.title}</h3>
                        <p className="text-secondary-silver">{step.description}</p>
                      </li>
                    ))}
                  </ol>
                </div>

                <div>
                  <SectionHeading icon={CheckCircle2Icon}>The Solution</SectionHeading>
                  <ul className="space-y-4">
                    {study.solution.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-3 bg-secondary-charcoal/30 rounded-xl p-5 border border-secondary-silver/10"
                      >
                        <CheckCircle2Icon
                          size={20}
                          className="text-accent flex-shrink-0 mt-0.5"
                          aria-hidden="true"
                        />
                        <span className="text-secondary-silver">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </article>

              {/* Sidebar */}
              <aside className="space-y-6 lg:sticky lg:top-28 self-start">
                <div className="bg-secondary-charcoal/30 backdrop-blur-sm rounded-xl p-6 border border-secondary-silver/10">
                  <h2 className="text-xs font-semibold text-accent uppercase tracking-widest mb-5">
                    Project snapshot
                  </h2>
                  <dl className="space-y-4">
                    {snapshot.map((item) => (
                      <div key={item.label} className="flex items-start gap-3">
                        <item.icon
                          size={18}
                          className="text-accent mt-0.5 flex-shrink-0"
                          aria-hidden="true"
                        />
                        <div>
                          <dt className="text-xs text-secondary-silver">{item.label}</dt>
                          <dd className="font-medium">{item.value}</dd>
                        </div>
                      </div>
                    ))}
                  </dl>
                  <div className="mt-6 pt-6 border-t border-secondary-silver/10">
                    <h3 className="text-xs text-secondary-silver mb-3">Technologies</h3>
                    <ul className="flex flex-wrap gap-2">
                      {study.technologies.map((tech) => (
                        <li
                          key={tech}
                          className="px-2.5 py-1 rounded-md text-xs bg-primary/40 border border-accent/20 text-white"
                        >
                          {tech}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-primary/60 to-secondary-charcoal/60 rounded-xl p-6 border border-accent/30">
                  <h2 className="text-xl font-semibold mb-2">Facing something similar?</h2>
                  <p className="text-secondary-silver text-sm mb-5">
                    Book a free 30-minute call and we’ll talk through your options.
                  </p>
                  <Link
                    href="/contact"
                    className="block text-center px-5 py-3 bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-white rounded-md border border-accent/20 hover:border-accent transition-all shadow-lg shadow-accent/10"
                  >
                    Talk to our team
                  </Link>
                </div>
              </aside>
            </div>
          </div>
        </section>

        {/* Related */}
        {related.length > 0 && (
          <section className="relative py-20 overflow-hidden">
            <div className="absolute inset-0 bg-neural-pattern opacity-10" aria-hidden="true"></div>
            <div className="container mx-auto px-4 relative z-10">
              <div className="flex flex-wrap items-end justify-between gap-4 mb-10">
                <h2 className="text-3xl md:text-4xl font-bold">
                  More <span className="text-accent">Case Studies</span>
                </h2>
                <Link
                  href="/case-studies"
                  className="text-accent hover:text-accent/80 font-medium"
                >
                  View all →
                </Link>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {related.map((item) => (
                  <CaseStudyCard key={item.slug} study={item} />
                ))}
              </div>
            </div>
          </section>
        )}

        <PageCTA
          titleBefore="Let's Build Your"
          highlight="Success Story"
          description="From first idea to measurable results, we'll partner with you every step of the way."
          primary={{ label: "Start a Project", href: "/contact" }}
          secondary={{ label: "Explore Our Services", href: "/services" }}
        />
      </main>
    </>
  );
}
