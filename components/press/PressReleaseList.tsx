"use client";

import React, { useState } from "react";
import PressReleaseRow from "@/components/press/PressReleaseRow";
import type { PressCategory, PressRelease } from "@/lib/press-releases";

interface PressReleaseListProps {
  releases: PressRelease[];
  categories: PressCategory[];
}

type Filter = PressCategory | "All";

/** Category filter plus releases grouped by year (newest first). */
const PressReleaseList = ({ releases, categories }: PressReleaseListProps) => {
  const [filter, setFilter] = useState<Filter>("All");

  const visible =
    filter === "All" ? releases : releases.filter((r) => r.category === filter);

  const years: { year: string; items: PressRelease[] }[] = [];
  for (const release of visible) {
    const year = release.date.slice(0, 4);
    const group = years.find((g) => g.year === year);
    if (group) group.items.push(release);
    else years.push({ year, items: [release] });
  }

  const filters: Filter[] = ["All", ...categories];

  return (
    <>
      <div
        className="flex flex-wrap gap-2 mb-12"
        role="group"
        aria-label="Filter press releases by category"
      >
        {filters.map((item) => {
          const count =
            item === "All"
              ? releases.length
              : releases.filter((r) => r.category === item).length;
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

      {years.map(({ year, items }) => (
        <div
          key={year}
          className="grid grid-cols-1 md:grid-cols-[120px_minmax(0,1fr)] gap-4 md:gap-8 mb-14 last:mb-0"
        >
          <h3 className="flex items-center gap-4 text-3xl md:text-4xl font-bold text-white/90 md:sticky md:top-28 self-start">
            {year}
            <span className="flex-1 h-px bg-secondary-silver/10 md:hidden" aria-hidden="true"></span>
          </h3>
          <ul className="space-y-4">
            {items.map((release) => (
              <li key={release.slug}>
                <PressReleaseRow release={release} headingLevel="h4" />
              </li>
            ))}
          </ul>
        </div>
      ))}

      {visible.length === 0 && (
        <p className="text-secondary-silver">No releases in this category yet.</p>
      )}
    </>
  );
};

export default PressReleaseList;
