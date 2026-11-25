import React from "react";

interface PageHeroProps {
  badge: string;
  titleBefore?: string;
  highlight: string;
  titleAfter?: string;
  description: string;
  /** Background photo. Omit for a plain patterned hero (used on legal pages). */
  image?: string;
  compact?: boolean;
  children?: React.ReactNode;
}

/** Hero block matching the About / Contact page style. */
const PageHero = ({
  badge,
  titleBefore,
  highlight,
  titleAfter,
  description,
  image,
  compact = false,
  children,
}: PageHeroProps) => {
  return (
    <section
      className={`relative overflow-hidden ${compact ? "pt-16 pb-16 md:pt-20 md:pb-20" : "pt-20 pb-24 md:pb-32"}`}
    >
      <div className="absolute inset-0" aria-hidden="true">
        {image ? (
          <div
            className="absolute inset-0 bg-cover bg-center bg-fixed opacity-20"
            style={{ backgroundImage: `url('${image}')` }}
          ></div>
        ) : (
          <div className="absolute inset-0 bg-neural-pattern opacity-20"></div>
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-secondary-charcoal/90 to-primary/90"></div>
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-accent/10 rounded-full blur-3xl"></div>
      </div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl">
          <div className="inline-block px-3 py-1 mb-6 rounded-full bg-secondary-charcoal/50 border border-accent/20 text-sm text-accent/90">
            {badge}
          </div>
          <h1
            className={`font-bold mb-6 ${compact ? "text-4xl md:text-5xl" : "text-5xl md:text-6xl"}`}
          >
            {titleBefore && <>{titleBefore} </>}
            <span className="text-accent relative inline-block">
              {highlight}
              <svg
                className="absolute -bottom-2 left-0 w-full"
                height="6"
                viewBox="0 0 200 6"
                preserveAspectRatio="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  d="M0,3 C50,1 150,6 200,3"
                  stroke="rgba(77, 159, 255, 0.5)"
                  strokeWidth="2"
                  fill="none"
                />
              </svg>
            </span>
            {titleAfter && <> {titleAfter}</>}
          </h1>
          <p
            className={`text-secondary-silver max-w-2xl ${compact ? "text-lg md:text-xl" : "text-xl md:text-2xl mb-8"}`}
          >
            {description}
          </p>
        </div>
        {children}
      </div>
    </section>
  );
};

export default PageHero;
