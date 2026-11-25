import React from "react";
import Link from "next/link";
import type { Metadata } from "next";
import {
  ArrowRightIcon,
  DownloadIcon,
  MailIcon,
  MegaphoneIcon,
  NewspaperIcon,
  PhoneIcon,
} from "lucide-react";
import PageHero from "@/components/shared/PageHero";
import MediaKit from "@/components/press/MediaKit";
import PressReleaseList from "@/components/press/PressReleaseList";
import { SampleBadge } from "@/components/press/PressReleaseRow";
import { LinkedinIcon, XIcon } from "@/components/shared/SocialIcons";
import { company } from "@/lib/company";
import {
  formatPressDate,
  pressCategories,
  pressReleases,
} from "@/lib/press-releases";
import {
  generateBreadcrumbSchema,
  generateWebPageSchema,
  getJsonLdProps,
} from "@/lib/schema";

const description =
  "News and announcements from Alphorax, plus our media kit: logos, brand colors, company facts and press contacts.";

export const metadata: Metadata = {
  title: "Press Releases",
  description,
  alternates: { canonical: "/press-release" },
  openGraph: {
    title: "Press Releases | Alphorax Newsroom",
    description,
    url: "/press-release",
    siteName: "Alphorax",
    type: "website",
  },
};

export default function PressReleasePage() {
  const latest = pressReleases[0];
  const categories = pressCategories.filter((category) =>
    pressReleases.some((release) => release.category === category),
  );

  const pageSchema = generateWebPageSchema(
    "Alphorax Newsroom",
    description,
    "/press-release",
  );
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Press Releases", url: "/press-release" },
  ]);

  const quickLinks = [
    {
      icon: NewspaperIcon,
      title: "Latest news",
      text: latest ? formatPressDate(latest.date) : "Coming soon",
      href: latest ? `/press-release/${latest.slug}` : "#releases",
    },
    {
      icon: DownloadIcon,
      title: "Media kit",
      text: "Logo, colors and company facts",
      href: "#media-kit",
    },
    {
      icon: MailIcon,
      title: "Press enquiries",
      text: company.pressEmail,
      href: `mailto:${company.pressEmail}`,
    },
  ];

  return (
    <>
      <script {...getJsonLdProps(pageSchema)} />
      <script {...getJsonLdProps(breadcrumbSchema)} />

      <main>
        <PageHero
          badge="Newsroom"
          titleBefore="Press"
          highlight="Releases"
          description="The latest announcements from Alphorax, plus everything journalists need: brand assets, company facts and a direct line to our team."
          image="https://images.unsplash.com/photo-1504711434969-e33886168f5c?q=80&w=2000&auto=format&fit=crop"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
            {quickLinks.map((item) => (
              <a
                key={item.title}
                href={item.href}
                className="bg-secondary-charcoal/30 backdrop-blur-sm rounded-xl p-6 border border-secondary-silver/10 hover:border-accent/30 transition-all group flex items-start gap-4 focus:outline-none focus:ring-2 focus:ring-accent"
              >
                <span className="p-2 bg-primary/40 rounded-lg group-hover:bg-primary/60 transition-colors">
                  <item.icon size={22} className="text-accent" aria-hidden="true" />
                </span>
                <span className="min-w-0">
                  <span className="block text-lg font-semibold mb-1 group-hover:text-accent transition-colors">
                    {item.title}
                  </span>
                  <span className="block text-secondary-silver break-words">{item.text}</span>
                </span>
              </a>
            ))}
          </div>
        </PageHero>

        {/* Latest release */}
        {latest && (
          <section className="relative py-20 bg-secondary-charcoal overflow-hidden">
            <div className="absolute inset-0 bg-neural-pattern opacity-10" aria-hidden="true"></div>
            <div className="container mx-auto px-4 relative z-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 mb-6 rounded-full bg-secondary-charcoal/30 border border-accent/20 text-sm text-accent/90">
                <MegaphoneIcon size={14} aria-hidden="true" />
                Latest release
              </div>
              <Link
                href={`/press-release/${latest.slug}`}
                className="group grid grid-cols-1 lg:grid-cols-2 rounded-2xl overflow-hidden border border-accent/20 hover:border-accent/50 bg-secondary-charcoal/50 shadow-xl shadow-accent/5 transition-all focus:outline-none focus:ring-2 focus:ring-accent"
              >
                <div className="relative h-64 lg:h-auto min-h-[18rem] overflow-hidden">
                  <img
                    src={latest.image}
                    alt=""
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div
                    className="absolute inset-0 bg-gradient-to-r from-transparent to-secondary-charcoal/60 hidden lg:block"
                    aria-hidden="true"
                  ></div>
                  {latest.sample && <SampleBadge className="absolute top-4 left-4" />}
                </div>
                <div className="p-8 md:p-10 flex flex-col">
                  <div className="flex flex-wrap items-center gap-3 mb-4 text-sm">
                    <span className="text-accent">{latest.category}</span>
                    <span className="text-secondary-silver/50" aria-hidden="true">•</span>
                    <time dateTime={latest.date} className="text-secondary-silver">
                      {formatPressDate(latest.date)}
                    </time>
                  </div>
                  <h2 className="text-3xl md:text-4xl font-bold mb-4 group-hover:text-accent transition-colors">
                    {latest.title}
                  </h2>
                  <p className="text-lg text-secondary-silver mb-8">{latest.subtitle}</p>
                  <span className="mt-auto inline-flex items-center text-accent font-medium">
                    Read the release
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
        )}

        {/* All releases — no overflow-hidden, it would break the sticky year labels */}
        <section id="releases" className="relative py-20 scroll-mt-20">
          <div className="absolute inset-0 bg-neural-pattern opacity-10" aria-hidden="true"></div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-5xl mx-auto">
              <div className="mb-8">
                <h2 className="text-4xl font-bold mb-4">
                  All <span className="text-accent">Releases</span>
                </h2>
                <p className="text-xl text-secondary-silver max-w-2xl">
                  Company news, new services and hiring announcements, newest first.
                </p>
              </div>
              {pressReleases.length > 0 ? (
                <PressReleaseList releases={pressReleases} categories={categories} />
              ) : (
                <p className="text-secondary-silver">
                  No press releases yet. Check back soon, or follow us on LinkedIn
                  for the latest news.
                </p>
              )}
            </div>
          </div>
        </section>

        <MediaKit />

        {/* Media contact */}
        <section className="relative py-20 overflow-hidden">
          <div className="absolute inset-0 bg-neural-pattern opacity-10" aria-hidden="true"></div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-5xl mx-auto bg-secondary-charcoal/50 backdrop-blur-md rounded-2xl p-8 md:p-12 border border-accent/20 shadow-xl shadow-accent/5 grid grid-cols-1 md:grid-cols-[minmax(0,1fr)_auto] gap-10 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  Media <span className="text-accent">Enquiries</span>
                </h2>
                <p className="text-lg text-secondary-silver mb-8 max-w-xl">
                  Writing a story, looking for a comment or want to interview our
                  team? Get in touch and we’ll help however we can.
                </p>
                <ul className="space-y-4">
                  <li>
                    <a
                      href={`mailto:${company.pressEmail}`}
                      className="inline-flex items-center gap-3 text-white hover:text-accent transition-colors"
                    >
                      <span className="p-2 bg-primary/40 rounded-lg">
                        <MailIcon size={20} className="text-accent" aria-hidden="true" />
                      </span>
                      {company.pressEmail}
                    </a>
                  </li>
                  <li>
                    <a
                      href={`tel:${company.phone}`}
                      className="inline-flex items-center gap-3 text-white hover:text-accent transition-colors"
                    >
                      <span className="p-2 bg-primary/40 rounded-lg">
                        <PhoneIcon size={20} className="text-accent" aria-hidden="true" />
                      </span>
                      {company.phone}
                    </a>
                  </li>
                </ul>
              </div>
              <div className="md:border-l md:border-secondary-silver/10 md:pl-10">
                <h3 className="text-sm font-semibold uppercase tracking-widest text-accent mb-4">
                  Follow our news
                </h3>
                <div className="flex gap-3 mb-6">
                  {[
                    { label: "Alphorax on LinkedIn", href: company.socials.linkedin, icon: LinkedinIcon },
                    { label: "Alphorax on X", href: company.socials.x, icon: XIcon },
                  ].map((social) => (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.label}
                      className="w-12 h-12 inline-flex items-center justify-center rounded-lg bg-primary/40 border border-accent/20 text-white hover:text-accent hover:border-accent/50 transition-all"
                    >
                      <social.icon size={20} />
                    </a>
                  ))}
                </div>
                <Link
                  href="/blogs"
                  className="inline-flex items-center text-accent hover:text-accent/80 font-medium"
                >
                  Read our blog
                  <ArrowRightIcon size={16} className="ml-2" aria-hidden="true" />
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
