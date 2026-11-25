"use client";

import React, { useState } from "react";
import CaseStudyCard from "@/components/case-studies/CaseStudyCard";
import type { CaseStudy, ServiceLine } from "@/lib/case-studies";

type Filter = "All" | ServiceLine;

/** Case study grid with service-line filter tabs. */
const CaseStudyGrid = ({
  studies,
  serviceLines,
}: {
  studies: CaseStudy[];
  serviceLines: ServiceLine[];
}) => {
  const [filter, setFilter] = useState<Filter>("All");
  const filters: Filter[] = ["All", ...serviceLines];
  const visible =
    filter === "All" ? studies : studies.filter((s) => s.service === filter);

  return (
    <>
      <div
        className="flex flex-wrap justify-center gap-2 mb-12"
        role="group"
        aria-label="Filter case studies by service"
      >
        {filters.map((item) => {
          const count =
            item === "All"
              ? studies.length
              : studies.filter((s) => s.service === item).length;
          const isActive = filter === item;
          return (
            <button
              key={item}
              type="button"
              onClick={() => setFilter(item)}
              aria-pressed={isActive}
              className={`px-4 py-2 rounded-full text-sm font-medium border transition-all focus:outline-none focus:ring-2 focus:ring-accent ${
                isActive
                  ? "bg-gradient-to-r from-primary to-accent border-accent/40 text-white shadow-lg shadow-accent/10"
                  : "bg-secondary-charcoal/30 border-secondary-silver/20 text-secondary-silver hover:text-white hover:border-accent/40"
              }`}
            >
              {item}
              <span
                className={`ml-2 text-xs ${isActive ? "text-white/80" : "text-secondary-silver/60"}`}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {visible.map((study) => (
          <CaseStudyCard key={study.slug} study={study} />
        ))}
      </div>
    </>
  );
};

export default CaseStudyGrid;
