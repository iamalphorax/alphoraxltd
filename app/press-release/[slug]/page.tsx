import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  CalendarIcon,
  CheckCircle2Icon,
  DownloadIcon,
  MailIcon,
  MapPinIcon,
  PhoneIcon,
  QuoteIcon,
  TagIcon,
} from "lucide-react";
import CopyButton from "@/components/press/CopyButton";
import PressReleaseRow, { SampleBadge } from "@/components/press/PressReleaseRow";
import { LinkedinIcon, XIcon } from "@/components/shared/SocialIcons";
import { company } from "@/lib/company";
import {
  boilerplate,
  formatPressDate,
  getOtherPressReleases,
  getPressRelease,
  pressReleases,
  type PressBlock,
} from "@/lib/press-releases";
import {
  generateBlogPostingSchema,
  generateBreadcrumbSchema,
  getJsonLdProps,
} from "@/lib/schema";

interface PressReleasePageProps {
  params: Promise<{ slug: string }>;
}

const siteUrl = (process.env.NEXT_PUBLIC_BASE_URL || "https://alphorax.com").replace(/\/$/, "");

export function generateStaticParams() {
  return pressReleases.map((release) => ({ slug: release.slug }));
}

export async function generateMetadata({
  params,
}: PressReleasePageProps): Promise<Metadata> {
  const { slug } = await params;
  const release = getPressRelease(slug);
  if (!release) return { title: "Press Release Not Found" };

  return {
    title: release.title,
    description: release.summary,
    alternates: { canonical: `/press-release/${release.slug}` },
    openGraph: {
      title: release.title,
      description: release.summary,
      url: `/press-release/${release.slug}`,
      siteName: "Alphorax",
      type: "article",
      publishedTime: release.date,
      images: [{ url: release.image }],
    },
    twitter: {
      card: "summary_large_image",
      title: release.title,
      description: release.summary,
      images: [release.image],
    },
  };
}

const Block = ({ block, dateline }: { block: PressBlock; dateline?: string }) => {
  switch (block.type) {
    case "paragraph":
      return (
        <p className="text-lg text-secondary-silver leading-relaxed">
          {dateline && (
            <strong className="text-white font-semibold">{dateline}{" — "}</strong>
          )}
          {block.text}
        </p>
      );
    case "heading":
      return <h2 className="text-2xl font-bold pt-4">{block.text}</h2>;
    case "list":
      return (
        <ul className="space-y-3">
          {block.items.map((item) => (
            <li key={item} className="flex items-start gap-3 text-lg text-secondary-silver">
              <CheckCircle2Icon
                size={20}
                className="text-accent flex-shrink-0 mt-1"
                aria-hidden="true"
              />
              {item}
            </li>
          ))}
        </ul>
      );
    case "quote":
      return (
        <figure className="relative my-4 bg-secondary-charcoal/40 rounded-xl border border-accent/20 p-6 md:p-8">
          <QuoteIcon size={32} className="text-accent/40 mb-4" aria-hidden="true" />
          <blockquote className="text-xl md:text-2xl font-medium text-white leading-snug">
            “{block.text}”
          </blockquote>
          <figcaption className="mt-5 flex items-center gap-3 text-secondary-silver">
            <span className="w-8 h-px bg-accent" aria-hidden="true"></span>
            {block.attribution}
          </figcaption>
        </figure>
      );
  }
};

export default async function PressReleaseDetailPage({ params }: PressReleasePageProps) {
  const { slug } = await params;
  const release = getPressRelease(slug);
  if (!release) notFound();

  const others = getOtherPressReleases(release.slug);
  const publishedOn = formatPressDate(release.date);
  const pageUrl = `${siteUrl}/press-release/${release.slug}`;
  const dateline = `${release.location.toUpperCase()}, ${publishedOn}`;
  const firstParagraph = release.body.findIndex((block) => block.type === "paragraph");

  const articleSchema = {
    ...generateBlogPostingSchema(
      release.title,
      release.summary,
      release.image,
      "Alphorax",
      release.date,
    ),
    "@type": "NewsArticle",
    author: { "@type": "Organization", name: "Alphorax" },
  };
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Press Releases", url: "/press-release" },
    { name: release.title, url: `/press-release/${release.slug}` },
  ]);

  const details = [
    { icon: CalendarIcon, label: "Published", value: publishedOn },
    { icon: TagIcon, label: "Category", value: release.category },
    { icon: MapPinIcon, label: "Location", value: release.location },
  ];

  const shareText = encodeURIComponent(release.title);
  const shareUrl = encodeURIComponent(pageUrl);
  const shareLinks = [
    {
      label: "Share on LinkedIn",
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`,
      icon: LinkedinIcon,
    },
    {
      label: "Share on X",
      href: `https://twitter.com/intent/tweet?text=${shareText}&url=${shareUrl}`,
      icon: XIcon,
    },
    {
      label: "Share by email",
      href: `mailto:?subject=${shareText}&body=${encodeURIComponent(`${release.title}\n\n${pageUrl}`)}`,
      icon: MailIcon,
    },
  ];

  return (
    <>
      <script {...getJsonLdProps(articleSchema)} />
      <script {...getJsonLdProps(breadcrumbSchema)} />

      <main>
        {/* Hero */}
        <section className="relative pt-12 pb-20 overflow-hidden">
          <div className="absolute inset-0" aria-hidden="true">
            <div
              className="absolute inset-0 bg-cover bg-center opacity-20"
              style={{ backgroundImage: `url('${release.image}')` }}
            ></div>
            <div className="absolute inset-0 bg-gradient-to-b from-secondary-charcoal/90 via-secondary-charcoal/85 to-primary/95"></div>
          </div>
          <div className="container mx-auto px-4 relative z-10">
            <nav aria-label="Breadcrumb" className="mb-10">
              <Link
                href="/press-release"
                className="inline-flex items-center text-sm text-secondary-silver hover:text-accent transition-colors"
              >
                <ArrowLeftIcon size={16} className="mr-2" aria-hidden="true" />
                Newsroom
              </Link>
            </nav>
            <div className="max-w-4xl">
              <div className="flex flex-wrap items-center gap-3 mb-6">
                <span className="px-3 py-1 rounded-full bg-secondary-charcoal/50 border border-accent/20 text-sm text-accent/90">
                  {release.category}
                </span>
                <time
                  dateTime={release.date}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary-charcoal/50 border border-secondary-silver/20 text-sm text-secondary-silver"
                >
                  <CalendarIcon size={14} aria-hidden="true" />
                  {publishedOn}
                </time>
                {release.sample && <SampleBadge className="text-xs px-3 py-1" />}
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                {release.title}
              </h1>
              <p className="text-xl md:text-2xl text-secondary-silver max-w-3xl">
                {release.subtitle}
              </p>
            </div>
          </div>
        </section>

        {/* Body — no overflow-hidden here, it would break the sticky sidebar */}
        <section className="relative py-16 md:py-20 bg-secondary-charcoal">
          <div className="absolute inset-0 bg-neural-pattern opacity-10" aria-hidden="true"></div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_320px] gap-12 lg:gap-16">
              <article className="max-w-3xl min-w-0">
                <figure className="mb-10 rounded-xl overflow-hidden border border-accent/20">
                  <div className="aspect-video">
                    <img
                      src={release.image}
                      alt={release.imageAlt}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </figure>

                <p className="inline-block mb-6 text-xs font-semibold uppercase tracking-[0.2em] text-accent">
                  For immediate release
                </p>

                <div className="space-y-6">
                  {release.body.map((block, index) => (
                    <Block
                      key={index}
                      block={block}
                      dateline={index === firstParagraph ? dateline : undefined}
                    />
                  ))}
                </div>

                <section className="mt-12 rounded-xl border border-secondary-silver/10 bg-secondary-charcoal/30 p-6 md:p-8">
                  <h2 className="text-lg font-semibold mb-3">About Alphorax</h2>
                  <p className="text-secondary-silver leading-relaxed">{boilerplate}</p>
                </section>

                <p className="my-10 text-center text-secondary-silver tracking-[0.5em]">
                  <span aria-hidden="true">###</span>
                  <span className="sr-only">End of press release</span>
                </p>

                <section className="rounded-xl border border-accent/20 bg-gradient-to-br from-primary/50 to-secondary-charcoal/60 p-6 md:p-8">
                  <h2 className="text-lg font-semibold mb-4">Media contact</h2>
                  <div className="flex flex-col sm:flex-row sm:flex-wrap gap-4 sm:gap-8">
                    <a
                      href={`mailto:${company.pressEmail}`}
                      className="inline-flex items-center gap-3 hover:text-accent transition-colors"
                    >
                      <MailIcon size={18} className="text-accent" aria-hidden="true" />
                      {company.pressEmail}
                    </a>
                    <a
                      href={`tel:${company.phone}`}
                      className="inline-flex items-center gap-3 hover:text-accent transition-colors"
                    >
                      <PhoneIcon size={18} className="text-accent" aria-hidden="true" />
                      {company.phone}
                    </a>
                  </div>
                </section>
              </article>

              {/* Sidebar */}
              <aside className="space-y-6 lg:sticky lg:top-28 self-start">
                <div className="bg-secondary-charcoal/30 backdrop-blur-sm rounded-xl p-6 border border-secondary-silver/10">
                  <h2 className="text-xs font-semibold text-accent uppercase tracking-widest mb-5">
                    Release details
                  </h2>
                  <dl className="space-y-4">
                    {details.map((item) => (
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
                    <h3 className="text-xs text-secondary-silver mb-3">Share this release</h3>
                    <div className="flex flex-wrap gap-2">
                      {shareLinks.map((link) => (
                        <a
                          key={link.label}
                          href={link.href}
                          target={link.href.startsWith("mailto:") ? undefined : "_blank"}
                          rel="noopener noreferrer"
                          aria-label={link.label}
                          title={link.label}
                          className="w-10 h-10 inline-flex items-center justify-center rounded-md border border-secondary-silver/20 text-secondary-silver hover:text-white hover:border-accent/40 transition-all focus:outline-none focus:ring-2 focus:ring-accent"
                        >
                          <link.icon size={16} />
                        </a>
                      ))}
                      <CopyButton text={pageUrl} srLabel="Copy link" className="w-10 h-10" />
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-primary/60 to-secondary-charcoal/60 rounded-xl p-6 border border-accent/30">
                  <h2 className="text-xl font-semibold mb-2">Media kit</h2>
                  <p className="text-secondary-silver text-sm mb-5">
                    Logos, brand colors and company facts for your story.
                  </p>
                  <div className="flex flex-col gap-3">
                    <a
                      href="/logo.png"
                      download="alphorax-logo.png"
                      className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-white rounded-md border border-accent/20 hover:border-accent transition-all shadow-lg shadow-accent/10"
                    >
                      <DownloadIcon size={16} aria-hidden="true" />
                      Download logo
                    </a>
                    <Link
                      href="/press-release#media-kit"
                      className="inline-flex items-center justify-center px-5 py-3 text-white rounded-md border border-white/30 hover:border-white/50 hover:bg-white/10 transition-all"
                    >
                      View full media kit
                    </Link>
                  </div>
                </div>
              </aside>
            </div>
          </div>
        </section>

        {/* More releases */}
        {others.length > 0 && (
          <section className="relative py-20 overflow-hidden">
            <div className="absolute inset-0 bg-neural-pattern opacity-10" aria-hidden="true"></div>
            <div className="container mx-auto px-4 relative z-10">
              <div className="max-w-4xl mx-auto">
                <div className="flex flex-wrap items-end justify-between gap-4 mb-10">
                  <h2 className="text-3xl md:text-4xl font-bold">
                    More from the <span className="text-accent">Newsroom</span>
                  </h2>
                  <Link
                    href="/press-release"
                    className="inline-flex items-center text-accent hover:text-accent/80 font-medium"
                  >
                    All releases
                    <ArrowRightIcon size={16} className="ml-2" aria-hidden="true" />
                  </Link>
                </div>
                <ul className="space-y-4">
                  {others.map((item) => (
                    <li key={item.slug}>
                      <PressReleaseRow release={item} />
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>
        )}
      </main>
    </>
  );
}
