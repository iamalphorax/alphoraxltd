import React from "react";
import Link from "next/link";
import type { Metadata } from "next";
import {
  ArrowRightIcon,
  CompassIcon,
  PenToolIcon,
  RocketIcon,
  TrendingUpIcon,
} from "lucide-react";
import PageHero from "@/components/shared/PageHero";
import PageCTA from "@/components/shared/PageCTA";
import CaseStudyGrid from "@/components/case-studies/CaseStudyGrid";
import {
  IllustrativeBadge,
  serviceIcons,
} from "@/components/case-studies/CaseStudyCard";
import { caseStudies, serviceLines } from "@/lib/case-studies";
import {
  generateBreadcrumbSchema,
  generateWebPageSchema,
  getJsonLdProps,
} from "@/lib/schema";

const description =
  "See how Alphorax helps businesses ship custom software, put AI to work and modernise their IT, with the challenge, approach and results behind each project.";

export const metadata: Metadata = {
  title: "Case Studies",
  description,
  alternates: { canonical: "/case-studies" },
  openGraph: {
    title: "Case Studies | Alphorax",
    description,
    url: "/case-studies",
    siteName: "Alphorax",
    type: "website",
  },
};

const deliverySteps = [
  {
    icon: CompassIcon,
    title: "Discover",
    description:
      "We dig into your goals, users and constraints to define what success looks like.",
  },
  {
    icon: PenToolIcon,
    title: "Design",
    description:
      "We prototype and validate the solution with real users before committing to build.",
  },
  {
    icon: RocketIcon,
    title: "Build & launch",
    description:
      "We ship in short iterations, so you see progress and can steer every two weeks.",
  },
  {
    icon: TrendingUpIcon,
    title: "Measure & scale",
    description:
      "We track the metrics that matter and keep improving after go-live.",
  },
];

export default function CaseStudiesPage() {
  const featured = caseStudies.find((study) => study.featured) ?? caseStudies[0];
  const FeaturedIcon = serviceIcons[featured.service];

  const pageSchema = generateWebPageSchema("Case Studies", description, "/case-studies");
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Case Studies", url: "/case-studies" },
  ]);

  return (
    <>
      <script {...getJsonLdProps(pageSchema)} />
      <script {...getJsonLdProps(breadcrumbSchema)} />

      <main>
        <PageHero
          badge="Case Studies"
          titleBefore="Real Problems,"
          highlight="Measurable Results"
          description="A closer look at how we turn business challenges into software, AI and infrastructure that deliver."
          image="https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2000&auto=format&fit=crop"
        >
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-12 max-w-3xl">
            {serviceLines.map((line) => {
              const Icon = serviceIcons[line];
              const count = caseStudies.filter((s) => s.service === line).length;
              return (
                <div
                  key={line}
                  className="flex items-center gap-3 bg-secondary-charcoal/30 backdrop-blur-sm rounded-xl p-4 border border-secondary-silver/10"
                >
                  <div className="p-2 bg-primary/40 rounded-lg">
                    <Icon size={20} className="text-accent" aria-hidden="true" />
                  </div>
                  <div>
                    <div className="font-semibold">{line}</div>
                    <div className="text-sm text-secondary-silver">
                      {count} {count === 1 ? "story" : "stories"}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </PageHero>

        {/* Featured case study */}
        <section className="relative py-20 bg-secondary-charcoal overflow-hidden">
          <div className="absolute inset-0 bg-neural-pattern opacity-10" aria-hidden="true"></div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="inline-block px-3 py-1 mb-6 rounded-full bg-secondary-charcoal/30 border border-accent/20 text-sm text-accent/90">
              Featured story
            </div>
            <Link
              href={`/case-studies/${featured.slug}`}
              className="group grid grid-cols-1 lg:grid-cols-2 rounded-2xl overflow-hidden border border-accent/20 hover:border-accent/50 bg-secondary-charcoal/50 shadow-xl shadow-accent/5 transition-all focus:outline-none focus:ring-2 focus:ring-accent"
            >
              <div className="relative h-64 lg:h-auto min-h-[18rem] overflow-hidden">
                <img
                  src={featured.image}
                  alt=""
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div
                  className="absolute inset-0 bg-gradient-to-r from-transparent to-secondary-charcoal/60 hidden lg:block"
                  aria-hidden="true"
                ></div>
                {featured.illustrative && (
                  <IllustrativeBadge className="absolute top-4 left-4" />
                )}
              </div>
              <div className="p-8 md:p-10 flex flex-col">
                <div className="flex flex-wrap items-center gap-3 mb-4 text-sm">
                  <span className="inline-flex items-center gap-1.5 text-accent">
                    <FeaturedIcon size={16} aria-hidden="true" />
                    {featured.service}
                  </span>
                  <span className="text-secondary-silver/50" aria-hidden="true">•</span>
                  <span className="text-secondary-silver">{featured.industry}</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold mb-4 group-hover:text-accent transition-colors">
                  {featured.title}
                </h2>
                <p className="text-lg text-secondary-silver mb-8">{featured.summary}</p>
                <div className="grid grid-cols-3 gap-4 mb-8">
                  {featured.results.map((result) => (
                    <div key={result.label}>
                      <div className="text-2xl md:text-3xl font-bold text-accent">
                        {result.value}
                      </div>
                      <div className="text-xs md:text-sm text-secondary-silver">
                        {result.label}
                      </div>
                    </div>
                  ))}
                </div>
                <span className="mt-auto inline-flex items-center text-accent font-medium">
                  Read the full story
                  <ArrowRightIcon
                    size={18}
                    className="ml-2 group-hover:translate-x-1 transition-transform"
                    aria-hidden="true"
                  />
                </span>
              </div>
            </Link>
          </div>
        </section>

        {/* All case studies */}
        <section className="relative py-24 overflow-hidden">
          <div className="absolute inset-0" aria-hidden="true">
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-fixed bg-center opacity-10"></div>
            <div className="absolute inset-0 bg-gradient-to-b from-secondary-charcoal/95 to-primary/90"></div>
          </div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center mb-10">
              <h2 className="text-4xl font-bold mb-4">
                Explore Our <span className="text-accent">Work</span>
              </h2>
              <p className="text-xl text-secondary-silver max-w-2xl mx-auto">
                Filter by service to find projects like yours.
              </p>
            </div>
            <CaseStudyGrid studies={caseStudies} serviceLines={serviceLines} />
          </div>
        </section>

        {/* How we deliver */}
        <section className="relative py-20 bg-secondary-charcoal overflow-hidden">
          <div className="absolute inset-0 bg-neural-pattern opacity-10" aria-hidden="true"></div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center mb-14">
              <div className="inline-block px-3 py-1 mb-4 rounded-full bg-secondary-charcoal/30 border border-accent/20 text-sm text-accent/90">
                Our Process
              </div>
              <h2 className="text-4xl font-bold mb-4">
                How We <span className="text-accent">Deliver</span>
              </h2>
              <p className="text-xl text-secondary-silver max-w-2xl mx-auto">
                Every project on this page followed the same proven approach.
              </p>
            </div>
            <ol className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {deliverySteps.map((step, index) => (
                <li
                  key={step.title}
                  className="relative bg-secondary-charcoal/30 backdrop-blur-sm rounded-xl p-6 border border-secondary-silver/10 hover:border-accent/30 transition-all group"
                >
                  <span
                    className="absolute top-5 right-6 text-4xl font-bold text-accent/10 group-hover:text-accent/20 transition-colors"
                    aria-hidden="true"
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div className="p-2 bg-primary/30 rounded-lg inline-block mb-4 group-hover:bg-primary/50 transition-colors">
                    <step.icon size={24} className="text-accent" aria-hidden="true" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2 group-hover:text-accent transition-colors">
                    {step.title}
                  </h3>
                  <p className="text-secondary-silver">{step.description}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <PageCTA
          titleBefore="Have a Challenge"
          highlight="Like These?"
          description="Tell us what you're working on. We'll share how we'd approach it in a free 30-minute discovery call."
          primary={{ label: "Start a Conversation", href: "/contact" }}
          secondary={{ label: "Explore Our Services", href: "/services" }}
        />
      </main>
    </>
  );
}
