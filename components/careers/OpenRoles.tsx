"use client";

import React, { ChangeEvent, FormEvent, useRef, useState } from "react";
import Link from "next/link";
import {
  BriefcaseIcon,
  CheckIcon,
  ChevronDownIcon,
  ClockIcon,
  MapPinIcon,
  SendIcon,
} from "lucide-react";
import type { JobRole } from "@/lib/careers";
import { newMetaEventId, trackPixelEvent } from "@/lib/meta/pixel";

const GENERAL = "General application";

interface FormState {
  name: string;
  email: string;
  location: string;
  role: string;
  portfolio: string;
  cv: string;
  message: string;
  consent: boolean;
}

const emptyForm = (role = GENERAL): FormState => ({
  name: "",
  email: "",
  location: "",
  role,
  portfolio: "",
  cv: "",
  message: "",
  consent: false,
});

const inputClass =
  "w-full px-4 py-3 bg-secondary-charcoal/50 border border-secondary-silver/20 rounded-md focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-transparent text-white placeholder:text-secondary-silver/50";
const labelClass = "block mb-2 text-sm font-medium text-secondary-silver";

/** Open-role listings plus the application form they feed into. */
const OpenRoles = ({ roles }: { roles: JobRole[] }) => {
  const [openRoleId, setOpenRoleId] = useState<string | null>(null);
  const [form, setForm] = useState<FormState>(emptyForm());
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const nameInputRef = useRef<HTMLInputElement>(null);

  const applyFor = (roleTitle: string) => {
    setForm((prev) => ({ ...prev, role: roleTitle }));
    setIsSubmitted(false);
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    // Focus after the scroll starts so keyboard users land in the form.
    setTimeout(() => nameInputRef.current?.focus({ preventScroll: true }), 400);
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const { name, value, type } = e.target;
    const nextValue =
      type === "checkbox" ? (e.target as HTMLInputElement).checked : value;
    setForm((prev) => ({ ...prev, [name]: nextValue }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);
    const metaEventId = newMetaEventId();
    try {
      const response = await fetch("/api/careers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, metaEventId }),
      });
      if (!response.ok) {
        const data = await response.json().catch(() => null);
        throw new Error(data?.error || "Something went wrong. Please try again.");
      }
      trackPixelEvent("SubmitApplication", metaEventId, { content_name: "Job application" });
      setIsSubmitted(true);
      setForm(emptyForm());
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {/* Roles */}
      <section id="open-roles" className="relative py-24 overflow-hidden scroll-mt-20">
        <div className="absolute inset-0" aria-hidden="true">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-fixed bg-center opacity-10"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-secondary-charcoal/95 to-primary/90"></div>
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-14">
            <div className="inline-block px-3 py-1 mb-4 rounded-full bg-secondary-charcoal/30 border border-accent/20 text-sm text-accent/90">
              Open Roles
            </div>
            <h2 className="text-4xl font-bold mb-4">
              Find Your <span className="text-accent">Next Role</span>
            </h2>
            <p className="text-xl text-secondary-silver max-w-2xl mx-auto">
              {roles.length > 0
                ? `${roles.length} open ${roles.length === 1 ? "position" : "positions"}. All roles are remote unless noted.`
                : "We don't have open positions right now, but we're always happy to meet great people."}
            </p>
          </div>

          <div className="max-w-4xl mx-auto space-y-4">
            {roles.map((role) => {
              const isOpen = openRoleId === role.id;
              const panelId = `role-panel-${role.id}`;
              return (
                <div
                  key={role.id}
                  className={`bg-secondary-charcoal/40 backdrop-blur-sm rounded-xl border transition-all ${
                    isOpen ? "border-accent/40 shadow-xl shadow-accent/10" : "border-secondary-silver/10 hover:border-accent/30"
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => setOpenRoleId(isOpen ? null : role.id)}
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    className="w-full text-left p-6 flex flex-col md:flex-row md:items-center gap-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-xl"
                  >
                    <div className="flex-1">
                      <div className="text-xs font-semibold text-accent uppercase tracking-widest mb-2">
                        {role.team}
                      </div>
                      <h3 className="text-xl font-semibold mb-2">{role.title}</h3>
                      <div className="flex flex-wrap gap-4 text-sm text-secondary-silver">
                        <span className="inline-flex items-center gap-1.5">
                          <MapPinIcon size={14} className="text-accent" aria-hidden="true" />
                          {role.location}
                        </span>
                        <span className="inline-flex items-center gap-1.5">
                          <ClockIcon size={14} className="text-accent" aria-hidden="true" />
                          {role.type}
                        </span>
                      </div>
                    </div>
                    <span className="inline-flex items-center gap-2 text-sm text-secondary-silver">
                      {isOpen ? "Hide details" : "View details"}
                      <ChevronDownIcon
                        size={18}
                        className={`text-accent transition-transform ${isOpen ? "rotate-180" : ""}`}
                        aria-hidden="true"
                      />
                    </span>
                  </button>

                  {isOpen && (
                    <div id={panelId} className="px-6 pb-6">
                      <div className="pt-6 border-t border-secondary-silver/10">
                        <p className="text-lg text-secondary-silver mb-6">{role.summary}</p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                          <div>
                            <h4 className="font-semibold mb-3">What you’ll do</h4>
                            <ul className="space-y-2">
                              {role.responsibilities.map((item) => (
                                <li key={item} className="flex gap-2 text-secondary-silver text-sm">
                                  <CheckIcon size={16} className="text-accent flex-shrink-0 mt-0.5" aria-hidden="true" />
                                  {item}
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div>
                            <h4 className="font-semibold mb-3">What we’re looking for</h4>
                            <ul className="space-y-2">
                              {role.requirements.map((item) => (
                                <li key={item} className="flex gap-2 text-secondary-silver text-sm">
                                  <CheckIcon size={16} className="text-accent flex-shrink-0 mt-0.5" aria-hidden="true" />
                                  {item}
                                </li>
                              ))}
                            </ul>
                            {role.niceToHave && role.niceToHave.length > 0 && (
                              <>
                                <h4 className="font-semibold mt-6 mb-3">Nice to have</h4>
                                <ul className="space-y-2">
                                  {role.niceToHave.map((item) => (
                                    <li key={item} className="flex gap-2 text-secondary-silver text-sm">
                                      <span className="w-1.5 h-1.5 bg-accent/60 rounded-full flex-shrink-0 mt-2" aria-hidden="true"></span>
                                      {item}
                                    </li>
                                  ))}
                                </ul>
                              </>
                            )}
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => applyFor(role.title)}
                          className="mt-8 px-6 py-3 bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-white rounded-md border border-accent/20 hover:border-accent transition-all shadow-lg shadow-accent/10 inline-flex items-center"
                        >
                          Apply for this role
                          <SendIcon size={16} className="ml-2" aria-hidden="true" />
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}

            {/* General application */}
            <div className="flex flex-col md:flex-row md:items-center gap-4 p-6 rounded-xl border border-dashed border-accent/30 bg-secondary-charcoal/20">
              <div className="p-3 bg-primary/40 rounded-lg self-start">
                <BriefcaseIcon size={22} className="text-accent" aria-hidden="true" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold">Don’t see the right role?</h3>
                <p className="text-secondary-silver text-sm">
                  Send a general application and we’ll reach out when something fits.
                </p>
              </div>
              <button
                type="button"
                onClick={() => applyFor(GENERAL)}
                className="px-5 py-2.5 rounded-md border border-white/30 hover:border-white/60 hover:bg-white/10 transition-all text-sm font-medium"
              >
                Send a general application
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Application form */}
      <section className="relative py-24 bg-secondary-charcoal overflow-hidden">
        <div className="absolute inset-0 bg-neural-pattern opacity-10" aria-hidden="true"></div>
        <div ref={formRef} className="container mx-auto px-4 relative z-10 scroll-mt-24">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-4xl font-bold mb-4">
                Apply to <span className="text-accent">Alphorax</span>
              </h2>
              <p className="text-lg text-secondary-silver">
                Tell us about yourself. It takes about five minutes.
              </p>
            </div>

            <div className="bg-secondary-charcoal/30 backdrop-blur-sm rounded-xl p-6 md:p-8 border border-secondary-silver/10">
              {isSubmitted ? (
                <div className="text-center py-8" role="status">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-accent/20 rounded-full mb-6">
                    <CheckIcon className="text-accent" size={32} aria-hidden="true" />
                  </div>
                  <h3 className="text-2xl font-medium mb-3">Application received!</h3>
                  <p className="text-secondary-silver mb-6 max-w-md mx-auto">
                    Thanks for your interest in Alphorax. We read every application and
                    will be in touch if there’s a match.
                  </p>
                  <button
                    type="button"
                    onClick={() => setIsSubmitted(false)}
                    className="px-6 py-3 bg-primary hover:bg-primary/90 text-white rounded-md border border-accent/20 hover:border-accent transition-all"
                  >
                    Submit another application
                  </button>
                </div>
              ) : (
                <form className="space-y-6" onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="careers-name" className={labelClass}>Full name*</label>
                      <input
                        ref={nameInputRef}
                        id="careers-name"
                        name="name"
                        type="text"
                        autoComplete="name"
                        required
                        value={form.name}
                        onChange={handleChange}
                        className={inputClass}
                        placeholder="Your name"
                      />
                    </div>
                    <div>
                      <label htmlFor="careers-email" className={labelClass}>Email address*</label>
                      <input
                        id="careers-email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        required
                        value={form.email}
                        onChange={handleChange}
                        className={inputClass}
                        placeholder="you@example.com"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="careers-role" className={labelClass}>Role*</label>
                      <select
                        id="careers-role"
                        name="role"
                        required
                        value={form.role}
                        onChange={handleChange}
                        className={inputClass}
                      >
                        {roles.map((role) => (
                          <option key={role.id} value={role.title} className="bg-secondary-charcoal">
                            {role.title}
                          </option>
                        ))}
                        <option value={GENERAL} className="bg-secondary-charcoal">{GENERAL}</option>
                      </select>
                    </div>
                    <div>
                      <label htmlFor="careers-location" className={labelClass}>Location</label>
                      <input
                        id="careers-location"
                        name="location"
                        type="text"
                        autoComplete="country-name"
                        value={form.location}
                        onChange={handleChange}
                        className={inputClass}
                        placeholder="City, country"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="careers-portfolio" className={labelClass}>LinkedIn or portfolio URL*</label>
                      <input
                        id="careers-portfolio"
                        name="portfolio"
                        type="url"
                        required
                        value={form.portfolio}
                        onChange={handleChange}
                        className={inputClass}
                        placeholder="https://"
                      />
                    </div>
                    <div>
                      <label htmlFor="careers-cv" className={labelClass}>Link to your CV</label>
                      <input
                        id="careers-cv"
                        name="cv"
                        type="url"
                        value={form.cv}
                        onChange={handleChange}
                        className={inputClass}
                        placeholder="Google Drive, Dropbox…"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="careers-message" className={labelClass}>Why Alphorax?*</label>
                    <textarea
                      id="careers-message"
                      name="message"
                      rows={5}
                      required
                      value={form.message}
                      onChange={handleChange}
                      className={`${inputClass} resize-none`}
                      placeholder="Tell us about a project you're proud of and what draws you to this role."
                    ></textarea>
                  </div>

                  <label className="flex items-start gap-3 text-sm text-secondary-silver cursor-pointer">
                    <input
                      name="consent"
                      type="checkbox"
                      required
                      checked={form.consent}
                      onChange={handleChange}
                      className="mt-1 h-4 w-4 rounded border-secondary-silver/40 bg-secondary-charcoal/50 accent-accent"
                    />
                    <span>
                      I agree to Alphorax processing my information to evaluate my
                      application, as described in the{" "}
                      <Link href="/privacy-policy" className="text-accent hover:underline">
                        Privacy Policy
                      </Link>
                      .*
                    </span>
                  </label>

                  {error && (
                    <p className="text-sm text-red-300 bg-red-500/10 border border-red-400/30 rounded-md px-4 py-3" role="alert">
                      {error}
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full px-6 py-4 bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-white rounded-md border border-accent/20 hover:border-accent transition-all shadow-lg shadow-accent/10 flex items-center justify-center disabled:opacity-70"
                  >
                    {isSubmitting ? (
                      <>
                        <span className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" aria-hidden="true"></span>
                        Sending…
                      </>
                    ) : (
                      <>
                        Submit application
                        <SendIcon size={18} className="ml-2" aria-hidden="true" />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default OpenRoles;
