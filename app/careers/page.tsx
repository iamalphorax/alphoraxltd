import React from "react";
import type { Metadata } from "next";
import {
  ArrowRightIcon,
  BrainIcon,
  CheckIcon,
  ClockIcon,
  GlobeIcon,
  GraduationCapIcon,
  HandshakeIcon,
  LaptopIcon,
  MessageSquareIcon,
  RocketIcon,
  SendIcon,
  SparklesIcon,
  UsersIcon,
} from "lucide-react";
import PageHero from "@/components/shared/PageHero";
import OpenRoles from "@/components/careers/OpenRoles";
import { openRoles } from "@/lib/careers";
import {
  generateBreadcrumbSchema,
  generateWebPageSchema,
  getJsonLdProps,
} from "@/lib/schema";

const description =
  "Join Alphorax and build custom software, AI solutions and IT systems for clients worldwide. Remote-first, high-ownership roles in engineering, AI and consulting.";

export const metadata: Metadata = {
  title: "Careers",
  description,
  alternates: { canonical: "/careers" },
  openGraph: {
    title: "Careers at Alphorax",
    description,
    url: "/careers",
    siteName: "Alphorax",
    type: "website",
  },
};

const perks = [
  {
    icon: LaptopIcon,
    title: "Remote-first",
    description:
      "Work from wherever you do your best work. Our team and tools are built for distributed collaboration.",
  },
  {
    icon: ClockIcon,
    title: "Flexible hours",
    description:
      "We care about outcomes, not hours online. Plan your day around focus time and life.",
  },
  {
    icon: BrainIcon,
    title: "Work on real AI",
    description:
      "Ship production AI systems, not demos — LLM applications, custom models and automation.",
  },
  {
    icon: RocketIcon,
    title: "Real ownership",
    description:
      "Small teams mean your decisions matter. Own features and client relationships end to end.",
  },
  {
    icon: GraduationCapIcon,
    title: "Keep learning",
    description:
      "Time to explore new tools, share what you learn and grow into the engineer or consultant you want to be.",
  },
  {
    icon: GlobeIcon,
    title: "Global clients",
    description:
      "Work with businesses across industries and continents, each with new problems to solve.",
  },
];

const hiringSteps = [
  {
    icon: SendIcon,
    title: "Apply",
    description: "Send your application with a link to your work. It takes about five minutes.",
  },
  {
    icon: MessageSquareIcon,
    title: "Intro call",
    description: "A relaxed 30-minute conversation about your experience and what you're looking for.",
  },
  {
    icon: SparklesIcon,
    title: "Skills session",
    description: "A practical conversation or short exercise based on real work — no trick questions.",
  },
  {
    icon: HandshakeIcon,
    title: "Meet the team & offer",
    description: "Meet the people you'd work with, ask anything, and get a decision quickly.",
  },
];

const howWeWork = [
  "Written-first communication, so everyone has context wherever they are",
  "Short iterations with frequent client demos",
  "Code review and pairing as the default, not the exception",
  "Honest feedback, shared openly and kindly",
];

export default function CareersPage() {
  const pageSchema = generateWebPageSchema("Careers at Alphorax", description, "/careers");
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Careers", url: "/careers" },
  ]);

  return (
    <>
      <script {...getJsonLdProps(pageSchema)} />
      <script {...getJsonLdProps(breadcrumbSchema)} />

      <main>
        <PageHero
          badge="Careers at Alphorax"
          titleBefore="Build What's"
          highlight="Next"
          titleAfter="With Us"
          description="We're a remote-first team of engineers, AI specialists and consultants helping businesses everywhere put technology to work. Come do the best work of your career."
          image="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2000&auto=format&fit=crop"
        >
          <div className="flex flex-wrap gap-4">
            <a
              href="#open-roles"
              className="px-8 py-4 bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-white rounded-md border border-accent/20 hover:border-accent transition-all shadow-lg shadow-accent/10 inline-flex items-center group"
            >
              View open roles
              <ArrowRightIcon
                size={20}
                className="ml-2 group-hover:translate-x-1 transition-transform"
                aria-hidden="true"
              />
            </a>
            <a
              href="#life-at-alphorax"
              className="px-8 py-4 bg-transparent hover:bg-white/10 text-white rounded-md border border-white/30 hover:border-white/50 transition-all"
            >
              How we work
            </a>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
            {[
              { value: "Remote", label: "First", text: "One team across time zones." },
              { value: "AI", label: "Native", text: "AI in how we build and what we build." },
              { value: String(openRoles.length), label: openRoles.length === 1 ? "Open role" : "Open roles", text: "Plus general applications, any time." },
            ].map((stat) => (
              <div
                key={stat.label}
                className="bg-secondary-charcoal/30 backdrop-blur-sm rounded-xl p-6 border border-secondary-silver/10 hover:border-accent/30 transition-all group"
              >
                <div className="text-2xl md:text-3xl font-bold text-accent mb-2">{stat.value}</div>
                <div className="text-xl font-semibold mb-2 group-hover:text-accent transition-colors">
                  {stat.label}
                </div>
                <p className="text-secondary-silver">{stat.text}</p>
              </div>
            ))}
          </div>
        </PageHero>

        {/* Why Alphorax */}
        <section className="relative py-20 bg-secondary-charcoal overflow-hidden">
          <div className="absolute inset-0 bg-neural-pattern opacity-10" aria-hidden="true"></div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center mb-14">
              <div className="inline-block px-3 py-1 mb-4 rounded-full bg-secondary-charcoal/30 border border-accent/20 text-sm text-accent/90">
                Why Alphorax
              </div>
              <h2 className="text-4xl font-bold mb-4">
                A Place to Do Your <span className="text-accent">Best Work</span>
              </h2>
              <p className="text-xl text-secondary-silver max-w-2xl mx-auto">
                What you can expect when you join the team.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {perks.map((perk) => (
                <div
                  key={perk.title}
                  className="bg-secondary-charcoal/30 backdrop-blur-sm rounded-xl p-6 border border-secondary-silver/10 hover:border-accent/30 transition-all group"
                >
                  <div className="p-2 bg-primary/30 rounded-lg inline-block mb-4 group-hover:bg-primary/50 transition-colors">
                    <perk.icon size={24} className="text-accent" aria-hidden="true" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2 group-hover:text-accent transition-colors">
                    {perk.title}
                  </h3>
                  <p className="text-secondary-silver">{perk.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Life at Alphorax */}
        <section id="life-at-alphorax" className="relative py-20 overflow-hidden scroll-mt-20">
          <div className="absolute inset-0" aria-hidden="true">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-secondary-charcoal/90"></div>
          </div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div className="relative order-2 lg:order-1">
                <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 to-accent/20 rounded-xl blur-lg" aria-hidden="true"></div>
                <div className="relative rounded-xl overflow-hidden border border-accent/30">
                  <div className="aspect-[4/3]">
                    <img
                      src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=1600&auto=format&fit=crop"
                      alt="Team members collaborating around a laptop"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-secondary-charcoal/80 to-transparent" aria-hidden="true"></div>
                  <div className="absolute bottom-0 left-0 p-6 flex items-center gap-3">
                    <div className="p-2 bg-accent/20 rounded-lg backdrop-blur-sm">
                      <UsersIcon size={20} className="text-accent" aria-hidden="true" />
                    </div>
                    <span className="font-semibold">One team, many time zones</span>
                  </div>
                </div>
              </div>
              <div className="order-1 lg:order-2">
                <div className="inline-block px-3 py-1 mb-4 rounded-full bg-secondary-charcoal/30 border border-accent/20 text-sm text-accent/90">
                  Life at Alphorax
                </div>
                <h2 className="text-4xl font-bold mb-6">
                  How We <span className="text-accent">Work Together</span>
                </h2>
                <p className="text-lg text-secondary-silver mb-8">
                  We’re a young company founded in 2025, which means you’ll
                  help shape our culture, tools and practices. We guide everything we
                  do by four values: excellence, collaboration, innovation and
                  integrity.
                </p>
                <ul className="space-y-4">
                  {howWeWork.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <span className="p-1 bg-accent/20 rounded-full mt-0.5">
                        <CheckIcon size={14} className="text-accent" aria-hidden="true" />
                      </span>
                      <span className="text-secondary-silver">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Hiring process */}
        <section className="relative py-20 bg-secondary-charcoal overflow-hidden">
          <div className="absolute inset-0 bg-neural-pattern opacity-10" aria-hidden="true"></div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center mb-14">
              <div className="inline-block px-3 py-1 mb-4 rounded-full bg-secondary-charcoal/30 border border-accent/20 text-sm text-accent/90">
                Hiring Process
              </div>
              <h2 className="text-4xl font-bold mb-4">
                Simple, Human, <span className="text-accent">Respectful</span>
              </h2>
              <p className="text-xl text-secondary-silver max-w-2xl mx-auto">
                Four steps from application to offer, and we keep you updated along the way.
              </p>
            </div>
            <ol className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {hiringSteps.map((step, index) => (
                <li
                  key={step.title}
                  className="relative bg-secondary-charcoal/30 backdrop-blur-sm rounded-xl p-6 border border-secondary-silver/10 hover:border-accent/30 transition-all group"
                >
                  <span
                    className="absolute top-5 right-6 text-4xl font-bold text-accent/10 group-hover:text-accent/20 transition-colors"
                    aria-hidden="true"
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div className="p-2 bg-primary/30 rounded-lg inline-block mb-4 group-hover:bg-primary/50 transition-colors">
                    <step.icon size={24} className="text-accent" aria-hidden="true" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2 group-hover:text-accent transition-colors">
                    {step.title}
                  </h3>
                  <p className="text-secondary-silver">{step.description}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <OpenRoles roles={openRoles} />
      </main>
    </>
  );
}
