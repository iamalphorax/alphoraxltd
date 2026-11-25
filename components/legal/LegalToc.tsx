"use client";

import React, { useEffect, useState } from "react";
import { ChevronDownIcon, ListIcon } from "lucide-react";

interface TocItem {
  id: string;
  title: string;
}

/** Table of contents that highlights the section currently in view. */
const LegalToc = ({ items }: { items: TocItem[] }) => {
  const [activeId, setActiveId] = useState(items[0]?.id);

  useEffect(() => {
    const elements = items
      .map((item) => document.getElementById(item.id))
      .filter((el): el is HTMLElement => el !== null);
    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActiveId(visible[0].target.id);
      },
      { rootMargin: "-120px 0px -60% 0px" },
    );
    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [items]);

  const links = (
    <ol className="space-y-1">
      {items.map((item, index) => {
        const isActive = item.id === activeId;
        return (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              className={`flex gap-3 py-1.5 pl-3 text-sm border-l-2 transition-colors ${
                isActive
                  ? "border-accent text-white"
                  : "border-secondary-silver/10 text-secondary-silver hover:text-accent hover:border-accent/40"
              }`}
              aria-current={isActive ? "location" : undefined}
            >
              <span className="text-accent/70 tabular-nums">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span>{item.title}</span>
            </a>
          </li>
        );
      })}
    </ol>
  );

  return (
    <>
      {/* Mobile: collapsible */}
      <details className="lg:hidden group bg-secondary-charcoal/30 backdrop-blur-sm rounded-xl border border-secondary-silver/10 mb-10">
        <summary className="flex items-center justify-between cursor-pointer list-none p-4 font-semibold">
          <span className="flex items-center gap-2">
            <ListIcon size={18} className="text-accent" aria-hidden="true" />
            On this page
          </span>
          <ChevronDownIcon
            size={18}
            className="text-secondary-silver group-open:rotate-180 transition-transform"
            aria-hidden="true"
          />
        </summary>
        <nav aria-label="Table of contents" className="px-4 pb-4">
          {links}
        </nav>
      </details>

      {/* Desktop: sticky sidebar */}
      <nav
        aria-label="Table of contents"
        className="hidden lg:block sticky top-28 bg-secondary-charcoal/30 backdrop-blur-sm rounded-xl border border-secondary-silver/10 p-5"
      >
        <p className="text-xs font-semibold text-accent uppercase tracking-widest mb-4">
          On this page
        </p>
        {links}
      </nav>
    </>
  );
};

export default LegalToc;
