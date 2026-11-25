import React from "react";
import { DownloadIcon, ImageIcon, InfoIcon, PaletteIcon, FileTextIcon } from "lucide-react";
import CopyButton from "@/components/press/CopyButton";
import { boilerplate, brandColors, companyFacts } from "@/lib/press-releases";

const logoGuidelines = [
  "Leave clear space around the logo of at least half its height",
  "Don’t stretch, rotate, recolor or add effects to the logo",
  "Write the company name as “Alphorax” — one word, capital A",
];

const CardHeading = ({
  icon: Icon,
  children,
}: {
  icon: typeof ImageIcon;
  children: React.ReactNode;
}) => (
  <h3 className="flex items-center gap-3 text-xl font-semibold">
    <span className="p-2 bg-primary/40 rounded-lg">
      <Icon size={20} className="text-accent" aria-hidden="true" />
    </span>
    {children}
  </h3>
);

const card =
  "bg-secondary-charcoal/30 backdrop-blur-sm rounded-xl p-6 md:p-8 border border-secondary-silver/10";

/** Logo, colors, company facts and boilerplate for journalists. */
const MediaKit = () => {
  return (
    <section
      id="media-kit"
      className="relative py-20 bg-secondary-charcoal overflow-hidden scroll-mt-20"
    >
      <div className="absolute inset-0 bg-neural-pattern opacity-10" aria-hidden="true"></div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-14">
          <div className="inline-block px-3 py-1 mb-4 rounded-full bg-secondary-charcoal/30 border border-accent/20 text-sm text-accent/90">
            Media Kit
          </div>
          <h2 className="text-4xl font-bold mb-4">
            Brand Assets{" & "}<span className="text-accent">Company Facts</span>
          </h2>
          <p className="text-xl text-secondary-silver max-w-2xl mx-auto">
            Everything you need to write about Alphorax. Please follow the simple
            guidelines below when you use our logo.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Logo */}
          <div className={`${card} lg:col-span-2`}>
            <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
              <CardHeading icon={ImageIcon}>Logo</CardHeading>
              <a
                href="/logo.png"
                download="alphorax-logo.png"
                className="inline-flex items-center gap-2 px-4 py-2 text-sm bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-white rounded-md border border-accent/20 hover:border-accent transition-all shadow-lg shadow-accent/10"
              >
                <DownloadIcon size={16} aria-hidden="true" />
                Download PNG
              </a>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              {[
                { label: "On dark backgrounds", tile: "bg-primary border-accent/20" },
                { label: "On light backgrounds", tile: "bg-white border-secondary-silver/20" },
              ].map((variant) => (
                <figure key={variant.label}>
                  <div
                    className={`flex items-center justify-center h-40 rounded-lg border ${variant.tile}`}
                  >
                    <img src="/logo.png" alt="Alphorax logo" className="h-24 w-auto" />
                  </div>
                  <figcaption className="text-xs text-secondary-silver mt-2">
                    {variant.label}
                  </figcaption>
                </figure>
              ))}
            </div>
            <ul className="space-y-2 text-sm text-secondary-silver">
              {logoGuidelines.map((rule) => (
                <li key={rule} className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 mt-2 bg-accent rounded-full flex-shrink-0" aria-hidden="true"></span>
                  {rule}
                </li>
              ))}
            </ul>
          </div>

          {/* Facts */}
          <div className={card}>
            <div className="mb-6">
              <CardHeading icon={InfoIcon}>At a glance</CardHeading>
            </div>
            <dl className="divide-y divide-secondary-silver/10">
              {companyFacts.map((fact) => (
                <div key={fact.label} className="py-3 first:pt-0 last:pb-0">
                  <dt className="text-xs uppercase tracking-wider text-secondary-silver mb-1">
                    {fact.label}
                  </dt>
                  <dd className="font-medium">{fact.value}</dd>
                </div>
              ))}
            </dl>
          </div>

          {/* Colors */}
          <div className={card}>
            <div className="mb-6">
              <CardHeading icon={PaletteIcon}>Brand colors</CardHeading>
            </div>
            <ul className="space-y-3">
              {brandColors.map((color) => (
                <li key={color.hex} className="flex items-center gap-4">
                  <span
                    className="w-11 h-11 rounded-lg border border-white/25 flex-shrink-0"
                    style={{ backgroundColor: color.hex }}
                    aria-hidden="true"
                  ></span>
                  <div className="flex-1 min-w-0">
                    <div className="font-medium">{color.name}</div>
                    <div className="text-xs text-secondary-silver">
                      <span className="font-mono">{color.hex}</span> · {color.usage}
                    </div>
                  </div>
                  <CopyButton
                    text={color.hex}
                    srLabel={`Copy ${color.name} hex code`}
                    className="w-9 h-9 flex-shrink-0"
                  />
                </li>
              ))}
            </ul>
          </div>

          {/* Boilerplate */}
          <div className={`${card} lg:col-span-2 flex flex-col`}>
            <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
              <CardHeading icon={FileTextIcon}>About Alphorax</CardHeading>
              <CopyButton text={boilerplate} label="Copy text" className="px-4 py-2 text-sm" />
            </div>
            <p className="text-lg text-secondary-silver leading-relaxed mb-4">
              {boilerplate}
            </p>
            <p className="mt-auto text-sm text-secondary-silver/70">
              Use this paragraph whenever you need a short description of the
              company. It also closes every Alphorax press release.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MediaKit;
