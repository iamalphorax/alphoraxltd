import React from "react";
import Link from "next/link";
import { ArrowRightIcon, BrainIcon, CodeIcon, ServerCogIcon } from "lucide-react";
import type { CaseStudy, ServiceLine } from "@/lib/case-studies";

export const serviceIcons: Record<ServiceLine, typeof CodeIcon> = {
  "Project Development": CodeIcon,
  "AI Solutions": BrainIcon,
  "IT Consulting": ServerCogIcon,
};

export const IllustrativeBadge = ({ className = "" }: { className?: string }) => (
  <span
    className={`inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-medium bg-secondary-charcoal/80 border border-secondary-silver/30 text-secondary-silver backdrop-blur-sm ${className}`}
    title="This example shows the kind of work we do. It isn't a specific named client engagement."
  >
    Illustrative example
  </span>
);

const CaseStudyCard = ({ study }: { study: CaseStudy }) => {
  const Icon = serviceIcons[study.service];
  const headline = study.results[0];

  return (
    <Link
      href={`/case-studies/${study.slug}`}
      className="group flex flex-col bg-secondary-charcoal/30 backdrop-blur-sm rounded-xl overflow-hidden border border-secondary-silver/10 hover:border-accent/30 hover:shadow-xl hover:shadow-accent/10 transition-all focus:outline-none focus:ring-2 focus:ring-accent"
    >
      <div className="h-48 overflow-hidden relative">
        <img
          src={study.image}
          alt=""
          className="w-full h-full object-cover scale-100 group-hover:scale-110 transition-transform duration-700"
          loading="lazy"
        />
        <div
          className="absolute inset-0 bg-gradient-to-t from-secondary-charcoal via-secondary-charcoal/20 to-transparent"
          aria-hidden="true"
        ></div>
        <span className="absolute top-3 left-3 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-primary/80 border border-accent/30 text-white backdrop-blur-sm">
          <Icon size={14} className="text-accent" aria-hidden="true" />
          {study.service}
        </span>
        {study.illustrative && (
          <IllustrativeBadge className="absolute top-3 right-3" />
        )}
      </div>
      <div className="flex flex-col flex-1 p-6">
        <div className="text-sm text-accent/80 mb-2">{study.industry}</div>
        <h3 className="text-xl font-semibold mb-3 group-hover:text-accent transition-colors">
          {study.title}
        </h3>
        <p className="text-secondary-silver mb-6 line-clamp-3">{study.summary}</p>
        <div className="mt-auto flex items-end justify-between gap-4 pt-4 border-t border-secondary-silver/10">
          <div>
            <div className="text-2xl font-bold text-accent">{headline.value}</div>
            <div className="text-xs text-secondary-silver">{headline.label}</div>
          </div>
          <span className="inline-flex items-center text-accent text-sm font-medium whitespace-nowrap">
            Read story
            <ArrowRightIcon
              size={14}
              className="ml-1 group-hover:ml-2 transition-all"
              aria-hidden="true"
            />
          </span>
        </div>
      </div>
    </Link>
  );
};

export default CaseStudyCard;
