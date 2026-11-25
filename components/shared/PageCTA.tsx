import React from "react";
import Link from "next/link";
import { ArrowRightIcon } from "lucide-react";

interface PageCTAProps {
  titleBefore: string;
  highlight: string;
  description: string;
  primary: { label: string; href: string };
  secondary?: { label: string; href: string };
}

/** Closing call-to-action card, same treatment as the About page CTA. */
const PageCTA = ({
  titleBefore,
  highlight,
  description,
  primary,
  secondary,
}: PageCTAProps) => {
  return (
    <section className="relative py-20 overflow-hidden">
      <div className="absolute inset-0 bg-neural-pattern opacity-10" aria-hidden="true"></div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto bg-secondary-charcoal/50 backdrop-blur-md rounded-2xl p-8 md:p-12 border border-accent/20 shadow-xl shadow-accent/5 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {titleBefore} <span className="text-accent">{highlight}</span>
          </h2>
          <p className="text-xl text-secondary-silver mb-8 max-w-2xl mx-auto">
            {description}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href={primary.href}
              className="px-8 py-4 bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-white rounded-md border border-accent/20 hover:border-accent transition-all shadow-lg shadow-accent/10 inline-flex items-center group"
            >
              <span>{primary.label}</span>
              <ArrowRightIcon
                size={20}
                className="ml-2 group-hover:translate-x-1 transition-transform"
                aria-hidden="true"
              />
            </Link>
            {secondary && (
              <Link
                href={secondary.href}
                className="px-8 py-4 bg-transparent hover:bg-white/10 text-white rounded-md border border-white/30 hover:border-white/50 transition-all"
              >
                {secondary.label}
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PageCTA;
