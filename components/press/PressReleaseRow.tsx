import React from "react";
import Link from "next/link";
import { ArrowUpRightIcon } from "lucide-react";
import { formatPressDate, type PressRelease } from "@/lib/press-releases";

export const SampleBadge = ({ className = "" }: { className?: string }) => (
  <span
    className={`inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-medium bg-secondary-charcoal/80 border border-secondary-silver/30 text-secondary-silver backdrop-blur-sm ${className}`}
    title="Placeholder announcement that shows the layout. Replace it with a real release before publishing."
  >
    Sample release
  </span>
);

interface PressReleaseRowProps {
  release: PressRelease;
  headingLevel?: "h2" | "h3" | "h4";
}

/** A dated, single-line entry in the newsroom list. */
const PressReleaseRow = ({ release, headingLevel = "h3" }: PressReleaseRowProps) => {
  const Heading = headingLevel;

  return (
    <Link
      href={`/press-release/${release.slug}`}
      className="group flex gap-4 md:gap-6 p-5 md:p-6 bg-secondary-charcoal/30 backdrop-blur-sm rounded-xl border border-secondary-silver/10 hover:border-accent/30 hover:shadow-xl hover:shadow-accent/10 transition-all focus:outline-none focus:ring-2 focus:ring-accent"
    >
      <time
        dateTime={release.date}
        className="flex-shrink-0 flex flex-col items-center justify-center w-16 h-16 md:w-20 md:h-20 rounded-lg bg-primary/40 border border-accent/20 group-hover:border-accent/50 transition-colors"
      >
        <span className="text-2xl md:text-3xl font-bold text-accent leading-none">
          {formatPressDate(release.date, { day: "2-digit" })}
        </span>
        <span className="text-[10px] md:text-xs uppercase tracking-wider text-secondary-silver mt-1">
          {formatPressDate(release.date, { month: "short", year: "numeric" })}
        </span>
      </time>
      <div className="flex-1 min-w-0">
        <div className="flex flex-wrap items-center gap-2 mb-2">
          <span className="text-sm text-accent/80">{release.category}</span>
          {release.sample && <SampleBadge />}
        </div>
        <Heading className="text-lg md:text-xl font-semibold mb-2 group-hover:text-accent transition-colors">
          {release.title}
        </Heading>
        <p className="text-secondary-silver line-clamp-2">{release.summary}</p>
      </div>
      <ArrowUpRightIcon
        size={20}
        className="hidden sm:block flex-shrink-0 mt-1 text-secondary-silver group-hover:text-accent group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all"
        aria-hidden="true"
      />
    </Link>
  );
};

export default PressReleaseRow;
