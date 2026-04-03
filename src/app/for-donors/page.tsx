"use client";

import { useState, FormEvent } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { EyebrowLabel, Button, Badge } from "@/components/ui";
import { CommunityVoiceDemo } from "@/components/CommunityVoiceDemo";

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const matchQuestions = [
  {
    id: "region",
    question: "Where do you want your giving to have impact?",
    options: ["Kenya", "India", "Los Angeles", "Any"],
  },
  {
    id: "cause",
    question: "Which cause matters most to you?",
    options: ["Education", "Clean Water & Health", "Economic Empowerment", "Food Security"],
  },
  {
    id: "style",
    question: "How do you prefer to give?",
    options: ["One specific project", "A portfolio of projects", "Monthly recurring", "Not sure yet"],
  },
  {
    id: "budget",
    question: "What giving range feels right to start?",
    options: ["Under $100", "$100\u2013$500", "$500\u2013$2,500", "$2,500+"],
  },
  {
    id: "story",
    question: "Which of these moves you most?",
    options: [
      "A classroom that stays dry in the rain",
      "A woman who grew her business",
      "A girl who stayed in school",
      "A community that built something together",
    ],
  },
];

const milestones = [
  { label: "Materials sourced & delivered", status: "verified" as const },
  { label: "Roof trusses installed", status: "verified" as const },
  { label: "Roofing sheets laid", status: "progress" as const },
  { label: "Final inspection & handover", status: "pending" as const },
];

const benefits = [
  {
    title: "AI-Matched Projects",
    description: "Personalized to your values, geography, and giving style",
  },
  {
    title: "Escrow Protection",
    description: "Funds held until milestones are independently verified",
  },
  {
    title: "Community Voice Reports",
    description: "Hear directly from the communities you support",
  },
];

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function ForDonorsPage() {
  const [expandedQ, setExpandedQ] = useState(0);

  // Waitlist form state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [interest, setInterest] = useState("");
  const [giftSize, setGiftSize] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [formStatus, setFormStatus] = useState<"idle" | "success" | "error">("idle");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!email || !name) return;
    setSubmitting(true);
    setFormStatus("idle");
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, name, type: "DONOR" }),
      });
      if (!res.ok) throw new Error("Request failed");
      setFormStatus("success");
    } catch {
      setFormStatus("error");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* ── Main two-column layout ── */}
      <main className="max-w-7xl mx-auto px-6 md:px-12 py-16 md:py-24 grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16">
        {/* ── LEFT COLUMN ── */}
        <div className="lg:col-span-3 space-y-16">
          {/* Hero */}
          <section>
            <EyebrowLabel className="mb-5">For Donors</EyebrowLabel>
            <h1 className="font-display text-[clamp(36px,5vw,56px)] font-black leading-[1.05] tracking-[-0.025em] text-ink mb-5">
              Give to something<br />you can prove.
            </h1>
            <p className="text-lg text-[#555] leading-[1.75] max-w-xl">
              Firsthand matches you with verified projects, holds funds in escrow until
              milestones are confirmed, and lets you hear directly from the communities you
              support. No guesswork. No middlemen skimming overhead. Just verified impact.
            </p>
          </section>

          {/* AI Matching Teaser */}
          <section>
            <EyebrowLabel className="mb-5">AI Matching Preview</EyebrowLabel>
            <h2 className="font-display text-2xl font-bold text-ink mb-6">
              Five questions. One perfect match.
            </h2>

            <div className="border border-[#e5e5e0] rounded-lg overflow-hidden divide-y divide-[#e5e5e0]">
              {matchQuestions.map((q, i) => {
                const isExpanded = expandedQ === i;
                return (
                  <div key={q.id}>
                    <button
                      onClick={() => setExpandedQ(isExpanded ? -1 : i)}
                      className="w-full flex items-center justify-between px-5 py-4 bg-transparent border-none cursor-pointer text-left"
                    >
                      <span className="flex items-center gap-3">
                        <span className="font-mono text-[10px] tracking-[0.15em] text-[#999] uppercase w-5">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span className="font-body text-sm font-medium text-ink">
                          {q.question}
                        </span>
                      </span>
                      <svg
                        className={`w-4 h-4 text-[#999] transition-transform duration-200 ${isExpanded ? "rotate-180" : ""}`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>

                    {isExpanded && (
                      <div className="px-5 pb-5 pt-1 flex flex-wrap gap-2">
                        {q.options.map((opt) => (
                          <span
                            key={opt}
                            className="px-4 py-2 rounded-md text-sm font-body bg-[#f5f4f0] text-ink border border-[#e5e5e0] hover:border-terra hover:bg-[#fdf6f2] transition-colors cursor-default"
                          >
                            {opt}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </section>

          {/* Sample Project Card */}
          <section>
            <EyebrowLabel className="mb-5">Sample Project</EyebrowLabel>
            <div className="border border-[#e5e5e0] rounded-lg p-6 md:p-8 bg-[#FAFAF8]">
              <div className="flex items-center gap-2 mb-3">
                <Badge variant="live">Live</Badge>
                <Badge variant="verified">Verified</Badge>
              </div>
              <h3 className="font-display text-xl font-bold text-ink mb-1">
                Girls&apos; Secondary School Roof Replacement
              </h3>
              <p className="text-sm text-[#888] mb-6">Eldoret, Kenya</p>

              {/* Stats row */}
              <div className="grid grid-cols-3 gap-4 mb-8">
                {[
                  { label: "Goal", value: "$4,200" },
                  { label: "Funded", value: "68%" },
                  { label: "Timeline", value: "6 mo" },
                ].map((s) => (
                  <div key={s.label} className="text-center">
                    <div className="font-display text-xl font-bold text-ink">{s.value}</div>
                    <div className="font-mono text-[10px] tracking-[0.15em] uppercase text-[#999] mt-0.5">
                      {s.label}
                    </div>
                  </div>
                ))}
              </div>

              {/* Milestones */}
              <div className="space-y-0">
                {milestones.map((m, i) => (
                  <div key={i} className="flex items-start gap-3 relative">
                    {/* Vertical connector line */}
                    {i < milestones.length - 1 && (
                      <span className="absolute left-[7px] top-[18px] w-px h-full bg-[#e5e5e0]" />
                    )}
                    {/* Dot */}
                    <span
                      className={`relative z-10 mt-1 w-[15px] h-[15px] rounded-full border-2 flex-shrink-0 ${
                        m.status === "verified"
                          ? "bg-sage border-sage"
                          : m.status === "progress"
                          ? "bg-terra border-terra"
                          : "bg-[#ddd] border-[#ccc]"
                      }`}
                    />
                    <div className="pb-4">
                      <span className="font-body text-sm text-ink">{m.label}</span>
                      <span className="block font-mono text-[10px] tracking-[0.1em] uppercase mt-0.5 text-[#999]">
                        {m.status === "verified"
                          ? "Verified"
                          : m.status === "progress"
                          ? "In progress"
                          : "Pending"}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Community Voice Demo */}
          <section>
            <CommunityVoiceDemo />
          </section>
        </div>

        {/* ── RIGHT COLUMN (sticky waitlist) ── */}
        <aside className="lg:col-span-2">
          <div className="lg:sticky lg:top-24">
            <div className="rounded-lg border border-[#e5e5e0] bg-[#FAFAF8] overflow-hidden">
              {/* Terracotta accent bar */}
              <div className="h-[3px] bg-terra" />

              <div className="p-6 md:p-8">
                <h2 className="font-display text-xl font-bold text-ink mb-2">
                  Join the Donor Waitlist
                </h2>
                <p className="text-sm text-[#666] leading-[1.7] mb-6">
                  Be first to fund verified projects when we launch in 2026.
                  Get early access and pilot project updates.
                </p>

                {formStatus === "success" ? (
                  <div className="text-center py-8">
                    <div className="w-10 h-10 rounded-full bg-sage/10 flex items-center justify-center mx-auto mb-4">
                      <svg className="w-5 h-5 text-sage" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <p className="font-display text-lg font-bold text-ink mb-1">
                      You&apos;re on the list.
                    </p>
                    <p className="text-sm text-[#666]">
                      We&apos;ll be in touch before launch.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Full Name */}
                    <div>
                      <label className="block font-mono text-[10px] tracking-[0.15em] uppercase text-[#999] mb-1.5">
                        Full Name
                      </label>
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        placeholder="Your full name"
                        className="w-full px-4 py-3 rounded-md border border-[#ddd] bg-white text-sm font-body text-ink placeholder:text-[#bbb] focus:outline-none focus:border-terra transition-colors"
                      />
                    </div>

                    {/* Email */}
                    <div>
                      <label className="block font-mono text-[10px] tracking-[0.15em] uppercase text-[#999] mb-1.5">
                        Email
                      </label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        placeholder="you@example.com"
                        className="w-full px-4 py-3 rounded-md border border-[#ddd] bg-white text-sm font-body text-ink placeholder:text-[#bbb] focus:outline-none focus:border-terra transition-colors"
                      />
                    </div>

                    {/* Giving Interest */}
                    <div>
                      <label className="block font-mono text-[10px] tracking-[0.15em] uppercase text-[#999] mb-1.5">
                        Giving Interest
                      </label>
                      <select
                        value={interest}
                        onChange={(e) => setInterest(e.target.value)}
                        className="w-full px-4 py-3 rounded-md border border-[#ddd] bg-white text-sm font-body text-ink focus:outline-none focus:border-terra transition-colors appearance-none"
                      >
                        <option value="">Select an area</option>
                        <option value="education">Education</option>
                        <option value="water">Water</option>
                        <option value="economic-empowerment">Economic empowerment</option>
                        <option value="foster-youth-la">Foster youth LA</option>
                        <option value="all">All</option>
                      </select>
                    </div>

                    {/* Typical Gift Size */}
                    <div>
                      <label className="block font-mono text-[10px] tracking-[0.15em] uppercase text-[#999] mb-1.5">
                        Typical Gift Size
                      </label>
                      <select
                        value={giftSize}
                        onChange={(e) => setGiftSize(e.target.value)}
                        className="w-full px-4 py-3 rounded-md border border-[#ddd] bg-white text-sm font-body text-ink focus:outline-none focus:border-terra transition-colors appearance-none"
                      >
                        <option value="">Select a range</option>
                        <option value="under-100">Under $100</option>
                        <option value="100-500">$100&#8211;$500</option>
                        <option value="500-2500">$500&#8211;$2,500</option>
                        <option value="2500-plus">$2,500+</option>
                      </select>
                    </div>

                    {/* Submit */}
                    <Button
                      type="submit"
                      variant="primary"
                      arrow
                      disabled={submitting}
                      className="w-full justify-center"
                    >
                      {submitting ? "Joining..." : "Join the Waitlist"}
                    </Button>

                    {formStatus === "error" && (
                      <p className="text-sm text-[#c44] text-center">
                        Something went wrong. Try again or email{" "}
                        <a href="mailto:hello@firsthand-foundation.com" className="underline">
                          hello@firsthand-foundation.com
                        </a>
                      </p>
                    )}

                    <p className="text-[11px] text-[#999] text-center leading-[1.6]">
                      No spam. Just launch updates and pilot project previews.
                    </p>
                  </form>
                )}

                {/* Benefits */}
                <div className="mt-8 pt-6 border-t border-[#e5e5e0] space-y-5">
                  {benefits.map((b) => (
                    <div key={b.title} className="flex gap-3">
                      <div className="flex-shrink-0 mt-0.5">
                        <svg className="w-4 h-4 text-sage" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <div>
                        <div className="font-body text-sm font-semibold text-ink">{b.title}</div>
                        <div className="text-[13px] text-[#888] leading-[1.6]">{b.description}</div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Legal */}
                <p className="mt-6 text-[10px] text-[#aaa] italic leading-[1.6]">
                  Firsthand Foundation is a Wyoming nonprofit corporation. 501(c)(3)
                  tax-exempt status is pending IRS determination. Donations may not be
                  tax-deductible until the determination letter is received.
                </p>
              </div>
            </div>
          </div>
        </aside>
      </main>

      <Footer />
    </div>
  );
}
